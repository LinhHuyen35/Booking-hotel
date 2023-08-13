import React, { useState } from "react";
import axios from "axios";

const UploadFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      // Replace 'YOUR_CLIENT_ID' with your actual Imgur Client ID
      const clientId = "bf4b8800fca5ddd";

      const response = await axios.post(
        "https://api.imgur.com/3/image",
        formData,
        {
          headers: {
            Authorization: `Client-ID ${clientId}`,
          },
        }
      );
      console.log(response);
      //   setImageUrl(response.data.data.link);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <div>
      <h1>Imgur Image Upload</h1>
      <input type="file" multiple={true} onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {imageUrl && (
        <div>
          <img src={imageUrl} alt="Uploaded" />
          <p>Uploaded Image URL: {imageUrl}</p>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
