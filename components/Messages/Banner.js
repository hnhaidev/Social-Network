import React from "react";
import { Segment, Grid, Image, Icon } from "semantic-ui-react";

function Banner({ bannerData, setShowCall }) {
  const { name, profilePicUrl } = bannerData;

  return (
    <>
      <Segment color="teal" attached="top">
        <Grid>
          <Grid.Column floated="left" width={14}>
            <h4>
              <Image avatar src={profilePicUrl} />
              {name}
            </h4>
          </Grid.Column>

          <Grid.Column floated="right" width={2}>
            <Icon
              floated="right"
              name="video camera"
              color="teal"
              size="large"
              style={{
                position: "absolute",
                top: "50%",
                right: "1rem",
                transform: "translateY(-50%)",
                cursor: "pointer",
              }}
              onClick={() => setShowCall(true)}
            />
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
}

export default Banner;
