import React, { useEffect, useState } from "react";
import TextAreaFormik from "../../../components/TextAreaFormik/TextAreaFormik";
import styles from "./AddRooms1.module.css";
import ScrollToTop from "../../../components/ScrollToTop";
import RadioFormik from "../../../components/RadioFormik/RadioFormik";
import MyInput from "../../../components/MyInput/MyInput";
import LayoutPrimary from "layouts/LayoutPrimary";
import Counter from "../../../components/Counter/Counter";
import classNames from "classnames/bind";
import Button from "../../../components/Button/Button";
import axios from "axios";
import { Formik } from "formik";
import { BiEdit } from "react-icons/bi";

const cx = classNames.bind(styles);

function AddRooms1() {
  const hotelId = (() => {
    const storageRoomsData = JSON.parse(localStorage.getItem("hotelData"));

    return storageRoomsData ?? [];
  })();

  const [rooms, setRooms] = useState([]);
  const [input, showInput] = useState(false);
  const [tab, setTab] = useState("addproperty2");
  const handleChangeTab = (x) => {
    setTab(x);
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_ROOM}/hotel/${hotelId}/rooms?page=1&limit=10`
      )
      .then(function (response) {
        // response.data.items.length > 0
        //   ? setRooms(response.data.items)
        //   : setRooms([]);
        if (response.data.items) {
          setRooms(response.data.items);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [hotelId]);

  const handleClick = () => {
    showInput(!input);
  };
  return (
    <LayoutPrimary host>
      <ScrollToTop />

      <Formik
        initialValues={{
          name: "",
          type: "",
          price: 0,
          quantity: 0,
          description: "",
          list_amenity: [],
        }}
        initialTouched={{
          field: true,
        }}
        validateOnMount
        // validationSchema={Yup.object({
        //   name: Yup.string().required("Required"),
        //   quantity: Yup.number().required("Required"),
        // })}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            resetForm({
              name: "",
              type: "",
              price: 0,
              quantity: 0,
              description: "",
            });

            setSubmitting(false);
          }, 1000);
          console.log(values);
        }}
      >
        {(formik) => {
          return (
            <form
              onSubmit={formik.handleSubmit}
              className={cx("sign-up__form")}
            >
              {tab === "addproperty1" && (
                <div>
                  <div className={cx("content-add1-container")}>
                    <h1 id={styles["title"]}>
                      What kind of place will you host?{" "}
                    </h1>
                    <div className={cx("add1-container")}>
                      <RadioFormik name="type" value="Apartment">
                        Apartment
                      </RadioFormik>
                      <RadioFormik name="type" value="Rooms">
                        Rooms
                      </RadioFormik>
                      <RadioFormik name="type" value="Villa">
                        Villa
                      </RadioFormik>
                    </div>
                    <Button
                      onClick={() => {
                        handleChangeTab("addproperty3");
                      }}
                      // type="submit"
                      small
                      green
                      rounded
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}

              {tab === "addproperty2" && (
                <div className={cx("add-properties")}>
                  <div className={cx("add2-container")}>
                    <h2>List of properties</h2>
                    <div className={cx("add-container")}>
                      <div className={cx("banner")}>
                        Add some properties to your palace
                      </div>
                      <i
                        className={cx("add-icon")}
                        onClick={() => {
                          handleChangeTab("addproperty1");
                        }}
                      >
                        <svg
                          width="36"
                          height="36"
                          viewBox="0 0 36 36"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M33.4286 14.1429H21.8571V2.57143C21.8571 1.15152 20.7056 0 19.2857 0H16.7143C15.2944 0 14.1429 1.15152 14.1429 2.57143V14.1429H2.57143C1.15152 14.1429 0 15.2944 0 16.7143V19.2857C0 20.7056 1.15152 21.8571 2.57143 21.8571H14.1429V33.4286C14.1429 34.8485 15.2944 36 16.7143 36H19.2857C20.7056 36 21.8571 34.8485 21.8571 33.4286V21.8571H33.4286C34.8485 21.8571 36 20.7056 36 19.2857V16.7143C36 15.2944 34.8485 14.1429 33.4286 14.1429Z"
                            fill="#9A9A9A"
                          />
                        </svg>
                      </i>
                    </div>
                    <div className={cx("properties-lists")}>
                      {rooms.length > 0 &&
                        rooms.map((room, index) => (
                          <div className={cx("properties-item")}>
                            <div className={cx("item-information")}>
                              <h2 className={cx("item-name")}>{room.name}</h2>
                              <p className={cx("total-people")}>{room.price}</p>
                            </div>
                            <i
                              className={cx("edit-icon")}
                              onClick={() => {
                                handleChangeTab("addproperty3");
                              }}
                            >
                              <BiEdit />
                            </i>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
              {tab === "addproperty3" && (
                <div className={cx("add3-properties")}>
                  <div>
                    <div className={cx("content3-container")}>
                      {!input ? (
                        <div onClick={handleClick} style={{ height: "200px" }}>
                          {" "}
                          Name
                        </div>
                      ) : (
                        <MyInput
                          className={cx("name", "name-input")}
                          customContainerClasses={cx("custom-input")}
                          name="name"
                          type="text"
                        ></MyInput>
                      )}

                      <div className={cx("facilities-container")}>
                        <h1 className={cx("title")}>
                          Add facilities available at your place.
                        </h1>
                        <div className={cx("counter-container")}>
                          <Counter>Bedrooms</Counter>
                          <Counter>Bathrooms</Counter>
                          <Counter>Parking</Counter>
                        </div>
                      </div>
                      <div className={cx("prices")}>
                        <h1 className={cx("title")}>Price</h1>
                        <MyInput
                          className={cx("input", "name-input")}
                          name="price"
                          type="number"
                        ></MyInput>
                      </div>
                      <div>
                        <h1 className={cx("title")}>
                          Add amenities available at your place.
                        </h1>
                        <div className={cx("amenities-list")}>
                          <RadioFormik
                            checkbox
                            value="television"
                            name="list_amenity"
                          >
                            Television
                          </RadioFormik>
                          <RadioFormik
                            checkbox
                            value={{ name: "wifi" }}
                            name="list_amenity"
                          >
                            Wifi
                          </RadioFormik>
                          <RadioFormik
                            checkbox
                            value="washer"
                            name="list_amenity"
                          >
                            Washer
                          </RadioFormik>
                          <RadioFormik
                            checkbox
                            value="balcony"
                            name="list_amenity"
                          >
                            Balcony
                          </RadioFormik>
                          <RadioFormik
                            checkbox
                            value="cleaner"
                            name="list_amenity"
                          >
                            Cleaner
                          </RadioFormik>
                          <RadioFormik
                            checkbox
                            value="radio"
                            name="list_amenity"
                          >
                            Radio
                          </RadioFormik>
                          <RadioFormik
                            checkbox
                            value="lift"
                            name="list_amenity"
                          >
                            Lift
                          </RadioFormik>
                          <RadioFormik
                            checkbox
                            value="other"
                            name="list_amenity"
                          >
                            Other
                          </RadioFormik>
                        </div>
                      </div>
                      <div>
                        <h1 className={cx("title")}>
                          Add description at your place.
                        </h1>
                        <div>
                          {/* <textarea
                          className={cx("text-area")}
                          value={text}
                          onChange={handleChange}
                        ></textarea> */}
                          <TextAreaFormik
                            name="description"
                            placeholder="Enter your introduce"
                            id="intro"
                          ></TextAreaFormik>
                        </div>
                      </div>
                      <Button className={cx("save")} small green type="submit">
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}
              {tab === "addproperty4" && (
                <div>
                  <div className={cx("add4-content-container")}>
                    <h1 id={styles["title"]}>
                      Information can be added in similar way.
                    </h1>
                    <p>
                      The other required information can be added in a similar
                      presentation for listing the property fluently...
                    </p>
                    <Button
                      className={cx("save")}
                      medium
                      secondary
                      rounded
                      type="submit"
                      // onClick={resetTab}
                    >
                      Post My Property
                    </Button>
                  </div>
                </div>
              )}
              <Button
                className={cx("sign-up__button", "disabled")}
                to="/HostProperties"
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Sign Up
              </Button>
            </form>
          );
        }}
      </Formik>
    </LayoutPrimary>
  );
}

export default AddRooms1;
