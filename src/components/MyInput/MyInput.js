import React from 'react';
import { useField } from 'formik';
import styles from '../MyInput/MyInput.module.css';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function MyInput({
  children,
  type,
  className,
  customContainerClasses,
  label,
  value,
  account = false,
  ...props
}) {
  const [field, meta] = useField(props);
  const classes = cx({
    [className]: className,
  });
  const classCustom = cx({
    [customContainerClasses]: customContainerClasses,
  });
  return (
    <div
      className={
        account
          ? cx('account-container', classCustom)
          : cx('container', classCustom)
      }
    >
      <label className={!account ? cx('label') : cx('account-edit')}>
        {label}
      </label>
      <input
        className={classes}
        value={value}
        type={type}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className={cx('error')}>{meta.error}</div>
      ) : null}
      {children}
    </div>
  );
}

export default MyInput;
