"use client";

function StatsNav({ tabNumber, setTabNumber }) {
  return (
    <nav className="">
      <ul className="grid grid-cols-3 text-center">
        {/* Parking Sticker, Identity Card, Medical Aid Scheme Subscription */}
        <li
          className={`pb-1 ${
            tabNumber === 1
              ? "bg-gradient-to-r from-blue-600  to-blue-500"
              : "bg-gray-300"
          }`}
        >
          <button
            className={`w-full bg-white text-lg h-12 flex items-center justify-center ${
              tabNumber === 1 ? "text-blue-400" : "text-black hover:bg-blue-50"
            }`}
            onClick={() => setTabNumber(1)}
          >
            Parking Sticker
          </button>
        </li>
        <li
          className={`pb-1 ${
            tabNumber === 2
              ? "bg-gradient-to-r from-blue-600  to-blue-500"
              : "bg-gray-300 hover:bg-blue-100"
          }`}
        >
          <button
            className={`w-full bg-white text-lg h-12 flex items-center justify-center ${
              tabNumber === 2
                ? "text-blue-400"
                : "text-black hover:text-blue-300"
            }`}
            onClick={() => setTabNumber(2)}
          >
            Identity Card
          </button>
        </li>
        <li
          className={`pb-1 ${
            tabNumber === 3
              ? "bg-gradient-to-r from-blue-600  to-blue-500"
              : "bg-gray-300 hover:bg-blue-100"
          }`}
        >
          <button
            className={`w-full bg-white text-lg h-12 flex items-center justify-center ${
              tabNumber === 3
                ? "text-blue-400"
                : "text-black hover:text-blue-300"
            }`}
            onClick={() => setTabNumber(3)}
          >
            Medical Aid Scheme Subscription
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default StatsNav;
