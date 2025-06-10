'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type PlaceFormData = {
  region: string;
  state: string;
  city: string;
  religiousImportance: string;
  historicalBackground: string;
  locationDescription: string;
  latitude?: number;
  longitude?: number;
  coverImage?: File | null;
  galleryImages?: File[];
};

type PlaceFormContextType = {
  formData: PlaceFormData;
  updateFormData: (data: Partial<PlaceFormData>) => void;
};

const defaultFormData: PlaceFormData = {
  region: '',
  state: '',
  city: '',
  religiousImportance: '',
  historicalBackground: '',
  locationDescription: '',
  latitude: undefined,
  longitude: undefined,
  coverImage: null,
  galleryImages: [],
};

// ✅ Create context
const PlaceFormContext = createContext<PlaceFormContextType | undefined>(undefined);

// ✅ Context provider
export const PlaceFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<PlaceFormData>(defaultFormData);

  const updateFormData = (data: Partial<PlaceFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <PlaceFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </PlaceFormContext.Provider>
  );
};

// ✅ Hook to use the context
export const usePlaceForm = () => {
  const context = useContext(PlaceFormContext);
  if (!context) {
    throw new Error('usePlaceForm must be used within PlaceFormProvider');
  }
  return context;
};
