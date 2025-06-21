'use client';

import { useState } from 'react';
// import BasicInfoForm from './BasicInfoForm';
// import DetailsForm from './DetailsForm';
// import LocationForm from './LocationForm';
// import MediaForm from './MediaForm';
import BasicInfoForm from './BasicInfoForm';
import LocationForm from './LocationForm';
import MediaForm from './MediaForm';
import DetailsForm from './DetailsForm';

const Tabs = () => {
  const [step, setStep] = useState(0);

  const steps = ['Basic Info', 'Details', 'Location', 'Media'];
  const forms = [<BasicInfoForm />, <DetailsForm/>, <LocationForm />, <MediaForm />];

  return (
    <div className="p-6">
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        {steps.map((label, i) => (
          <button
            key={label}
            className={`px-4 py-2 border ${i === step ? 'bg-black text-white' : ''}`}
            onClick={() => setStep(i)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Current Form */}
      <div>{forms[step]}</div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <button disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
          Previous
        </button>
        {step < forms.length - 1 ? (
          <button onClick={() => setStep((s) => s + 1)}>Next</button>
        ) : (
          <button
            onClick={() => {
              // handle submit final formData
              alert('Submit!');
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
};

export default Tabs;
