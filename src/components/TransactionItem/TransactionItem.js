import React from "react";
import classNames from "classnames/bind";
import styles from "./TransactionItem.module.css";

const cx = classNames.bind(styles);

function TransactionItem({ item }) {
  return (
    <div className={cx("transaction-item")}>
      <div className={cx("item-wrapper")}>
        <div className={cx("item-information")}>
          <div className={cx("title")}>Transaction Title</div>
          <div className={cx("time")}>{item.book_date}</div>
        </div>
        <div className={cx("income")}>$ {item.total_price}</div>
      </div>
    </div>
  );
}

export default TransactionItem;
