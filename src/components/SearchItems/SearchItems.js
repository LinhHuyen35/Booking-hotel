import React from "react";
import styles from "./SearchItems.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function SearchItems({ item, ...props }) {
  return (
    <div className={cx("search-item")} {...props}>
      {/* {item.address && <p>{item.address.province}</p>} */}
      <span>{item}</span>
    </div>
  );
}

export default SearchItems;
