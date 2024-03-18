import React from "react";

const InputSelect = ({ htFor, label, required, options, value, setValue }) => {
  return (
    <div>
      <label
        htmlFor={htFor}
        className="block text-[#717171] text-sm capitalize"
      >
        {label}:
      </label>
      <select
        id={htFor}
        name={htFor}
        className="w-full rounded border border-[#cecece] bg-[#f6f6f6] text-[#717171] text-sm"
        required={required}
        value={value}
        onChange={e => setValue(e.target.value)}
      >
        <option value="" defaultValue disabled>Select one</option>
        {
            options.map((opt, index) => <option className="bg-[#f6f6f6] text-[#717171]" value={opt} key={index}>{opt}</option>)
        }
      </select>
    </div>
  );
};

export default InputSelect;
