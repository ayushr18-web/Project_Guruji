'use client';

import { useState } from 'react';
import Tabs from './components/Tabs';
import BasicInfoForm from './components/BasicInfoForm';
import DetailsForm from './components/DetailsForm';
import LocationForm from './components/LocationForm';
import MediaForm from './components/MediaForm';
import { PlaceFormProvider } from '@/app/context/PlaceFormContext';
// import { PlaceFormProvider } from '@/context/PlaceFormContext';

export default function AddNewPlacePage() {
  const [step, setStep] = useState(0);
  const steps = ['Basic Info', 'Details', 'Location', 'Media'];

  return (
    <PlaceFormProvider>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Add New Place</h1>
        <Tabs />
        {/* <div className="mt-6">
          {step === 0 && <BasicInfoForm />}
          {step === 1 && <DetailsForm />}
          {step === 2 && <LocationForm />}
          {step === 3 && <MediaForm />}
        </div> */}
        {/* <div className="mt-6 flex justify-between">
          {step > 0 && <button onClick={() => setStep(step - 1)}>Previous</button>}
          {step < steps.length - 1 && (
            <button onClick={() => setStep(step + 1)}>Next</button>
          )}
        </div> */}
      </div>
    </PlaceFormProvider>
  );
}
