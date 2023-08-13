import { useField } from "formik";
import classNames from "classnames/bind";
import React from "react";
import styles from "../CheckboxFormik/checkboxFormik.module.css";
const cx = classNames.bind(styles);

const CheckboxFormik = ({ value, checked, children, origin, ...props }) => {
  const [field] = useField(props);
  let classes = cx("radio");
  if (origin) {
    classes = cx("origin");
  }
  let type = "checkbox";

  return (
    <div className={cx("radio-formik")}>
      <label className={!origin ? cx("add_type") : null}>
        <input {...field} type={type} value={value} className={classes} />

        <span className={!origin ? cx("name_type") : null}> {children}</span>
      </label>
    </div>
  );
};

export default CheckboxFormik;
