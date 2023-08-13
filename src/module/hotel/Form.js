import React, { useRef, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './form.module.css';
import MyInput from 'components/MyInput/MyInput';
import SelectFormik from 'components/SelectFormik/SelectFormik';
import TextAreaFormik from 'components/TextAreaFormik/TextAreaFormik';
import city from '../../json/province.json';
import Button from 'components/Button/Button';
import ImageGallery from 'components/imageGallery'; // <ImageGallery setImageUrl={setImageUrl} imageUrl={imageUrl} />
import { Cloudinary } from '@cloudinary/url-gen';
import axios from 'axios';
import { object } from 'yup';

const cld = new Cloudinary({ cloud: { cloudName: 'dfc9jwf19' } });

const cx = classNames.bind(styles);
const province = city.data;
const Form = ({ setShowConfirmation, setImageUrl, imageUrl, update, data }) => {
  const [uploadedImageUrl, setUploadedImageUrl] = useState({});
  const profileUpload = async (file) => {
    console.log('file123', file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('api_key', '736139166612696');
    formData.append('upload_preset', 'vnd1eww7');
    console.log('formData', formData);

    const resurtUrl = await axios.post(
      'https://api.cloudinary.com/v1_1/vnd1eww7/image/upload',
      formData
    );
    console.log('resurtUrl', resurtUrl.data.url);
    return resurtUrl.data.url;
  };

  const handleImageUpload = async (e, imageNumber) => {
    console.log(imageNumber);
    const file = e.target.files[0];
    console.log('file', file);
    if (file) {
      const resUrl = await profileUpload(file);
      setUploadedImageUrl({
        ...uploadedImageUrl,
        [imageNumber]: { url: resUrl, type: 'hotel' },
      });
      const newUrl = [
        {
          ...uploadedImageUrl,
          [imageNumber]: { url: resUrl, type: 'hotel' },
        },
      ];
      setImageUrl(newUrl);
      console.log('imageUrl', resUrl);
      console.log(uploadedImageUrl);
    }
  };

  return (
    <div className={cx('add3-properties')}>
      <div>
        <div className={cx('content3-container')}>
          <div className={cx('input-container')}>
            <h1
              className={cx('title')}
              style={{
                fontSize: '2em',
                marginBottom: '25px',
                fontWeight: '700',
              }}
            >
              {update ? 'Update Property' : 'Add New Property'}
            </h1>
            <MyInput
              customContainerClasses={cx('custom-container')}
              label="Hotel Name"
              type="text"
              name="name"
              className={cx('name')}
              placeholder={'Enter your Hotel Name'}
            ></MyInput>
          </div>
          <div className={cx('input-container')}>
            {update ? (
              <ImageGallery
                updateDefautlImage={data.list_image}
                uploadedImageUrl={uploadedImageUrl}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                handleImageUpload={handleImageUpload}
              />
            ) : (
              <ImageGallery
                uploadedImageUrl={uploadedImageUrl}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                handleImageUpload={handleImageUpload}
              />
            )}
          </div>
          <div className={cx('input-container')}>
            <h3 className="text-3xl font-bold">Add Your location.</h3>

            <div className={cx('location-input__wrapper')}>
              <div className={cx('location-input')}>
                <SelectFormik name="address.province" label="Province">
                  {province.map((i, index) => (
                    <option key={index} value={i.name}>
                      {i.name}
                    </option>
                  ))}
                </SelectFormik>
              </div>
              <div>
                <MyInput
                  label="Address"
                  type="text"
                  name="address.detail_address"
                  className={cx('name')}
                  placeholder={'Enter your address'}
                ></MyInput>
              </div>
            </div>
          </div>
          <div className={cx('input-container')}>
            <MyInput
              customContainerClasses={cx('custom-container')}
              label="Star Level "
              type="text"
              name="star_level"
              className={cx('name')}
              placeholder={'Enter your Hotel Name'}
            ></MyInput>
          </div>
          <div className={cx('input-container')}>
            <div>
              <h3
                className="text-3xl font-bold"
                style={{ marginBottom: '25px' }}
              >
                Add description at your place.
              </h3>
            </div>
            <div>
              <TextAreaFormik
                label="Introduce yourself"
                name="description"
                placeholder="Enter your introduce"
                id="intro"
                className={cx('text-area')}
              ></TextAreaFormik>
            </div>
          </div>
          <Button
            className={cx('save')}
            green
            rounded
            type="button"
            onClick={() => {
              setShowConfirmation(true);
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Form;
