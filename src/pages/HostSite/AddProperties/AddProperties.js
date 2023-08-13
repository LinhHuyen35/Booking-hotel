import styles from './AddProperties.module.css';
import ScrollToTop from '../../../components/ScrollToTop';
import React, { useState } from 'react';
import classNames from 'classnames/bind';
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import LayoutPrimary from 'layouts/LayoutPrimary';
import Form from '../../../module/hotel/Form';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from 'module/modal/confirmModal';

const cx = classNames.bind(styles);

function AddProperties() {
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const customer = (() => {
    const storageRoomsData = JSON.parse(localStorage.getItem('userData'));

    return storageRoomsData ?? [];
  })();

  const [imageUrl, setImageUrl] = useState([]);

  const handleAddHotel = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_HOTEL}/customer/${customer.id}/hotel`,
        JSON.stringify(values)
      );
      navigate('/AddRoomForm', {
        state: { id: res.data.id, update: 'notUpdate' },
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    }
  };
  return (
    <LayoutPrimary host>
      <ScrollToTop />

      <Formik
        initialValues={{
          name: '',
          star_level: '',
          rule: '',
          description: '',
          address: {
            detail_address: '',
            province: '',
          },
          list_image: [],
        }}
        initialTouched={{
          field: true,
        }}
        validateOnMount
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
        })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          const dataToAdd = {
            ...values,
            list_image: Object.values(imageUrl[0]),
          };
          // console.log(dataToAdd);
          handleAddHotel(dataToAdd);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={cx('sign-up__form')}>
            {showConfirmation && (
              <ConfirmModal
                hiddenFunction={formik.handleSubmit}
                setShowConfirmation={setShowConfirmation}
                message="Are You Sure"
                image_url={imageUrl}
              />
            )}
            <Form
              setShowConfirmation={setShowConfirmation}
              imageUrl={imageUrl}
              setImageUrl={setImageUrl}
            ></Form>
          </form>
        )}
      </Formik>
    </LayoutPrimary>
  );
}

export default AddProperties;
