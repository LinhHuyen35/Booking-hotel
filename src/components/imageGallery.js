import React from 'react';

const ImageGallery = ({
  setImageUrl,
  imageUrl,
  uploadedImageUrl,
  updateDefautlImage,
  handleImageUpload = () => {},
}) => {
  console.log(uploadedImageUrl);
  console.log(updateDefautlImage);
  return (
    <div>
      <div className="grid grid-cols-4 grid-rows-2 gap-1 h-[300px] shadow-secondShadow">
        <label
          htmlFor="image1"
          className="flex items-center justify-center col-span-2 row-span-2 text-lg font-semibold bg-white cursor-pointer"
        >
          {uploadedImageUrl?.imageNumber1 ? (
            <img
              src={uploadedImageUrl?.imageNumber1?.url}
              alt="not "
              className="w-full h-full"
            />
          ) : updateDefautlImage ? (
            <img
              src={updateDefautlImage[0].url}
              alt="not "
              className="w-full h-full"
            />
          ) : (
            <span>Add Photos</span>
          )}

          <input
            className="hidden"
            type="file"
            id="image1"
            accept="image/*"
            multiple={true}
            onChange={(e) => {
              handleImageUpload(e, 'imageNumber1');
            }}
          />
        </label>
        <label
          htmlFor="image2"
          className="flex items-center justify-center bg-white cursor-pointer"
        >
          {uploadedImageUrl?.imageNumber2 ? (
            <img
              src={uploadedImageUrl?.imageNumber2?.url}
              alt="not "
              className="w-full h-full"
            />
          ) : updateDefautlImage ? (
            <img
              src={updateDefautlImage[1].url}
              alt="not "
              className="w-full h-full"
            />
          ) : (
            <span>Add Photos</span>
          )}
          <input
            className="hidden"
            type="file"
            id="image2"
            accept="image/*"
            multiple={true}
            onChange={(e) => {
              handleImageUpload(e, 'imageNumber2');
            }}
          />
        </label>
        <label
          htmlFor="image3"
          className="flex items-center justify-center bg-white cursor-pointer"
        >
          {uploadedImageUrl?.imageNumber3 ? (
            <img
              src={uploadedImageUrl?.imageNumber3?.url}
              alt="not "
              className="w-full h-full"
            />
          ) : updateDefautlImage ? (
            <img
              src={updateDefautlImage[2].url}
              alt="not "
              className="w-full h-full"
            />
          ) : (
            <span>Add Photos</span>
          )}
          <input
            className="hidden"
            type="file"
            id="image3"
            accept="image/*"
            multiple={true}
            onChange={(e) => {
              handleImageUpload(e, 'imageNumber3');
            }}
          />
        </label>
        <label
          htmlFor="image4"
          className="flex items-center justify-center bg-white cursor-pointer"
        >
          {uploadedImageUrl?.imageNumber4 ? (
            <img
              src={uploadedImageUrl?.imageNumber4?.url}
              alt="not "
              className="w-full h-full"
            />
          ) : updateDefautlImage ? (
            <img
              src={updateDefautlImage[3].url}
              alt="not "
              className="w-full h-full"
            />
          ) : (
            <span>Add Photos</span>
          )}
          <input
            className="hidden"
            type="file"
            id="image4"
            accept="image/*"
            multiple={true}
            onChange={(e) => {
              handleImageUpload(e, 'imageNumber4');
            }}
          />
        </label>
        <label
          htmlFor="image5"
          className="flex items-center justify-center bg-white cursor-pointer"
        >
          {uploadedImageUrl?.imageNumber5 ? (
            <img
              src={uploadedImageUrl?.imageNumber5?.url}
              alt="not "
              className="w-full h-full"
            />
          ) : updateDefautlImage ? (
            <img
              src={updateDefautlImage[4].url}
              alt="not "
              className="w-full h-full"
            />
          ) : (
            <span>Add Photos</span>
          )}
          <input
            className="hidden"
            type="file"
            id="image5"
            accept="image/*"
            multiple={true}
            onChange={(e) => {
              handleImageUpload(e, 'imageNumber5');
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default ImageGallery;
