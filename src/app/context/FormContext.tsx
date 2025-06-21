'use client';

import React, { createContext, useContext, useState } from 'react';

export type PlaceFormData = {
  historicalBackground: string;
  religiousImportance: string;
  region?: string;
  state?: string;
  city?: string;
  name?: string;
  description?: string;
  categories: string[];
  featured?: boolean;
};

const defaultData: PlaceFormData = {
  categories: [],
  historicalBackground: '',
  religiousImportance: ''
};

const FormContext = createContext<{
  formData: PlaceFormData;
  setFormData: React.Dispatch<React.SetStateAction<PlaceFormData>>;
}>({
  formData: defaultData,
  setFormData: () => {},
});

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<PlaceFormData>(defaultData);

  return (
    <FormContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
