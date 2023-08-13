import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { useForm } from 'react-hook-form';

import jwtDecode from 'jwt-decode';
import * as yup from 'yup';
import ReactHookFormInput from '../../components/form/reactHookFormInput';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faEye } from '@fortawesome/free-solid-svg-icons';

import FormBody from '../../module/form/formbody';
import axios from 'axios';

import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../features/userSlice';

const schema = yup //lib support validte Form
  .object()
  .shape({
    username: yup
      .string()
      .email('Please Enter a Valid Email')
      .required('Please Enter Your username'),
    password: yup.string().required('Password is required'),
    // .min(8, "Password must have at least 8 characters"),
  })
  .required();

const Login = ({ host }) => {
  // Structure cua reactHookForm
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_USERAUTH}/authentication/login`,
        JSON.stringify(data)
      );
      const decoded = jwtDecode(res.data.jwt_token);
      return decoded;
    } catch (error) {
      setError('password', {
        type: 'manual',
        message: 'Incorrect password',
      });
    }
  };
  const handleGetUserData = async (data) => {
    const userData = await axios.get(
      `${process.env.REACT_APP_HTTSPURL}/customer/${data.customer_id}`
    );
    dispatch(login);
    localStorage.setItem('userData', JSON.stringify(userData.data));
    navigate(0);

    if (data.user && host) {
      window.location.href = '/HostPage';
    } else if (data.user) {
      window.location.href = '/';
    }
  };

  const onSubmit = (data) => {
    if (!isValid) return;
    handleLogin(data).then((data) => {
      handleGetUserData(data);

      if (data.user) {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve();
            reset({
              username: '',
              password: '',
            });
          }, 0);
        });
      }
    });
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-4/5 pb-12 mt-24 mb-24 shadow-secondShadow xl:w-3/5 xl:px-12"
    >
      <FormBody
        title="Log In"
        submitButton="Log in"
        otherButton="Dont have an account ?"
        host={host}
      >
        <ReactHookFormInput
          register={register}
          valid={errors?.username ? true : false}
          placeholder="Enter Your Email"
          value="username"
          icon={<FontAwesomeIcon icon={faEnvelope} />}
        />
        <p className="font-bold text-red">{errors?.username?.message}</p>

        <ReactHookFormInput
          register={register}
          valid={errors?.password ? true : false}
          placeholder="Your Password"
          value="password"
          type="password"
          icon={<FontAwesomeIcon icon={faLock} />}
          showPassWord={<FontAwesomeIcon icon={faEye} />}
        />
        <p className="font-bold text-red">{errors?.password?.message}</p>
      </FormBody>
    </form>
  );
};

export default Login;
