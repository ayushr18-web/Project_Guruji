
'use client';

import { usePlaceForm } from "../../../../context/PlaceFormContext";


export default function MediaForm() {
  const { formData, updateFormData } = usePlaceForm();

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateFormData({ coverImage: e.target.files[0] });
    }
  };

  const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      updateFormData({ galleryImages: Array.from(e.target.files) });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block font-semibold">Place Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverImage}
          className="mt-2"
        />
        {formData.coverImage && (
          <p className="text-sm text-gray-600 mt-1">
            Selected: {formData.coverImage.name}
          </p>
        )}
      </div>

      <div>
        <label className="block font-semibold">Gallery Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleGalleryImages}
          className="mt-2"
        />
        {(formData.galleryImages || []).length > 0 && (
  <ul className="text-sm text-gray-600 mt-2 list-disc pl-4">
    {(formData.galleryImages || []).map((file, i) => (
      <li key={i}>{file.name}</li>
    ))}
  </ul>
)}

      </div>
    </div>
  );
}
