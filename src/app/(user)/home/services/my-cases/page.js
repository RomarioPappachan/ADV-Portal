import React from "react";

const page = () => {
  return (
    <div className="p-3">
      <h1 className="text-black font-semibold text-2xl">My Cases</h1>

      <div className="flex justify-between gap-4 py-4 ">
        <div className="w-1/3 h-56 flex flex-col justify-between bg-teal-300 rounded-lg  p-3 ">
          <h1 className="text-2xl">Special Title treatment</h1>
          <div>
            <p>
              {" "}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
              dolore hic autem temporibus iusto minima quasi
            </p>
          </div>

          <button className="w-full h-10 bg-teal-500 text-white font-semibold rounded-lg">
            Pay Now
          </button>
        </div>
        <div className="w-1/3 h-56 flex flex-col justify-between bg-teal-300 rounded-lg  p-3 ">
          <h1 className="text-2xl">Special Title treatment</h1>
          <div>
            <p>
              {" "}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
              dolore hic autem temporibus iusto minima quasi
            </p>
          </div>

          <button className="w-full h-10 bg-teal-500 text-white font-semibold rounded-lg">
            Pay Now
          </button>
        </div>
        <div className="w-1/3 h-56 flex flex-col justify-between bg-teal-300 rounded-lg  p-3 ">
          <h1 className="text-2xl">Special Title treatment</h1>
          <div>
            <p>
              {" "}
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
              dolore hic autem temporibus iusto minima quasi
            </p>
          </div>

          <button className="w-full h-10 bg-teal-500 text-white font-semibold rounded-lg">
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
