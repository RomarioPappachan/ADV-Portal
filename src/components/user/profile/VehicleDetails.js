"use client";

import { useState } from "react";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import EditVehicle from "./EditVehicle";
import DeleteVehicle from "./DeleteVehicle";

function VehicleDetails({ vehicle }) {
  const [showEditVehicle, setShowEditVehicle] = useState(false);
  const [showDeleteVehicle, setShowDeleteVehicle] = useState(false);
  return (
    <div
      key={vehicle.id}
      className="relative bg-white border border-gray-300 rounded-lg p-4 shadow-sm"
    >
      {/* Card Action Buttons */}
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          onClick={() => setShowEditVehicle(true)}
          className="text-gray-600 hover:text-blue-600 cursor-pointer"
          title="Edit"
        >
          <LuPencil size={16} />
        </button>
        <button
          onClick={() => setShowDeleteVehicle(true)}
          className="text-gray-600 hover:text-red-600 cursor-pointer"
          title="Delete"
        >
          <LuTrash2 size={16} />
        </button>
      </div>

      {/* Vehicle Info */}
      <div className="space-y-3 text-sm">
        <div>
          <p className="text-gray-500 font-medium">Brand</p>
          <p className="text-gray-900 font-semibold">{vehicle.brand}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Model</p>
          <p className="text-gray-900 font-semibold">{vehicle.model}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Registration No.</p>
          <p className="text-gray-900 font-semibold">{vehicle.regno}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Year of Manufacture</p>
          <p className="text-gray-900 font-semibold">{vehicle.year}</p>
        </div>
        <div>
          <p className="text-gray-500 font-medium">Fuel Type</p>
          <p className="text-gray-900 font-semibold">{vehicle.fuel}</p>
        </div>
      </div>
      {showEditVehicle && (
        <EditVehicle
          vehicle={vehicle}
          onClose={() => setShowEditVehicle(false)}
        />
      )}
      {showDeleteVehicle && (
        <DeleteVehicle
          vehicle={vehicle}
          onClose={() => setShowDeleteVehicle(false)}
        />
      )}
    </div>
  );
}

export default VehicleDetails;
