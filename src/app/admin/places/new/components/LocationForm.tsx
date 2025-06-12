'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { usePlaceForm } from '../../../../context/PlaceFormContext';

// Dynamically load the map (client-only)
const ClientMap = dynamic(() => import('./ClientMap'), { ssr: false });

export default function LocationForm() {
  const { formData, updateFormData } = usePlaceForm();
  const [position, setPosition] = useState<[number, number]>([
    formData.latitude ?? 20.5937,
    formData.longitude ?? 78.9629,
  ]);

  useEffect(() => {
    updateFormData({ latitude: position[0], longitude: position[1] });
  }, [position]);

  const handleLatChange = (lat: number) => setPosition([lat, position[1]]);
  const handleLngChange = (lng: number) => setPosition([position[0], lng]);

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm">
      {/* Section Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Location Info</h2>
        <p className="text-sm text-gray-500">
          Enter the geographic and regional details for this place.
        </p>
      </div>

      {/* Location Description */}
      <div>
        <label className="font-medium block mb-2 text-sm text-gray-700">
          Location Description
        </label>
        <input
          type="text"
          value={formData.locationDescription || ''}
          onChange={(e) => updateFormData({ locationDescription: e.target.value })}
          className="w-full border border-gray-300 rounded-md p-3 bg-[#f9f6f2] focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="e.g. Near the Ganges river"
        />
      </div>

      {/* Region, State, Country */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="font-medium block mb-2 text-sm text-gray-700">Region</label>
          <input
            type="text"
            value={formData.region || ''}
            onChange={(e) => updateFormData({ region: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-3 bg-[#f9f6f2] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. North"
          />
        </div>
        <div>
          <label className="font-medium block mb-2 text-sm text-gray-700">State</label>
          <input
            type="text"
            value={formData.state || ''}
            onChange={(e) => updateFormData({ state: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-3 bg-[#f9f6f2] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Uttar Pradesh"
          />
        </div>
        <div>
          <label className="font-medium block mb-2 text-sm text-gray-700">Country</label>
          <input
            type="text"
            value={formData.country || ''}
            onChange={(e) => updateFormData({ country: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-3 bg-[#f9f6f2] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. India"
          />
        </div>
      </div>

      {/* Latitude & Longitude */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="font-medium block mb-2 text-sm text-gray-700">Latitude</label>
          <input
            type="number"
            value={position[0]}
            onChange={(e) => handleLatChange(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-3 bg-[#f9f6f2] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 20.5937"
          />
        </div>
        <div>
          <label className="font-medium block mb-2 text-sm text-gray-700">Longitude</label>
          <input
            type="number"
            value={position[1]}
            onChange={(e) => handleLngChange(parseFloat(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-3 bg-[#f9f6f2] focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 78.9629"
          />
        </div>
      </div>

      {/* Map */}
      <div>
        <label className="block mb-2 font-medium text-sm text-gray-700">
          Pick Location on Map
        </label>
        <div className="rounded-md overflow-hidden border border-gray-300">
          <ClientMap position={position} onDrag={(lat, lng) => setPosition([lat, lng])} />
        </div>
      </div>
    </div>
  );
}
