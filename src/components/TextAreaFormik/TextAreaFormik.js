import React from "react";
import { useField } from "formik";
import styles from "../TextAreaFormik/TextAreaFormik.module.css";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);

const TextAreaFormik = ({ label, ...props }) => {
  // console.log("MyInput ~ props", props);
  // {label, name}
  const [field, meta] = useField(props);
  return (
    <div>
      <label className={"title"} htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea className={cx("text-area")} {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  );
};
export default TextAreaFormik;
