import styles from "./Home-booking.module.css";
import SearchBar from "../../../components/Search-bar/Search-bar";
import React, { useEffect, useState } from "react";
import LayoutPrimary from "layouts/LayoutPrimary";
import classNames from "classnames/bind";
import CardList from "../../../components/CardList/CardList";
import Button from "../../../components/Button/Button";
import Banner from "../../../components/banner/banner";
import { IoLogoAndroid, IoLogoApple } from "react-icons/io";
import { IconContext } from "react-icons";
import { DiAndroid } from "react-icons/di";
import { AiOutlineSend } from "react-icons/ai";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Card2 from "components/Card/card2";

const cx = classNames.bind(styles);
function HomeBooking({ handleLike, wishlist }) {
  const location = useLocation();

  const [hotel1, setHotel1] = useState([]);
  const [hotel2, setHotel2] = useState([]);
  const [hotel3, setHotel3] = useState([]);
  useEffect(() => {
    const fetchHotelBySearch = async () => {
      const [res1, res2, res3] = await Promise.all([
        await axios.get(
          `${process.env.REACT_APP_HTTSPURL}:${
            process.env.REACT_APP_HOTEL
          }/hotels?page=1&limit=4&location=${
            location.state !== null ? location.state.searchValue : "Ha Noi"
          }`
        ),
        await axios.get(
          `${process.env.REACT_APP_HTTSPURL}:${
            process.env.REACT_APP_HOTEL
          }/hotels?page=2&limit=4&location=${
            location.state !== null ? location.state.searchValue : "Ha Noi"
          }`
        ),
        await axios.get(
          `${process.env.REACT_APP_HTTSPURL}:${
            process.env.REACT_APP_HOTEL
          }/hotels?page=3&limit=4&location=${
            location.state !== null ? location.state.searchValue : "Ha Noi"
          }`
        ),
      ]);

      setHotel1(res1.data.items);
      setHotel2(res2.data.items);
      setHotel3(res3.data.items);
    };
    fetchHotelBySearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LayoutPrimary>
      <Banner />
      <SearchBar />
      <div className={cx("home-booking__body")}>
        <CardList desc="Latest on the property listing">
          {hotel1.map((x) => (
            <Card2
              handleLike={handleLike}
              key={x.id}
              id={x.id}
              name={x.name}
              star={x.star_level}
              rate={x.rate}
              address={x.address.detail_address}
              thumbnail={x.list_image[0].url}
              wishlist={wishlist}
            />
          ))}
        </CardList>
        <CardList desc="Nearby Listed Properties">
          {hotel2.map((x) => (
            <Card2
              handleLike={handleLike}
              key={x.id}
              id={x.id}
              name={x.name}
              star={x.star_level}
              rate={x.rate}
              address={x.address.detail_address}
              thumbnail={x.list_image[0].url}
              wishlist={wishlist}
            />
          ))}
        </CardList>
        <CardList desc="Top Rated Properties">
          {hotel3.map((x) => (
            <Card2
              handleLike={handleLike}
              key={x.id}
              id={x.id}
              name={x.name}
              star={x.star_level}
              rate={x.rate}
              address={x.address.detail_address}
              thumbnail={x.list_image[0].url}
              wishlist={wishlist}
            />
          ))}
        </CardList>
      </div>
      <div className={cx("doawnload-section")}>
        <div className={cx("doawnload-container")}>
          <h2 className="text-3xl font-bold">
            Download Our <br /> Mobile App
          </h2>
          <span>Available for free these platforms</span>
          <div className={cx("button-container")}>
            <Button
              className={cx("icon-font")}
              leftIcon={<IoLogoAndroid />}
              medium
              third
            >
              PlayStore
            </Button>

            <Button
              className={cx("icon-font")}
              leftIcon={<IoLogoApple />}
              medium
              third
            >
              AppleStore
            </Button>
          </div>
        </div>
        <div className={cx("icon-download")}>
          <DiAndroid />
        </div>
      </div>

      <div className={cx("newsletter")}>
        <div className={cx("newsletter__information")}>
          <h3 className={cx("newsletter__title")}>newsletter</h3>
          <span className={cx("newsletter__desc")}>Stay Up To Date</span>
        </div>
        <div className={cx("input-container")}>
          <input className={cx("input-field")} placeholder="Email" />

          <IconContext.Provider value={{ color: "#fff" }}>
            <div className={cx("send__container")}>
              <AiOutlineSend />
            </div>
          </IconContext.Provider>
        </div>
      </div>
    </LayoutPrimary>
  );
}
export default HomeBooking;
