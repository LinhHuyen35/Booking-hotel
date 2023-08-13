import React from 'react';

const ConfirmModal = ({
  setShowConfirmation,
  setIsComplete,
  message = '',
  hiddenFunction = () => {},
  image_url,
  image_url_update,
}) => {
  const handleConfirm = () => {
    if (image_url_update && image_url_update.length > 0) {
      if (Object.values(image_url_update[0])?.length === 5) {
        setShowConfirmation(false);
        hiddenFunction();
        return;
      } else if (Object.values(image_url_update[0])?.length < 5) {
        alert('5 images minium');
        setShowConfirmation(false);
      }
    }
    if (image_url) {
      if (Object.values(image_url[0]).length === 5) {
        setShowConfirmation(false);
        hiddenFunction();
      } else if (Object.values(image_url[0]) !== 5) {
        alert('5 images minium');
        setShowConfirmation(false);
      }
    } else {
      setShowConfirmation(false);
      hiddenFunction();
    }
  };
  const handleCancel = () => {
    setShowConfirmation(false);
    setIsComplete(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="fixed z-[1000] flex flex-col justify-between w-[20%]  bg-white h-[20%] rounded">
        <div className="w-full mt-2 text-center">{message}</div>
        <div className="flex items-center justify-around w-full h-full">
          <button
            className="px-3 py-2 text-white bg-lightGreen min-w-[90px] hover:opacity-70 cursor-pointer rounded"
            onClick={handleConfirm}
            type="button"
          >
            Confirm
          </button>
          <button
            className="px-3 py-2 text-white bg-lightGray min-w-[90px] hover:opacity-70 cursor-pointer rounded"
            onClick={handleCancel}
            type="button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
