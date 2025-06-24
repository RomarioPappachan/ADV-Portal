// "use client";

// import { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// import { useAuthStore } from "@/store/authStore";
// import { useProceedingsStore } from "@/store/proceedingsStore";

// import { LuX } from "react-icons/lu";
// import toast from "react-hot-toast";

// export default function Proceedings({ caseNo, onClose }) {
//   const { userInfo } = useAuthStore();
//   const { getProceedings, addProceeding, editProceeding, removeProceeding } =
//     useProceedingsStore();

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [mounted, setMounted] = useState(false);

//   const [proceeding, setProceeding] = useState("");

//   const userId = userInfo?.id; //for api calls

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   useEffect(() => {
//     if (userId) getProceedings(userId);
//   }, [getProceedings, userId]);

//   const handleChange = (e) => {
//     setProceeding(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!proceeding) return;

//     const proceedingData = {
//       advId: userId,
//       description: proceeding,
//       cn_no: caseNo,
//     };

//     try {
//       //Api call
//       addProceeding(proceedingData);
//       getProceedings(userId);
//     } catch (error) {
//       toast.error("Failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleUpdate = async (e, proceedingId) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     if (!proceeding) return;

//     const updatedData = {
//       advId: userId,
//       description: proceeding,
//       cn_no: caseNo,
//     };

//     try {
//       //Api call
//       editProceeding(proceedingId, updatedData);
//       getProceedings(userId);
//     } catch (error) {
//       toast.error("Failed");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleDelete = async (e, proceedingId) => {
//     e.preventDefault();

//     try {
//       //Api call
//       removeProceeding(proceedingId);
//       getProceedings(userId);
//     } catch (error) {
//       toast.error("Failed");
//     }
//   };

//   if (!mounted) return null;

//   return createPortal(
//     <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 py-6 overflow-y-auto">
//       <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mt-20 max-h-screen overflow-y-auto relative">
//         {/* Close Button */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
//         >
//           <LuX size={20} />
//         </button>

//         <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
//           Proceedings
//         </h2>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 md:grid-cols-2 gap-4"
//         >
//           {/* Address (Full Width) */}
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-600">
//               Description
//             </label>
//             <textarea
//               name="proceeding"
//               value={proceeding}
//               onChange={handleChange}
//               rows={3}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//           </div>

//           {/* Submit */}
//           <div className="md:col-span-2 pt-4">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200 text-sm"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>,
//     document.body
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useAuthStore } from "@/store/authStore";
import { useProceedingsStore } from "@/store/proceedingsStore";
import { LuX } from "react-icons/lu";
import toast from "react-hot-toast";
import ProceedingCard from "./ProceedingCard";

export default function Proceedings({ caseNo, onClose }) {
  const { userInfo } = useAuthStore();
  const {
    getProceedings,
    addProceeding,
    editProceeding,
    removeProceeding,
    proceedingsList,
  } = useProceedingsStore();

  const userId = userInfo?.id;
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [newText, setNewText] = useState("");

  // local UI state
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (userId) getProceedings(userId);
  }, [getProceedings, userId]);

  const handleNewSubmit = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    setIsSubmitting(true);
    try {
      await addProceeding({
        advId: userId,
        cn_no: caseNo,
        description: newText,
      });
      setNewText("");
      getProceedings(userId);
    } catch {
      toast.error("Failed to add");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (id) => {
    if (!editedText.trim()) return;
    try {
      await editProceeding(id, {
        advId: userId,
        cn_no: caseNo,
        description: editedText,
      });
      setEditingId(null);
      getProceedings(userId);
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await removeProceeding(id);
      setDeletingId(null);
      getProceedings(userId);
    } catch {
      toast.error("Delete failed");
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 px-4 py-6 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-4 sm:p-6 md:p-8 mt-20 max-h-screen overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <LuX size={20} />
        </button>

        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Case Proceedings
        </h2>

        {/* Proceeding List */}
        <div className="space-y-4 mb-6">
          {proceedingsList.map((p) => (
            <ProceedingCard
              key={p.id}
              proceeding={p}
              isEditing={editingId === p.id}
              isDeleting={deletingId === p.id}
              editedText={editedText}
              setEditedText={setEditedText}
              onEdit={(proceeding) => {
                setEditingId(proceeding.id);
                setEditedText(proceeding.description);
                setDeletingId(null);
              }}
              onCancelEdit={() => {
                setEditingId(null);
                setEditedText("");
              }}
              onDelete={(id) => {
                setDeletingId(id);
                setEditingId(null);
              }}
              onCancelDelete={() => setDeletingId(null)}
              onConfirmDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ))}
        </div>

        {/* Add New Proceeding */}
        <form onSubmit={handleNewSubmit} className="mt-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Add New Proceeding
          </label>
          <textarea
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            rows={3}
            className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write proceeding..."
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition duration-200 text-sm"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
