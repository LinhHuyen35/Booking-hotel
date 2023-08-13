import React from "react";
import classNames from "classnames/bind";
import styles from "../InputRadio/InputRadio.module.css";

const cx = classNames.bind(styles);
const InputRadio = ({ name, children, select = false, address = false }) => {
  let x = cx("add_type");
  if (select) {
    x = cx("select_type");
  }
  return (
    <div>
      <label className={x}>
        {select && <span className={cx("select_name")}> {children}</span>}
        {select && (
          <select className={cx("select")} name="caars" id="cars">
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        )}
        {!select && <input type="radio" className={cx("radio")} name={name} />}
        {!select && <span className={cx("name_type")}> {children}</span>}
      </label>
    </div>
  );
};

export default InputRadio;
