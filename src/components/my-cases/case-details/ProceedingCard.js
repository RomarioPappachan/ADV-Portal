"use client";
import { useState } from "react";
import { LuPencil, LuTrash2, LuCheck, LuX } from "react-icons/lu";

export default function ProceedingCard({
  proceeding,
  onEdit,
  onDelete,
  onConfirmDelete,
  onCancelDelete,
  onCancelEdit,
  onUpdate,
  isEditing,
  isDeleting,
  editedText,
  setEditedText,
}) {
  return (
    <div className="border border-gray-300 rounded-md p-4 space-y-2 relative">
      {isEditing ? (
        <>
          <textarea
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows={3}
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={() => onUpdate(proceeding.id)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-4 rounded-md text-sm"
            >
              Update
            </button>
            <button
              onClick={() => onCancelEdit()}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-4 rounded-md text-sm"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-sm text-gray-800 whitespace-pre-wrap">
            {proceeding.description}
          </p>
          <div className="flex gap-4 text-gray-500">
            <button onClick={() => onEdit(proceeding)}>
              <LuPencil className="hover:text-blue-600" />
            </button>
            <button onClick={() => onDelete(proceeding.id)}>
              <LuTrash2 className="hover:text-red-600" />
            </button>
          </div>
        </>
      )}

      {isDeleting && (
        <div className="mt-4 p-3 bg-gray-100 rounded-md flex items-center justify-between">
          <span className="text-sm text-gray-700">Confirm delete?</span>
          <div className="flex gap-2">
            <button
              onClick={() => onConfirmDelete(proceeding.id)}
              className="text-sm px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-md"
            >
              Delete
            </button>
            <button
              onClick={() => onCancelDelete()}
              className="text-sm px-3 py-1 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
