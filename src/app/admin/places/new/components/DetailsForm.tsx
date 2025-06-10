'use client';

import { useFormContext } from "@/app/context/FormContext";

// import { useFormContext } from '../context/PlaceFormContext';

const DetailsForm = () => {
  const { formData, setFormData } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Religious Importance */}
      <div>
        <h3 className="font-semibold text-sm mb-1">Religious Importance</h3>
        <textarea
          placeholder="Describe the religious importance of this place"
          className="w-full border p-3 rounded-md bg-[#f9f6f2]"
          value={formData.religiousImportance || ''}
          onChange={(e) =>
            setFormData({ ...formData, religiousImportance: e.target.value })
          }
        />
        <p className="text-xs text-gray-500 mt-1">
          Explain why this place is important in Hindu tradition.
        </p>
      </div>

      {/* Historical Background */}
      <div>
        <h3 className="font-semibold text-sm mb-1">Historical Background</h3>
        <textarea
          placeholder="Provide historical background of this place"
          className="w-full border p-3 rounded-md bg-[#f9f6f2]"
          value={formData.historicalBackground || ''}
          onChange={(e) =>
            setFormData({ ...formData, historicalBackground: e.target.value })
          }
        />
        <p className="text-xs text-gray-500 mt-1">
          Share the history and stories associated with this place.
        </p>
      </div>
    </div>
  );
};

export default DetailsForm;
