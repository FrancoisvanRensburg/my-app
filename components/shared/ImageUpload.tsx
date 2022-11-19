import { API_URL } from "@/config/index";
import styles from "@/styles//Form.module.css";
import { useState } from "react";
import { NextComponentType } from "next";

interface IProps {
  eventId: any;
  imageUploaded: Function;
}

const ImageUpload = (props: IProps) => {
  let { eventId, imageUploaded } = props;
  const [image, setImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function handleSubmit(e: any) {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData();
    if (!image) {
      return;
    }
    formData.append("files", image);
    formData.append("ref", "api::event.event");
    formData.append("refId", eventId);
    formData.append("field", "image");

    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData
    });

    if (res.ok) {
      imageUploaded();
    }
    setIsLoading(false);
  }

  function handleFileChange(e: any) {
    // e.preventDefault();
    setImage(e.target.files[0]);
  }

  return (
    <div className={styles.form}>
      <h1>Upload event image</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type={"file"} onChange={handleFileChange} />
        </div>
        <input type={"submit"} value={"Upload"} className={"btn"} disabled={isLoading} />
      </form>
    </div>
  );
};

export default ImageUpload;
