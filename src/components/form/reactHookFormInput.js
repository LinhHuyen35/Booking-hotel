import React, { useState } from "react";

const ReactHookFormInput = ({
  icon,
  register,
  valid,
  required,
  value,
  showPassWord,
  type,
  ...props
}) => {
  const [passwordVisible, setPasswordvisisble] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleFocus = () => {
    setIsInputFocused(true);
  };

  const handleBlur = () => {
    setIsInputFocused(false);
  };

  const handleShowPassword = () => {
    setPasswordvisisble(!passwordVisible);
  };

  return (
    <label
      className={`flex items-center border-b-2 relative ${
        valid ? "border-red" : isInputFocused ? "border-blue" : "border-black"
      }`}
    >
      <span
        className={`${
          valid ? "text-red" : isInputFocused ? "text-blue" : "text-black"
        }`}
      >
        {icon}
      </span>
      <input
        {...register(value, { required })}
        type={passwordVisible ? "text" : type}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full px-4 py-3 font-bold ${
          valid
            ? "placeholder:focus:text-red placeholder:text-red focus:text-red"
            : "placeholder:focus:text-blue focus:text-blue "
        }`}
        {...props}
      />
      <span className="absolute right-0 text-xl" onClick={handleShowPassword}>
        {showPassWord && showPassWord}
      </span>
    </label>
  );
};

export default ReactHookFormInput;
