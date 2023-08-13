import axios from 'axios';
import TextAreaFormik from 'components/TextAreaFormik/TextAreaFormik';
import { Field, Formik } from 'formik';
import LayoutPrimary from 'layouts/LayoutPrimary';
import ConfirmModal from 'module/modal/confirmModal';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

const AddRoomForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_ROOM}/hotel/${location.state.id}/rooms?page=1&limit=10`
      )
      .then(function (res) {
        // console.log(res);
        setRooms(res.data.items);
      });
  }, [location.state.id]);
  console.log(location);
  const handleFetchAddRoom = async (values) => {
    try {
      if (location.state.update === 'notUpdate') {
        const res = await axios.post(
          `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_ROOM}/hotel/${location.state.id}/room`,
          JSON.stringify(values)
        );
        console.log(res);
      }
      if (location.state.update === 'update') {
        const res = await axios.put(
          `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_ROOM}/room/${location.state.roomData.id}`,
          JSON.stringify(values)
        );
        console.log(res);
      }

      rooms?.length > 0
        ? navigate('/AddRoom', { state: { id: location.state.id } }) //update
        : navigate('/HostProperties'); //addroom
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
      <Formik
        initialValues={
          location.state.update === 'update'
            ? {
                name: location.state.roomData.name,
                type: location.state.roomData.type,
                price: location.state.roomData.price,
                quantity: location.state.roomData.quantity,
                description: location.state.roomData.description,
                list_amenity: [],
              }
            : {
                name: '',
                type: '',
                price: '',
                quantity: '',
                description: '',
                list_amenity: [],
              }
        }
        initialTouched={{
          field: true,
        }}
        validationSchema={Yup.object({
          name: Yup.string().required('Name is required'),
          price: Yup.number()
            .typeError('price must be a number')
            .required('Required'),
          quantity: Yup.number('must be a numer')
            .typeError('quantity must be a number')
            .required('Required'),
        })}
        // validateOnMount
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);
          handleFetchAddRoom(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            {showConfirmation && (
              <ConfirmModal
                hiddenFunction={formik.handleSubmit}
                setShowConfirmation={setShowConfirmation}
                message="Are You Sure"
              />
            )}
            <div className="flex flex-col gap-8 p-24">
              <label className="flex flex-col">
                <input
                  className="w-1/2 h-24 py-10 text-3xl font-bold"
                  placeholder={
                    location.state.update === 'update'
                      ? location.state.roomData.name
                      : ` Room's Name`
                  }
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                <span className="text-sm font-bold text-red">
                  {formik.errors.name}
                </span>
              </label>
              <label className="flex gap-4 ">
                <p className="text-xl font-bold">Type Of Room:</p>

                <Field
                  className="text-lg font-semibold"
                  name="type"
                  as="select"
                  value={location?.state?.roomData?.type}
                >
                  <option value="Single"> Single </option>
                  <option value="Double"> Double </option>
                  <option value="VIP"> VIP </option>
                </Field>
              </label>

              <label className="flex items-center gap-10 ">
                <p className="text-xl font-bold">Price:</p>
                <div className="flex flex-col gap-1">
                  <input
                    type="quantity"
                    className="px-5 py-2 border-gray-400 border-solid focus:border-slate-700"
                    name="price"
                    placeholder={
                      location.state.update === 'update'
                        ? location.state.roomData.price
                        : ` Price`
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.price}
                  />
                  <span className="text-sm font-bold text-red">
                    {formik.errors.price}
                  </span>
                </div>
              </label>
              <label className="flex items-center gap-10">
                <p className="text-xl font-bold">Quantity:</p>
                <div className="flex flex-col gap-1">
                  <input
                    type="quantity"
                    className="w-16 px-2 py-2 font-bold border-gray-400 border-solid focus:border-slate-700"
                    name="quantity"
                    placeholder={
                      location.state.update === 'update'
                        ? location.state.roomData.quantity
                        : `0`
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.quantity}
                  />
                  <span className="text-sm font-bold text-red">
                    {formik.errors.quantity}
                  </span>
                </div>
              </label>
              <p className="text-xl font-bold">Description:</p>
              <TextAreaFormik
                name="description"
                placeholder={
                  location.state.update === 'update'
                    ? location.state.roomData.description
                    : ` Room's Name`
                }
                id="intro"
              ></TextAreaFormik>
              <button
                type="button"
                onClick={() => {
                  setShowConfirmation(true);
                }}
                className="w-32 h-12 px-4 py-2 rounded bg-[#98FB98] self-end"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </Formik>
    </LayoutPrimary>
  );
};

export default AddRoomForm;
