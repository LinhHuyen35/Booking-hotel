import React, { useState } from "react";
import styles from "./signupVerification.module.css";

import classNames from "classnames/bind";
import Button from "components/Button/Button";

const cx = classNames.bind(styles);

const SignupVerification = ({ setCode }) => {
  const handleChange = (e) => {
    setCode(e.target.value);
    console.log(e.target.value);
  };
  return (
    <div className="flex flex-col justify-between gap-12">
      <h1 className="text-3xl font-bold text-white">
        We have send you otp code
      </h1>
      <div>
        <input className="px-4 py-2" onChange={handleChange} />
      </div>

      <Button green>Send Otp</Button>
    </div>
  );
};

export default SignupVerification;
