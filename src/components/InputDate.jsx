import React from "react";

const InputDate = ({ label, htFor, required, value, setValue, isDisabled }) => {
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
        type="date"
        id={htFor}
        name={htFor}
        className="w-full rounded border border-[#cecece] bg-[#f6f6f6] text-[#717171] text-sm"
        disabled={isDisabled}
        value={value}
        onChange={e => setValue(e.target.value)}
      ></input>
    </div>
  );
};

export default InputDate;
