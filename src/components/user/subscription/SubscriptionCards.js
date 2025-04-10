import React from "react";

function SubscriptionCards() {
  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 py-4 px-2">
      {/* Parking Sticker */}
      <div className="w-full md:w-1/3 h-56 flex flex-col justify-between bg-card rounded-lg p-4">
        <h1 className="text-xl md:text-2xl text-white font-semibold">
          Parking Sticker
        </h1>
        <div className="text-white">
          <p className="mb-2">Rs. 50.00</p>
          <p>Parking Sticker</p>
        </div>
        <button className="w-full h-10 bg-blue-500 shadow-amber-50 shadow-2xl hover:bg-blue-600 cursor-pointer text-white font-semibold rounded-lg">
          Pay Now
        </button>
      </div>

      {/* Identity Card */}
      <div className="w-full md:w-1/3 h-56 flex flex-col justify-between bg-idcard rounded-lg p-4">
        <h1 className="text-xl md:text-2xl text-white font-semibold">
          Identity Card
        </h1>
        <div className="text-white">
          <p className="mb-2">Rs. 50.00</p>
          <p>Identity Card</p>
        </div>
        <button className="w-full h-10 bg-teal-500 text-white font-semibold rounded-lg">
          Pay Now
        </button>
      </div>

      {/* Medical Aid */}
      <div className="w-full md:w-1/3 h-56 flex flex-col justify-between bg-medical rounded-lg p-4">
        <h1 className="text-xl md:text-2xl text-white font-semibold">
          Medical Aid Scheme Subscription
        </h1>
        <div className="text-white">
          <p className="mb-2">Rs. 50.00</p>
          <p>Medical Aid Scheme Subscription</p>
        </div>
        <button className="w-full h-10 bg-teal-500 text-white font-semibold rounded-lg">
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default SubscriptionCards;
