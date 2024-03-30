import React from "react";

const InputNumber = ({ label, htFor, required, value, setValue }) => {
  return (
    <div className="">
      <label
        htmlFor={htFor}
        className="block text-[#717171] text-sm capitalize"
      >
        {label}:
      </label>
      <input
        required={required}
        type="number"
        id={htFor}
        name={htFor}
        className="w-full rounded border border-[#cecece] bg-[#f6f6f6] text-[#717171] text-sm"
        value={value}
        onChange={e => setValue(e.target.value)}
      ></input>
    </div>
  );
};

export default InputNumber;
