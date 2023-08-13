import React from "react";
import classNames from "classnames/bind";
import { useField } from "formik";
import styles from "../SelectFormik/SelectFormik.module.css";

const cx = classNames.bind(styles);
const SelectFormik = ({ className, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div className="text-[25px] min-w-[250px]">
      <label className={cx("select_type")} htmlFor={props.id || props.name}>
        <span className={cx("select_name")}>{label}</span>
        <select className={cx("select")} {...field} {...props} />
      </label>

      {meta.touched && meta.error ? (
        <div className="text-sm text-red-500">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default SelectFormik;
