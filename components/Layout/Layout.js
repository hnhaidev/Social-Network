import React, { createRef } from "react";
import HeadTags from "./HeadTags";
import Navbar from "./Navbar";
import {
  Container,
  Visibility,
  Grid,
  Sticky,
  Ref,
  Segment,
} from "semantic-ui-react";
import nprogress from "nprogress";
import Router, { useRouter } from "next/router";
import SideMenu from "./SideMenu";
import Search from "./Search";
import MobileHeader from "./MobileHeader";
import { createMedia } from "@artsy/fresnel";

// Tạo tỉ lệ để responsive
const AppMedia = createMedia({
  breakpoints: { zero: 0, mobile: 549, tablet: 850, computer: 1080 },
});

const mediaStyles = AppMedia.createMediaStyle();
const { Media, MediaContextProvider } = AppMedia;

function Layout({ children, user }) {
  const contextRef = createRef();
  const router = useRouter();

  const messagesRoute = router.pathname === "/messages";

  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();

  return (
    <>
      <HeadTags />
      {user ? (
        <>
          <style>{mediaStyles}</style>

          <MediaContextProvider>
            <div style={{ marginLeft: "1rem", marginRight: "1rem" }}>
              <Media greaterThanOrEqual="computer">
                <Ref innerRef={contextRef}>
                  <Grid>
                    {!messagesRoute ? (
                      <>
                        <Grid.Column floated="left" width={2}>
                          <Sticky context={contextRef}>
                            <SideMenu user={user} />
                          </Sticky>
                        </Grid.Column>
                        <Grid.Column width={10}>
                          <Grid>
                            <Grid.Column width={3}></Grid.Column>
                            <Grid.Column width={12}>
                              <Visibility context={contextRef}>
                                {children}
                              </Visibility>
                            </Grid.Column>
                            <Grid.Column width={3}></Grid.Column>
                          </Grid>
                        </Grid.Column>
                        <Grid.Column floated="left" width={4}>
                          <Sticky context={contextRef}>
                            <Segment basic>
                              <Search />
                            </Segment>
                          </Sticky>
                        </Grid.Column>
                      </>
                    ) : (
                      <>
                        <Grid.Column floated="left" width={1} />
                        <Grid.Column width={15}>{children}</Grid.Column>
                      </>
                    )}
                  </Grid>
                </Ref>
              </Media>

              <Media between={["tablet", "computer"]}>
                <Ref innerRef={contextRef}>
                  <Grid>
                    {!messagesRoute ? (
                      <>
                        <Grid.Column floated="left" width={4}>
                          <Sticky context={contextRef}>
                            <SideMenu user={user} />
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={12}>
                          <Grid>
                            <Grid.Column width={12}>
                              <Visibility context={contextRef}>
                                {children}
                              </Visibility>
                            </Grid.Column>
                            <Grid.Column width={3}></Grid.Column>
                          </Grid>
                        </Grid.Column>
                      </>
                    ) : (
                      <>
                        <Grid.Column floated="left" width={1} />
                        <Grid.Column width={15}>{children}</Grid.Column>
                      </>
                    )}
                  </Grid>
                </Ref>
              </Media>

              <Media between={["mobile", "tablet"]}>
                <Ref innerRef={contextRef}>
                  <Grid>
                    {!messagesRoute ? (
                      <>
                        <Grid.Column floated="left" width={2}>
                          <Sticky context={contextRef}>
                            <SideMenu user={user} pc={false} />
                          </Sticky>
                        </Grid.Column>

                        <Grid.Column width={14}>
                          <Visibility context={contextRef}>
                            {children}
                          </Visibility>
                        </Grid.Column>
                      </>
                    ) : (
                      <>
                        <Grid.Column floated="left" width={1} />
                        <Grid.Column width={15}>{children}</Grid.Column>
                      </>
                    )}
                  </Grid>
                </Ref>
              </Media>

              <Media between={["zero", "mobile"]}>
                <MobileHeader user={user} />
                <Grid>
                  <Grid.Column>{children}</Grid.Column>
                </Grid>
              </Media>
            </div>
          </MediaContextProvider>
        </>
      ) : (
        <div
          style={{
            backgroundImage: "url('/loginImg.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            height: "250vh",
          }}
        >
          <Navbar />
          <Container text style={{ paddingTop: "1rem" }}>
            {children}
          </Container>
        </div>
      )}
    </>
  );
}

export default Layout;
