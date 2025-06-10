// components/LocationForm.tsx
'use client';

import { usePlaceForm } from "../../../../context/PlaceFormContext";

// import { usePlaceForm } from '@/context/PlaceFormContext';

export default function LocationForm() {
  const { formData, updateFormData } = usePlaceForm();
  

  return (
    <div className="space-y-4">
      <div>
        <label>Location Description</label>
        <input
          type="text"
          value={formData.locationDescription}
          onChange={(e) => updateFormData({ locationDescription: e.target.value })}
          className="w-full border rounded p-2"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label>Region</label>
          <input
            type="text"
            value={formData.region}
            onChange={(e) => updateFormData({ region: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label>State</label>
          <input
            type="text"
            value={formData.state}
            onChange={(e) => updateFormData({ state: e.target.value })}
            className="w-full border rounded p-2"
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            value="India"
            disabled
            className="w-full border rounded p-2 bg-gray-100"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Latitude</label>
          <input
            type="number"
            value={formData.latitude ?? ''}
            onChange={(e) => updateFormData({ latitude: parseFloat(e.target.value) })}
            className="w-full border rounded p-2"
            placeholder="e.g. 20.5937"
          />
        </div>
        <div>
          <label>Longitude</label>
          <input
            type="number"
            value={formData.longitude ?? ''}
            onChange={(e) => updateFormData({ longitude: parseFloat(e.target.value) })}
            className="w-full border rounded p-2"
            placeholder="e.g. 78.9629"
          />
        </div>
      </div>
    </div>
  );
}
