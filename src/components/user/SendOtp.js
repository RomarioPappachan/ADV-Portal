"use client";

function SendOtp({ mobileNo, setMobileNo, onSendOtp }) {
  return (
    <form className="py-6 px-6 space-y-8" onSubmit={onSendOtp}>
      <h1 className="text-[#3f51b5] text-xl font-semibold text-center">
        Member Login
      </h1>

      {/* Mobile number Input */}
      <div className="relative w-full">
        <input
          type="tel"
          id="mobileNo"
          value={mobileNo}
          onChange={(e) => {
            const val = e.target.value;
            setMobileNo(val);
          }}
          minLength={10}
          maxLength={10}
          className="peer w-full p-3 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <label
          htmlFor="mobileNo"
          className={`absolute left-3 text-gray-500 transition-all bg-white px-1 
                ${
                  mobileNo
                    ? "top-0 text-xs text-blue-500"
                    : "top-3 text-gray-400 text-base peer-focus:top-0 peer-focus:text-xs peer-focus:text-blue-500"
                }`}
        >
          Mobile number
        </label>
      </div>

      <button
        type="submit"
        className="w-full h-12 flex justify-center items-center text-base text-white font-semibold rounded-lg bg-[#3f51b5] cursor-pointer"
      >
        Send OTP
      </button>
    </form>
  );
}

export default SendOtp;
