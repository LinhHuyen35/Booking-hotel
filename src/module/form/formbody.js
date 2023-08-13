import React from "react";
import { useNavigate } from "react-router-dom";

const FormBody = ({
  title = "Sign Up",
  submitButton = "Register",
  img = "https://colorlib.com/etc/regform/colorlib-regform-7/images/signup-image.jpg",
  otherButton = "Already a member ?",
  children,
  host,
  role,
}) => {
  const navigate = useNavigate();

  const handleLink = () => {
    if (otherButton === "Dont have an account ?" && !host) {
      navigate("/SignUp");
    } else if (otherButton === "Dont have an account ?" && host) {
      navigate("/SignUpHost");
    } else if (role === "customer") {
      navigate("/Login");
    } else if (role === "host") {
      navigate("/LoginHost");
    }
  };

  return (
    <div className="flex flex-col gap-8 xl:flex-row ">
      <div className="flex flex-col xl:flex-1">
        <h1 className="mb-8 text-3xl font-bold text-center">{title}</h1>
        <div className="flex flex-col gap-4">
          {children}
          <button
            type="submit"
            className="self-center w-2/5 py-2 mt-20 text-white rounded bg-blue xl:mt-12 xl:self-start xl:w-[38%] xl:py-3 "
          >
            {submitButton}
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 xl:flex-1 xl:justify-between">
        <img src={img} alt="a" />
        <div
          className="self-center text-sm font-bold underline cursor-pointer xl:py-4"
          onClick={handleLink}
        >
          {otherButton}
        </div>
      </div>
    </div>
  );
};

export default FormBody;
