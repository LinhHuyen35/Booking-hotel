import React, { useState } from "react";
import styles from "./Search-bar.module.css";
import classNames from "classnames/bind";
import "react-datepicker/dist/react-datepicker.css";
import SearchField from "./SearchField";

const cx = classNames.bind(styles);

function SearchBar() {
  const myObject = ["5", "4", "3"];
  const [param, setParam] = useState({});
  const [state, changeState] = useState({
    activeObject: myObject[0],
  });
  function handleClick(index, element) {
    changeState({ ...state, activeObject: myObject[index] });
    setParam({ ...param, star_level: myObject[index] });
  }

  function toggleActive(index) {
    if (myObject[index] === state.activeObject) {
      return cx("option-item", "active");
    } else {
      return cx("option-item");
    }
  }

  return (
    <div className={cx("search-bar")}>
      <div className={cx("find")}>
        <span>FIND</span>
      </div>
      <div className={cx("search-option")}>
        <ul className={cx("option-lists")}>
          {myObject.map((element, index) => (
            <li
              key={index}
              className={toggleActive(index)}
              onClick={() => {
                handleClick(index, element);
              }}
            >
              {element} stars
            </li>
          ))}
        </ul>
      </div>
      <SearchField
        star={state.activeObject}
        param={param}
        setParam={setParam}
      ></SearchField>
    </div>
  );
}

export default SearchBar;
