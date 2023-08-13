import React from "react";
import classNames from "classnames/bind";
import styles from "./Counter.module.css";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import useCount from "../../Hooks/useCount";
const cx = classNames.bind(styles);

function Counter({ children }) {
  const { count, handlePlus, handleMinus } = useCount();
  return (
    <div className={cx("counter-container")}>
      <i onClick={handleMinus}>
        <AiFillMinusCircle />
      </i>
      <div>
        {count} {children}
      </div>
      <i onClick={handlePlus}>
        <AiFillPlusCircle />
      </i>
    </div>
  );
}

export default Counter;
