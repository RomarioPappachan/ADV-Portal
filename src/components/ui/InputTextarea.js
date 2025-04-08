"use client";

function InputTextarea({
  type = "",
  id = "",
  name = "",
  label = "",
  value = "",
  onChange,
  rows = 3,
  formData = {},
}) {
  return (
    <div key={name} className="relative w-full">
      <textarea
        type={type}
        id={id}
        name={name}
        value={value}
        rows={rows}
        onChange={(e) => onChange(e)}
        required
        className="peer w-full p-3 text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
      />
      <label
        htmlFor={name}
        className={`absolute left-3 text-gray-500 transition-all bg-white cursor-text
                ${
                  formData[name]
                    ? "top-0 text-xs text-gray-500"
                    : "top-3 w-56 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-gray-400"
                }`}
      >
        {label}
      </label>
    </div>
  );
}

export default InputTextarea;
