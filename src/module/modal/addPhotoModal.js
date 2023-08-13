import MyInput from 'components/MyInput/MyInput';
import React, { useState } from 'react';
import styles from '../modal/Modal.module.css';

import { CloseIcon } from '@chakra-ui/icons';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const AddPhotoModal = ({ setIsVisible, imageUrl, setImageUrl }) => {
  const [value, setValue] = useState('');

  const handleChange = (e) => setValue(e.target.value);

  const handleAdded = (url) => {
    if (imageUrl.length === 5) {
      alert('enough');
      return setIsVisible(false);
    }
    const newUrl = [...imageUrl, { url, type: 'hotel' }];
    console.log(imageUrl);
    setImageUrl(newUrl);
    alert('added succesfully');
    setValue('');
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[1000]">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className=" fixed z-[1000] flex flex-col  justify-between w-[40%] px-4 py-4 bg-white h-[30%] rounded">
        <div className="flex justify-end cursor-pointer hover:opacity-70">
          <CloseIcon
            customclass={cx('close-image-modal')}
            onClick={() => {
              setIsVisible(false);
            }}
          ></CloseIcon>
        </div>
        <div>
          <label className="flex flex-col w-full">
            <span>ImageUrl</span>
            <input
              type="text"
              placeholder="Url"
              className="w-full"
              value={value}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="px-6 py-2 text-white rounded bg-lightGreen"
            type="button"
            onClick={() => {
              handleAdded(value);
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPhotoModal;
