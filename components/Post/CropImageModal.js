import React, { useState, useEffect } from "react";
import { Modal, Header, Button, Grid, Icon } from "semantic-ui-react";
import Cropper from "react-cropper";

function CropImageModal({
  mediaPreview,
  setMedia,
  showCropImage,
  setShowCropImage,
}) {
  const [cropper, setCropper] = useState();

  const getCropData = () => {
    if (cropper) {
      setMedia(cropper.getCroppedCanvas().toDataURL());
      cropper.destroy();
    }

    setShowCropImage(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", ({ key }) => {
      if (cropper) {
        if (key === "m") cropper.setDragMode("move");
        if (key === "c") cropper.setDragMode("crop");
        if (key === "r") cropper.reset();
      }
    });
  }, [cropper]);

  return (
    <>
      <Modal
        closeOnDimmerClick={false}
        size="large"
        onClose={() => setShowCropImage(false)}
        open={showCropImage}
      >
        <Modal.Header content="Cắt hình ảnh trước khi tải lên" />

        <Grid columns={2}>
          <Grid.Column>
            <Modal.Content image>
              <Cropper
                style={{ height: "400px", width: "100%" }}
                cropBoxResizable
                zoomable
                highlight
                responsive
                guides
                dragMode="move"
                initialAspectRatio={1}
                preview=".img-preview"
                src={mediaPreview}
                viewMode={1}
                minCropBoxHeight={10}
                minContainerWidth={10}
                background={false}
                autoCropArea={1}
                checkOrientation={false}
                onInitialized={(cropper) => setCropper(cropper)}
              />
            </Modal.Content>
          </Grid.Column>

          <Grid.Column>
            <Modal.Content image>
              <div>
                <Header as="h2">
                  <Icon name="images outline" />
                  <Header.Content content="Kết quả" />
                </Header>

                <div>
                  <div
                    style={{
                      width: "100%",
                      height: "300px",
                      display: "inline-block",
                      padding: "10px",
                      overflow: "hidden",
                      boxSizing: "border-box",
                    }}
                    className="img-preview"
                  />
                </div>
              </div>
            </Modal.Content>
          </Grid.Column>
        </Grid>

        <Modal.Actions>
          <Button
            title="Làm mới (R)"
            icon="redo"
            circular
            onClick={() => cropper && cropper.reset()}
          />

          <Button
            title="Di chuyển ảnh (M)"
            icon="move"
            circular
            onClick={() => cropper && cropper.setDragMode("move")}
          />

          <Button
            title="Dịch chuyển khung (C)"
            icon="crop"
            circular
            onClick={() => cropper && cropper.setDragMode("crop")}
          />

          <Button
            negative
            content="Hủy"
            icon="cancel"
            onClick={() => setShowCropImage(false)}
          />

          <Button
            content="Cắt hình ảnh"
            icon="checkmark"
            positive
            onClick={getCropData}
          />
        </Modal.Actions>
      </Modal>
    </>
  );
}

export default CropImageModal;
