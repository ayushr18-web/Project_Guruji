"use client";
import { useState } from "react";
import Stepper from "../../../../../../components/Stepper";
import { useGetCategories } from "../../../../../../hooks/useBook";
import ChaptersForm from "./ChaptersForm";
import DetailsForm from "./DetailsForm";
import { IBook } from "../../../../../../types/books";

interface AddEditAudiobookProps {
  isLoading: boolean;
  handleSubmit: (data: any) => void;
}

const AddEditAudiobook = ({ isLoading, handleSubmit }: AddEditAudiobookProps) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<IBook | {}>({});

  const steps = ["Details", "Chapters"];
  const { data: categories } = useGetCategories('BOOK');

  const handleNext = (data: IBook) => {
    if (step < steps.length - 1) {
        setStep(step + 1);
        setFormData(data);
    }
  };



  return (
    <div className="min-h-screen bg-[#f7f3e9] py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <Stepper steps={steps} activeStep={step} />

        <div className="mt-8">
          {step === 0 && <DetailsForm categories={categories} isLoading={isLoading} onSubmit={handleNext}/>}
          {step === 1 && <ChaptersForm onBack={() => setStep(0)} />}
        </div>
      </div>
    </div>
  );
};

export default AddEditAudiobook;
