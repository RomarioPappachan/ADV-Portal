import React from "react";

const page = () => {
  return (
    <div className="p-3 text-gray-800">
      <h1 className="text-black font-semibold text-2xl mb-4">My Cases</h1>

      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        {/* Card 1 */}
        <div className="w-full md:w-1/3 h-56 flex flex-col justify-between bg-teal-300 rounded-lg p-4">
          <h1 className="text-xl md:text-2xl font-semibold">
            Special Title treatment
          </h1>
          <p className="text-sm md:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
            dolore hic autem temporibus iusto minima quasi.
          </p>
          <button className="w-full h-10 bg-teal-500 text-white font-semibold rounded-lg">
            View
          </button>
        </div>

        {/* Card 2 */}
        <div className="w-full md:w-1/3 h-56 flex flex-col justify-between bg-teal-300 rounded-lg p-4">
          <h1 className="text-xl md:text-2xl font-semibold">
            Special Title treatment
          </h1>
          <p className="text-sm md:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
            dolore hic autem temporibus iusto minima quasi.
          </p>
          <button className="w-full h-10 bg-teal-500 text-white font-semibold rounded-lg">
            View
          </button>
        </div>

        {/* Card 3 */}
        <div className="w-full md:w-1/3 h-56 flex flex-col justify-between bg-teal-300 rounded-lg p-4">
          <h1 className="text-xl md:text-2xl font-semibold">
            Special Title treatment
          </h1>
          <p className="text-sm md:text-base">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed,
            dolore hic autem temporibus iusto minima quasi.
          </p>
          <button className="w-full h-10 bg-teal-500 text-white font-semibold rounded-lg">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
