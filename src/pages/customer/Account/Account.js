import React, { useEffect, useState } from 'react';
import styles from './Account.module.css';
import NavBar from '../../../components/nav/nav';
import Footer from '../../../components/footer/footer';
import avatar from '../../../assets/img/Vector.png';
import axios from 'axios';
import { Formik } from 'formik';
import MyInput from '../../../components/MyInput/MyInput';
import { AiOutlineCheck, AiFillStar, AiOutlineClose } from 'react-icons/ai';

import classNames from 'classnames/bind';
import Button from '../../../components/Button/Button';
import UploadAndDisplayImage from 'components/UploadImage';
import { Cloudinary } from '@cloudinary/url-gen';
import ConfirmModal from 'module/modal/confirmModal';
import { useLocation } from 'react-router-dom';
const cld = new Cloudinary({ cloud: { cloudName: 'dfc9jwf19' } });

const cx = classNames.bind(styles);
function Account({ host }) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const location = useLocation();
  const account = (() => {
    const storageRoomsData = JSON.parse(localStorage.getItem('userData'));

    return storageRoomsData ?? false;
  })();

  const [accountData, setAccountData] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const { name } = account.user;
  const handleEdit = () => {
    setEditProfile(!editProfile);
  };

  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log('file', file);
    if (file) {
      const resUrl = await profileUpload(file);
      setUploadedImageUrl(resUrl);

      console.log('imageUrl', resUrl);
    }
  };

  const putData = async (values) => {
    try {
      await axios.put(
        `https://103.184.113.181/customer/${account.id}`,
        JSON.stringify(values)
      );
      setEditProfile(false);
      window.location.href = '/Account';
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

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_HTTSPURL}/customer/${account.id}`)
      .then(function (response) {
        setAccountData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [account.id]);
  return (
    <div className={cx('account')}>
      {location.state.host === false ? <NavBar /> : <NavBar host />}
      <div className={cx('account-container')}>
        <div className={cx('col-left')}>
          <img
            className={cx('account-avatar')}
            src={
              uploadedImageUrl?.length > 0
                ? uploadedImageUrl
                : accountData?.user?.avatar
                ? accountData?.user?.avatar
                : 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.2.1706574637.1686470385&semt=ais'
            }
            alt="Error"
          />
          <label
            htmlFor="image1"
            className="flex items-center justify-center col-span-2 row-span-2 text-lg font-semibold bg-white cursor-pointer"
          >
            <p className={cx('upload')}>Upload a Photo</p>
            <input
              className="hidden"
              type="file"
              id="image1"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          {/* <input type="file" /> */}
          <div className={cx('account-verification__container')}>
            <div className={cx('account-verification')}>
              Identity Verification
            </div>
            <div className={cx('account-verification__desc')}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </div>
          </div>
          <div className={cx('account-status__container')}>
            <h2 className={cx('account-status')}>{name}</h2>
            <div className={cx('email-status')}>
              <AiOutlineCheck />
              Email Confirmed
            </div>
            <div className={cx('mobile-status')}>
              <AiOutlineCheck />
              Mobile Confirmed
            </div>
          </div>
        </div>
        <div className={cx('col-right')}>
          <div className={cx('account-information')}>
            <h2 className={cx('account-name')}>Hello, {name} </h2>
            <div className={cx('account-regis-date')}>Joined in 2021</div>
          </div>
          {!editProfile ? (
            <div className={cx('wrapper')}>
              <table className="table-auto">
                <tbody>
                  <tr>
                    <td>Full Name</td>
                    <td>{accountData?.user?.name}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{accountData?.user?.email}</td>
                  </tr>
                  <tr>
                    <td>Phone Number</td>
                    <td>{accountData?.user?.phone}</td>
                  </tr>
                </tbody>
              </table>

              <Button outline transparent onClick={handleEdit}>
                Edit Profile
              </Button>
              <div className={cx('account-review')}>
                <i>
                  <AiFillStar />
                </i>
                <div className={cx('review')}>0 reviews</div>
              </div>
              <div className={cx('reviewed-by')}>Reviewed By You</div>
            </div>
          ) : (
            <Formik
              initialValues={{
                id: accountData?.id,
                role: accountData?.role,
                user: {
                  id: accountData?.user?.id,
                  name: accountData?.user?.name,
                  email: accountData?.user?.email,
                  phone: accountData?.user?.phone,
                  avatar: accountData?.user.avatar,
                  gender: accountData?.user?.gender,
                  account_id: accountData?.user?.account_id,
                  address: {
                    id: accountData?.user?.address?.id,
                    province: accountData?.user?.address?.province,
                    detail_address: accountData?.user?.address?.detail_address,
                    type: accountData?.user?.address?.type,
                  },
                },
              }}
              initialTouched={{
                field: true,
              }}
              validateOnMount
              onSubmit={(values, { resetForm, setSubmitting }) => {
                putData({
                  ...values,
                  user: { ...values.user, avatar: uploadedImageUrl },
                });

                // axios
                //   .put(
                //     `https://103.184.113.181/customer/${account.id}`,
                //     JSON.stringify({
                //       ...values,
                //       user: { ...values.user, avatar: uploadedImageUrl },
                //     })
                //   )
                //   .then(function (response) {
                //     console.log(response);
                //     console.log('succes');
                //   })
                //   .catch(function (error) {
                //     console.log(error);
                //   });
                setEditProfile(false);
                alert('update succesfully');
              }}
            >
              {(formik) => (
                <form
                  onSubmit={formik.handleSubmit}
                  className={cx('sign-up__form')}
                >
                  {showConfirmation && (
                    <ConfirmModal
                      hiddenFunction={formik.handleSubmit}
                      setShowConfirmation={setShowConfirmation}
                      message="Are You Sure"
                    />
                  )}
                  <MyInput
                    type="text"
                    label="Full Name"
                    account
                    className={cx('input')}
                    name="user.name"
                    placeholder="Enter your number"
                  ></MyInput>
                  <MyInput
                    type="text"
                    label="Email"
                    account
                    className={cx('input')}
                    name="user.email"
                    placeholder="Enter your Email "
                  ></MyInput>

                  <MyInput
                    type="text"
                    label="Phone Number"
                    account
                    className={cx('input')}
                    name="user.phone"
                    placeholder="Enter your number"
                  ></MyInput>
                  <MyInput
                    type="text"
                    label="Province"
                    account
                    className={cx('input')}
                    name="user.address.province"
                    placeholder="Enter your province"
                  ></MyInput>
                  <MyInput
                    type="text"
                    label="Detail address"
                    account
                    className={cx('input')}
                    name="user.address.detail_address"
                    placeholder="Enter your detail address"
                  ></MyInput>
                  {/* <MyInput
                    type="text"
                    label="Location"
                    account
                    className={cx("input")}
                    name="user.address"
                    placeholder="Enter your number"
                  ></MyInput> */}
                  <br />
                  {/* <label>
                    Work
                    <br />
                    <input className={cx("input")} type="text" name="work" />
                  </label>
                  <br /> */}
                  <div className={cx('form-bottom')}>
                    <div className={cx('form-desc')}>
                      All the required user information can be added here...
                    </div>
                    <div className={cx('button-container')}>
                      <Button
                        leftIcon={<AiOutlineClose />}
                        onClick={handleEdit}
                        transparent
                        className={cx('button')}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="button"
                        fourth
                        black
                        className={cx('button')}
                        onClick={() => {
                          setShowConfirmation(true);
                        }}
                      >
                        Save
                      </Button>
                    </div>
                  </div>

                  {/* <Button
                    className={cx("sign-up__button", "disabled")}
                    type="submit"
                    disabled={!formik.isValid || formik.isSubmitting}
                  >
                    Sign Up
                  </Button> */}
                  <UploadAndDisplayImage />
                </form>
              )}
            </Formik>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Account;
