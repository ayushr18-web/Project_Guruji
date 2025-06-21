'use client';

import { usePlaceForm } from "@/app/context/PlaceFormContext";

const DetailsForm = () => {
  const { formData, updateFormData } = usePlaceForm();

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm">
      {/* Section Title */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Additional Details
        </h2>
        <p className="text-sm text-gray-500">
          Provide more context about the cultural or historical significance of this place.
        </p>
      </div>

      {/* Religious Importance */}
      <div>
        <label className="font-medium block mb-2 text-sm text-gray-700">
          Religious Importance
        </label>
        <textarea
          placeholder="Describe the religious importance of this place"
          className="w-full border border-gray-300 p-3 rounded-md bg-[#f9f6f2] focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          value={formData.religiousImportance || ''}
          onChange={(e) =>
            updateFormData({ religiousImportance: e.target.value })
          }
        />
        <p className="text-xs text-gray-500 mt-2">
          Explain why this place is important in Hindu tradition.
        </p>
      </div>

      {/* Historical Background */}
      <div>
        <label className="font-medium block mb-2 text-sm text-gray-700">
          Historical Background
        </label>
        <textarea
          placeholder="Provide historical background of this place"
          className="w-full border border-gray-300 p-3 rounded-md bg-[#f9f6f2] focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
          value={formData.historicalBackground || ''}
          onChange={(e) =>
            updateFormData({ historicalBackground: e.target.value })
          }
        />
        <p className="text-xs text-gray-500 mt-2">
          Share the history and stories associated with this place.
        </p>
      </div>
    </div>
  );
};

export default DetailsForm;
