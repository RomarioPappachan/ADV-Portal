"use client";

function InputSelect({
  type = "",
  id = "",
  name = "",
  label = "",
  value = "",
  optionsArray = [],
  onChange,
  formData = {},
}) {
  return (
    <div className="relative w-full">
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="peer w-full p-3 border text-gray-600 border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="" disabled selected>
          -- Select {label} --
        </option>
        {optionsArray.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
        {/* <option value="1">Ordinary</option>
        <option value="0">Life</option> */}
      </select>
      <label
        htmlFor="membershipType"
        className="absolute left-3 top-0 text-xs text-gray-500 bg-white px-1 cursor-text"
      >
        Membership Type
      </label>
    </div>
  );
}

export default InputSelect;
