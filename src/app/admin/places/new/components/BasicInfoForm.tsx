import { usePlaceForm } from "@/app/context/PlaceFormContext";

const BasicInfoForm = () => {
  const { formData, updateFormData } = usePlaceForm();

  return (
    <div className="space-y-4">
      <input
        className="border p-2 w-full"
        placeholder="City"
        value={formData.city}
        onChange={(e) => updateFormData({ city: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="State"
        value={formData.state}
        onChange={(e) => updateFormData({ state: e.target.value })}
      />
      <input
        className="border p-2 w-full"
        placeholder="Region"
        value={formData.region}
        onChange={(e) => updateFormData({ region: e.target.value })}
      />
    </div>
  );
};

export default BasicInfoForm;
