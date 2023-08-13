import { useField } from "formik";
import classNames from "classnames/bind";
import React from "react";
import styles from "../RadioFormik/RadioFormik.module.css";
import CheckIcon from "module/Icons/CheckIcon";
const cx = classNames.bind(styles);

const RadioFomik = ({ value, checked, children, origin, ...props }) => {
  const [field] = useField(props);
  let classes = cx("radio");
  if (origin) {
    classes = cx("origin");
  }
  let type = "radio";

  return (
    <div className={cx("radio-formik")}>
      <label className={!origin ? cx("add_type") : null}>
        <span className={cx("input-container")}>
          <input
            {...field}
            type={type}
            value={value}
            className={classes}
            // checked={checked}
          />
          <CheckIcon customclass={cx("customclass")}></CheckIcon>
        </span>
        <span className={!origin ? cx("name_type") : cx("name")}>
          {children}
        </span>
      </label>
    </div>
  );
};

export default RadioFomik;
