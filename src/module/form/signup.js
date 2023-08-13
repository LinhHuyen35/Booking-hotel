import {
  faEnvelope,
  faEye,
  faLock,
  faPhone,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import ReactHookFormInput from '../../components/form/reactHookFormInput';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ReactHookFormSelect from '../../components/form/reactHookFormSelect';
import axios from 'axios';
import { useNavigate } from 'react-router';
import FormBody from '../form/formbody';

const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;

const schema = yup
  .object()
  .shape({
    name: yup.string().required('Please Enter Your Name'),
    phone: yup
      .string()
      .required('Please Enter Your Phone number')
      .matches(phoneRegex, 'Please enter a real phone number'),
    email: yup
      .string()
      .email('Please Enter a Valid Email')
      .required('Please Enter Your Email'),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must have at least 8 characters'),
    repassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Please Re-enter Your password'),
    gender: yup.string().required('Please Enter Your Gender'),
  })
  .required();

const SignUp = ({ role = 'customer' }) => {
  const [formData, setFormData] = useState([]);
  const [otpView, setOtpView] = useState(false);
  const [otp, setOtp] = useState('000000');
  const [otpError, setOtpError] = useState('');
  const [accountData, setAccountData] = useState({
    role: role,
    description: '',
    user: {
      name: '',
      email: '',
      phone: '',
      note: '',
      avatar:
        'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=626&ext=jpg&ga=GA1.2.1706574637.1686470385&semt=ais',
      gender: 'male',
      account_id: 0,
      address: {
        province: 'Hà Nội',
        detail_address: '98 Quận Từ Liêm, Hà Nội',
      },
    },
  });

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSendOtp = async (data) => {
    const otpRes = await axios.post(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_USERAUTH}/authentication/verification_email?username=${data.email}`
    );
    if (otpRes.data.code === 200) {
      setOtpView(true);
      setFormData(data);
    }
  };
  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const checkExistUserName = async (data) => {
    const res = await axios.post(
      `https://103.184.113.181:448/authentication/check_exist_username?username=${data.email}`
    );
    console.log(res.data);
    if (res.data.code === 400) {
      return alert(res.data.message);
    } else {
      handleSendOtp(data);
    }
  };

  const onSubmit = (data) => {
    checkExistUserName(data);
    // handleSendOtp(data);
    if (!isValid) return;
    console.log(data);
    return new Promise((resolve) => {
      resolve();
      reset({
        name: '',
        phone: '',
        email: '',
        password: '',
        repassword: '',
        gender: 'male',
      });
    });
  };

  const handleCreateAccount = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_USERAUTH}/authentication/sign_up`,
      JSON.stringify({
        username: formData.email,
        password: formData.password,
      })
    );
    setAccountData({
      ...accountData,
      user: { ...accountData.user, account_id: res.data.id },
    });
    console.log('creating');
    return res.data.id;
  };
  // {destructuring}
  const handleConfirmCreateAccount = async (id) => {
    await axios.post(
      `${process.env.REACT_APP_HTTSPURL}/customer`,
      JSON.stringify({
        ...accountData,
        user: {
          ...accountData.user,
          account_id: id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        },
      })
    );

    alert('Create Account Succesfully');
    navigate('/logincus');
  };

  const handleCheckOtp = async () => {
    const res = await axios.post(
      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_USERAUTH}/authentication/check_expiration_time?otp=${otp}&username=${formData.email}`
    );
    if (res.data.code === 200) {
      handleCreateAccount().then((id) => {
        handleConfirmCreateAccount(id);
      });
    } else if (res.data.code === 400) {
      setOtpError('Please Enter The Correct Number');
    }
  };

  if (otpView)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="fixed inset-0 bg-black opacity-50"></div>
        <div className="fixed z-50 flex flex-col justify-between w-[30%] px-12 py-8 bg-white h-[40%] ">
          <h1 className="text-3xl font-bold text-center">Enter Your Otp</h1>
          <label>
            <input
              name="otp"
              placeholder="Enter otp code"
              className="w-full px-2 py-2 border-2 rounded focus:border-solid border-blue placeholder:focus:text-blue focus:text-blue"
              onChange={handleOtpChange}
            />
            {otpError && <p className="font-bold text-red nt-2">{otpError}</p>}
          </label>
          <div className="flex items-center justify-center">
            <button
              className="px-4 py-2 font-light text-white rounded bg-[#A076F9]"
              onClick={handleCheckOtp}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-4/5 pb-12 mt-24 mb-24 shadow-secondShadow xl:w-3/5 xl:px-12"
    >
      <FormBody role={role}>
        <ReactHookFormInput
          register={register}
          valid={errors?.name ? true : false}
          placeholder="Your Name"
          value="name"
          icon={<FontAwesomeIcon icon={faUser} />}
        />
        <p className="font-bold text-red">{errors?.name?.message}</p>

        <ReactHookFormInput
          register={register}
          valid={errors?.phone ? true : false}
          placeholder="Your Phone number"
          value="phone"
          icon={<FontAwesomeIcon icon={faPhone} />}
        />
        <p className="font-bold text-red">{errors?.phone?.message}</p>

        <ReactHookFormInput
          register={register}
          valid={errors?.email ? true : false}
          placeholder="Enter Your Email"
          value="email"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <p className="font-bold text-red">{errors?.email?.message}</p>

        <ReactHookFormInput
          register={register}
          valid={errors?.password ? true : false}
          placeholder="Enter Your password"
          value="password"
          type="password"
          icon={<FontAwesomeIcon icon={faLock} />}
          showPassWord={<FontAwesomeIcon icon={faEye} />}
        />
        <p className="font-bold text-red">{errors?.password?.message}</p>
        <ReactHookFormInput
          register={register}
          placeholder="Enter Your password Again"
          valid={errors?.repassword ? true : false}
          value="repassword"
          type="password"
          icon={<FontAwesomeIcon icon={faLock} />}
          showPassWord={<FontAwesomeIcon icon={faEye} />}
        />
        <p className="font-bold text-red">{errors?.repassword?.message}</p>

        <ReactHookFormSelect
          register={register}
          value="gender"
          valid={errors?.gender ? true : false}
        />
        <p className="font-bold text-red">{errors?.gender?.message}</p>
      </FormBody>
    </form>
  );
};

export default SignUp;
