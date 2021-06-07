import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Message, Divider } from "semantic-ui-react";
import ImageDropDiv from "../Common/ImageDropDiv";
import CommonInputs from "../Common/CommonInputs";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { profileUpdate } from "../../utils/profileActions";

function UpdateProfile({ Profile }) {
  const [profile, setProfile] = useState({
    profilePicUrl: Profile.user.profilePicUrl,
    name: Profile.user.name,
    bio: Profile.bio || "",
    facebook: (Profile.social && Profile.social.facebook) || "",
    youtube: (Profile.social && Profile.social.youtube) || "",
    instagram: (Profile.social && Profile.social.instagram) || "",
    twitter: (Profile.social && Profile.social.twitter) || "",
  });
  const { name, bio } = profile;

  const [errorMsg, setErrorMsg] = useState(null);

  const [loading, setLoading] = useState(false);
  const [showSocialLinks, setShowSocialLinks] = useState(false);

  const [highlighted, setHighlighted] = useState(false);
  const inputRef = useRef();
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "media") {
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    }
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Form
        error={errorMsg !== null}
        loading={loading}
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);

          let profilePicUrl;

          if (media !== null) {
            profilePicUrl = await uploadPic(media);
          }

          if (media !== null && !profilePicUrl) {
            setLoading(false);
            return setErrorMsg("Lỗi gửi hình ảnh !");
          }

          await profileUpdate(
            profile,
            setLoading,
            setErrorMsg,
            profilePicUrl,
            name
          );
        }}
      >
        <Message
          onDismiss={() => setErrorMsg(false)}
          error
          content={errorMsg}
          attached
          header="Oops!"
        />

        <ImageDropDiv
          inputRef={inputRef}
          highlighted={highlighted}
          setHighlighted={setHighlighted}
          handleChange={handleChange}
          mediaPreview={mediaPreview}
          setMediaPreview={setMediaPreview}
          setMedia={setMedia}
          profilePicUrl={profile.profilePicUrl}
        />

        <Form.Input
          required
          label="Họ và Tên"
          placeholder="Họ và Tên"
          name="name"
          value={name}
          onChange={handleChange}
          fluid
          icon="user"
          iconPosition="left"
        />

        <CommonInputs
          user={profile}
          handleChange={handleChange}
          showSocialLinks={showSocialLinks}
          setShowSocialLinks={setShowSocialLinks}
        />

        <Divider hidden />

        <Button
          color="blue"
          icon="pencil alternate"
          disabled={name.trim() === "" || bio.trim() === "" || loading}
          content="Lưu"
          type="submit"
        />
      </Form>
    </>
  );
}

export default UpdateProfile;
