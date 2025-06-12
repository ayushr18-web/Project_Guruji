'use client';

import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  ForwardRefRenderFunction,
} from 'react';
import { usePlaceForm } from '@/app/context/PlaceFormContext';

type FormErrors = { [key: string]: string };

export type BasicInfoFormHandle = {
  validate: () => boolean;
};

const predefinedData: Record<string, Record<string, string[]>> = {
  North: {
    Delhi: ['New Delhi', 'Old Delhi'],
    Punjab: ['Amritsar', 'Ludhiana'],
  },
  South: {
    TamilNadu: ['Madurai', 'Chennai'],
    Kerala: ['Kochi', 'Trivandrum'],
  },
};

const categoriesList = ['Mountains', 'Temples', 'Rivers'];

const BasicInfoForm: ForwardRefRenderFunction<BasicInfoFormHandle> = (_, ref) => {
  const { formData, updateFormData } = usePlaceForm();
  const [errors, setErrors] = useState<FormErrors>({});

  const toggleCategory = (category: string) => {
    const categories = formData.categories || [];
    const updated = categories.includes(category)
      ? categories.filter((c) => c !== category)
      : [...categories, category];
    updateFormData({ categories: updated });
  };

  const regions = Object.keys(predefinedData);
  const states = formData.region ? Object.keys(predefinedData[formData.region]) : [];
  const cities =
    formData.region && formData.state
      ? predefinedData[formData.region][formData.state]
      : [];

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ region: e.target.value, state: '', city: '' });
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ state: e.target.value, city: '' });
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFormData({ city: e.target.value });
  };

  const validate = () => {
    const newErrors: FormErrors = {};
    if (!formData.region) newErrors.region = 'Region is required.';
    if (!formData.state) newErrors.state = 'State is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.name) newErrors.name = 'Name is required.';
    if (!formData.description) newErrors.description = 'Description is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useImperativeHandle(ref, () => ({ validate }));

  return (
    <div className="space-y-6 bg-white p-6 rounded-xl shadow-md border border-gray-200">
      {/* Region */}
      <div>
        <label className="block mb-1 font-medium">Region</label>
        <select
          className="w-full border rounded-md px-3 py-2 bg-[#f9f6f2]"
          value={formData.region || ''}
          onChange={handleRegionChange}
        >
          <option value="">Select region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        {errors.region && <p className="text-red-500 text-sm">{errors.region}</p>}
      </div>

      {/* State */}
      <div>
        <label className="block mb-1 font-medium">State</label>
        <select
          className="w-full border rounded-md px-3 py-2 bg-[#f9f6f2]"
          value={formData.state || ''}
          onChange={handleStateChange}
          disabled={!formData.region}
        >
          <option value="">Select state</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
      </div>

      {/* City */}
      <div>
        <label className="block mb-1 font-medium">City</label>
        <select
          className="w-full border rounded-md px-3 py-2 bg-[#f9f6f2]"
          value={formData.city || ''}
          onChange={handleCityChange}
          disabled={!formData.state}
        >
          <option value="">Select city</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
      </div>

      {/* Name */}
      <div>
        <label className="block mb-1 font-medium">Place Name</label>
        <input
          type="text"
          className="w-full border rounded-md p-3 bg-[#f9f6f2]"
          value={formData.name || ''}
          onChange={(e) => updateFormData({ name: e.target.value })}
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border rounded-md p-3 bg-[#f9f6f2]"
          rows={4}
          value={formData.description || ''}
          onChange={(e) => updateFormData({ description: e.target.value })}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      {/* Categories */}
      <div>
        <label className="block mb-1 font-medium">Categories</label>
        <div className="grid grid-cols-2 gap-3">
          {categoriesList.map((category) => (
            <label key={category} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.categories?.includes(category) || false}
                onChange={() => toggleCategory(category)}
              />
              <span>{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Featured */}
      <div>
        <label className="flex items-start space-x-2">
          <input
            type="checkbox"
            checked={formData.featured || false}
            onChange={(e) => updateFormData({ featured: e.target.checked })}
          />
          <div>
            <p className="font-medium">Featured Place</p>
            <p className="text-xs text-gray-500">
              Featured places will be highlighted on the homepage.
            </p>
          </div>
        </label>
      </div>
    </div>
  );
};

export default forwardRef(BasicInfoForm);
