import React, { useEffect, useState } from "react";
import styles from "./top-destinations.module.css";

import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import axios from "axios";
const cx = classNames.bind(styles);

function TopDestinations() {
  const hotel = [
    {
      name: "Ha Noi",
      subName: "Ha Noi",
      image:
        "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGFub2l8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    },
    {
      name: "Ho Chi Minh",
      subName: "Ho Chi Minh",

      image:
        "https://images.unsplash.com/photo-1571424161765-c4080147f74f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2FpJTIwZ29ufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    },
    {
      name: "Da Nang",
      subName: "Đà Nẵng",
      image:
        "https://images.unsplash.com/photo-1505018620898-92616e1849cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8RGElMjBuYW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60",
    },
    {
      name: "Lao Cai",
      subName: "Lào Cai",
      image:
        "https://images.unsplash.com/photo-1570559120097-e6c3388329e6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8SGFpJTIwUGhvbmd8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60",
    },
  ];

  return (
    <div className={cx("top-destinations")}>
      <div className={cx("top-destinations__content")}>
        <h2 className={cx("top-destinations__top")}>top</h2>
        <h2 className={cx("top-destinations__dest")}>destinations</h2>
        <p className={cx("top-destinations__desc")}>
          it's hard enough deciding to move, you don't have to worry about where
          to move to. These are some of the most popular and best locations to
          move to based on a number of factors.
        </p>
      </div>

      <div id="id" className={cx("top-destinations-container")}>
        {hotel.map((x, index) => (
          <div className={cx("top-destinations-item")} key={index}>
            <div className={cx("front")}>
              <Link
                to="/HomeBooking"
                state={{ searchValue: x.subName }}
                style={{ width: "100%", height: "100%" }}
              >
                <img
                  src={x.image}
                  className={cx("top-destinations-item__img")}
                  alt=""
                />
              </Link>
              <div className={cx("top-destinations-info")}>
                <h3 className={cx("top-destinations-state")}>{x.name}</h3>
              </div>
            </div>
            <div className={cx("back")}>hehe</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopDestinations;
