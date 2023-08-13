import React from "react";

const ReactHookFormSelect = ({ register, value }) => {
  return (
    <label>
      <select
        {...register(value)}
        className="w-full px-3 py-4 border-b-2 border-b-black focus-visible:outline-0"
      >
        <option className="" value="male">
          Male
        </option>
        <option className="h-4" value="female">
          Female
        </option>
      </select>
    </label>
  );
};

export default ReactHookFormSelect;
