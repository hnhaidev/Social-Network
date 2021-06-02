import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Button,
  Image,
  Divider,
  Message,
  Icon,
  Segment,
  Grid,
  Modal,
} from "semantic-ui-react";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { submitNewPost } from "../../utils/postActions";

function CreatePost({ user, setPosts }) {
  const [newPost, setNewPost] = useState({ text: "", location: "" });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const [error, setError] = useState(null);
  const [highlighted, setHighlighted] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }

    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  const addStyles = () => ({
    textAlign: "center",
    textAlign: "center",
    maxHeight: "20rem",
    width: "100%",
    overflow: "auto",
    cursor: "pointer",
    borderColor: highlighted ? "green" : "black",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let picUrl;

    if (media !== null) {
      picUrl = await uploadPic(media);
      if (!picUrl) {
        setLoading(false);
        return setError("Lỗi gửi hình ảnh !");
      }
    }

    await submitNewPost(
      newPost.text,
      newPost.location,
      picUrl,
      setPosts,
      setNewPost,
      setError
    );

    setMedia(null);
    setMediaPreview(null);
    setLoading(false);
    setShowModal(false);
    setShowMap(false);
  };

  return (
    <>
      <Segment>
        <Grid>
          <Grid.Column
            width={1}
            style={{
              paddingRight: "0",
              paddingLeft: "0",
              marginLeft: "1rem",
              marginRight: "1rem",
            }}
          >
            <img
              src={user.profilePicUrl}
              style={{
                width: "2.5rem",
                height: "2.5rem",
                borderRadius: "50%",
                marginRight: "1em",
                float: "left",
              }}
            />
          </Grid.Column>
          <Grid.Column width={13} style={{ paddingRight: "0.5rem" }}>
            <Button fluid circular onClick={() => setShowModal(true)}>
              Bạn đang nghĩ gì thế ?
            </Button>
          </Grid.Column>
        </Grid>
      </Segment>
      {showModal && (
        <Modal
          open={showModal}
          closeIcon
          closeOnDimmerClick
          onClose={() => {
            setShowModal(false);
          }}
          size="tiny"
        >
          <Modal.Content>
            <Form error={error !== null} onSubmit={handleSubmit}>
              <Message
                error
                onDismiss={() => setError(null)}
                content={error}
                header="Oops!"
              />

              <Form.Group style={{ textAlign: "center" }}>
                <Image
                  src={user.profilePicUrl}
                  circular
                  avatar
                  inline
                  style={{ width: "3em", height: "3em" }}
                />
                <span
                  style={{
                    marginLeft: "5px",
                    fontWeight: "700",
                    fontSize: "1.1em",
                  }}
                >
                  {user.name}
                </span>
              </Form.Group>
              <Form.Group>
                <Form.TextArea
                  placeholder="Bạn đang nghĩ gì thế ?"
                  name="text"
                  value={newPost.text}
                  onChange={handleChange}
                  rows={2}
                  width={16}
                  style={{ border: "none" }}
                />
              </Form.Group>

              <Form.Group>
                {showMap && (
                  <Form.Input
                    value={newPost.location}
                    name="location"
                    onChange={handleChange}
                    label="Thêm vị trí"
                    icon="map marker alternate"
                    placeholder="Vị trí ?"
                  />
                )}

                <input
                  ref={inputRef}
                  onChange={handleChange}
                  name="media"
                  style={{ display: "none" }}
                  type="file"
                  accept="image/*"
                />
              </Form.Group>

              {mediaPreview && (
                <div
                  onClick={() => inputRef.current.click()}
                  style={addStyles()}
                  onDrag={(e) => {
                    e.preventDefault();
                    setHighlighted(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setHighlighted(false);
                  }}
                  onDrop={(e) => {
                    e.preventDefault();
                    setHighlighted(true);

                    const droppedFile = Array.from(e.dataTransfer.files);

                    setMedia(droppedFile[0]);
                    setMediaPreview(URL.createObjectURL(droppedFile[0]));
                  }}
                >
                  {media !== null && (
                    <div>
                      <Image
                        style={{ height: "auto", width: "100%" }}
                        src={mediaPreview}
                        alt="PostImage"
                        centered
                        size="medium"
                      />
                    </div>
                  )}
                </div>
              )}

              <Segment>
                <Grid>
                  <Grid.Column width={6}>
                    <span>Thêm vào bài viết</span>
                  </Grid.Column>
                  <Grid.Column width={8} floated="right">
                    <Icon
                      name="images outline"
                      color="teal"
                      size="large"
                      onClick={() => {
                        inputRef.current.click();
                      }}
                      style={{ cursor: "pointer" }}
                    />
                    <Icon
                      name="map marker alternate"
                      color="red"
                      size="large"
                      style={{ cursor: "pointer", marginLeft: "20px" }}
                      onClick={() => setShowMap(!showMap)}
                    />
                  </Grid.Column>
                </Grid>
              </Segment>

              <Divider hidden />

              <Button
                fluid
                circular
                disabled={newPost.text === "" || loading}
                content={<strong>Đăng</strong>}
                style={{ backgroundColor: "#1DA1F2", color: "white" }}
                icon="send"
                loading={loading}
              />
            </Form>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}

export default CreatePost;
