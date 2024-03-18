import React from "react";

const InputEmail = ({ label, htFor, required, value, setValue }) => {
  return (
    <div className="">
      <label
        htmlFor={htFor}
        className="block text-[#717171] text-sm capitalize"
      >
        {label}:
      </label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required={required}
        type="email"
        id={htFor}
        name={htFor}
        className="w-full rounded border border-[#cecece] bg-[#f6f6f6] text-[#717171] text-sm"
      ></input>
    </div>
  );
};

export default InputEmail;
