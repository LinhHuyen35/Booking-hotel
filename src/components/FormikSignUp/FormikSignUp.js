import React, { useRef, useState } from "react";
import { Formik } from "formik";
import styles from "./FormikSignUp.module.css";
import axios from "axios";

import Button from "../../components/Button/Button";

import MyInput from "../../components/MyInput/MyInput";
import RadioFormik from "../RadioFormik/RadioFormik";
import { Link, useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import SignupVerification from "module/account/signupVerification";

const cx = classNames.bind(styles);

function FormikSignUp({ host = false }) {
  const ref = useRef(null);
  const [otp, setOtp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [code, setCode] = useState("");

  const navigate = useNavigate();
  let role = "customer";
  if (host) {
    role = "host";
  }
  const handleEmailVerification = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_USERAUTH}/authentication/verification_email?username=${userEmail}`,
        JSON.stringify(userEmail)
      );
      setOtp(!otp);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={!otp ? cx("sign-up") : cx("sign-up2")}>
      <Formik
        innerRef={ref}
        enableReinitialize={true}
        initialValues={{
          create: {
            username: "",
            password: "",
          },
          signup: {
            role: role,
            description: "",
            user: {
              name: "",
              email: "",
              phone: "",
              note: "hok co ji",
              avatar: "link anh",
              gender: "male",
              account_id: 4,
              address: {
                district: "Quận Từ Liêm",
                province: "Hà Nội",
                detail_address: "98 Quận Từ Liêm, Hà Nội",
              },
            },
          },
        }}
        initialTouched={{
          field: true,
        }}
        validateOnMount
        onSubmit={(values, { resetForm, setSubmitting }) => {
          console.log(values);
          axios
            .post(
              `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_USERAUTH}/authentication/check_expiration_time?otp=${code}&username=hieulequang455@gmail.com`,
              JSON.stringify(code)
            )
            .then(function (response) {
              if (response.data.message === "Checking OTP successfully") {
                setTimeout(() => {
                  axios
                    .post(
                      `${process.env.REACT_APP_HTTSPURL}:${process.env.REACT_APP_USERAUTH}/authentication/sign_up`,
                      JSON.stringify(values.create)
                    )
                    .then(function (response) {
                      values.signup.user.account_id = response.data.id;
                      axios
                        .post(
                          `${process.env.REACT_APP_HTTSPURL}/customer`,
                          JSON.stringify(values.signup)
                        )
                        .then(function (res) {
                          console.log(res);
                        });
                      console.log(values);
                      console.log("succes");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                  navigate(host ? "/LoginHost" : "/login");

                  setSubmitting(false);
                }, 1000);
              }
            });
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={cx("sign-up__form")}>
            {!otp && (
              <div className={cx("wrapper")}>
                {setUserEmail(formik.values.signup.user.email)}
                <div className={cx("col-left")}>
                  <MyInput
                    type="text"
                    label="Full Name"
                    className={cx("input")}
                    name="signup.user.name"
                    placeholder="Enter your Full Name"
                  ></MyInput>

                  <MyInput
                    type="email"
                    label="Email Address"
                    className={cx("input")}
                    customContainerClasses={cx("position")}
                    name="signup.user.email"
                    placeholder="Enter your email"
                  ></MyInput>

                  <MyInput
                    type="password"
                    label="Password"
                    className={cx("input")}
                    name="create.password"
                    placeholder="Enter your password"
                  ></MyInput>
                </div>
                <div className={cx("col-right")}>
                  <MyInput
                    type="text"
                    label="User Name"
                    className={cx("input")}
                    name="create.username"
                    placeholder="Enter your username"
                  ></MyInput>
                  <MyInput
                    type="text"
                    label="Phone Number"
                    className={cx("input")}
                    name="signup.user.phone"
                    placeholder="Enter your number"
                  ></MyInput>
                  <div className={cx("container-parent")}>
                    <div className={cx("container")}>
                      <div className={cx("gender")}>Gender</div>
                      <div className={cx("radio-container")}>
                        <RadioFormik
                          name="signup.user.gender"
                          origin
                          value="Male"
                        >
                          Male
                        </RadioFormik>
                        <RadioFormik
                          origin
                          name="signup.user.gender"
                          value="Female"
                        >
                          Female
                        </RadioFormik>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {otp && <SignupVerification setCode={setCode}></SignupVerification>}
            {!otp && (
              <Button
                className={cx("sign-up__button", "disabled")}
                type="button"
                green
                rounded
                onClick={handleEmailVerification}
                disabled={formik.isSubmitting || !formik.isValid}
              >
                {formik.isSubmitting ? (
                  <div></div>
                ) : (
                  <span>Create Account</span>
                )}
              </Button>
            )}
            {!otp && (
              <div style={{ fontSize: "14px", color: "#a3a6aa" }}>
                Already have an account
                <Link to={!host ? "/Login" : "/LoginHost"}>
                  <span
                    style={{
                      color: "#00b0f4",
                      fontSize: "14px",
                      marginLeft: "3px",
                    }}
                  >
                    Log in
                  </span>
                </Link>
              </div>
            )}
          </form>
        )}
      </Formik>
    </div>
  );
}

export default FormikSignUp;
