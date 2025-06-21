'use client';

import { useRef } from "react";
import { usePlaceForm } from "../../../../context/PlaceFormContext";
import { ImagePlus } from "lucide-react";

export default function MediaForm() {
  const { formData, updateFormData } = usePlaceForm();
  const coverInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const handleCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      updateFormData({ coverImage: file });
    }
  };

  const handleGalleryImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      updateFormData({ galleryImages: Array.from(files) });
    }
  };

  return (
    <div className="space-y-8 bg-white p-6 rounded-xl shadow-sm">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800">Media Upload</h2>
        <p className="text-sm text-gray-500">
          Upload a cover image and gallery images for this place.
        </p>
      </div>

      {/* Cover Image Upload */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-2">Place Cover Image</label>
        <div
          onClick={() => coverInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-40 bg-gray-50 hover:bg-gray-100 transition"
        >
          <div className="text-center text-gray-500">
            <ImagePlus className="mx-auto mb-2 h-8 w-8" />
            <p className="text-sm">Click to upload cover image</p>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          ref={coverInputRef}
          onChange={handleCoverImage}
          className="hidden"
        />
        {formData.coverImage instanceof File && (
          <p className="text-sm text-gray-600 mt-2">
            Selected: <span className="font-medium">{formData.coverImage.name}</span>
          </p>
        )}
      </div>

      {/* Gallery Images Upload */}
      <div>
        <label className="block font-medium text-sm text-gray-700 mb-2">Gallery Images</label>
        <div
          onClick={() => galleryInputRef.current?.click()}
          className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center h-40 bg-gray-50 hover:bg-gray-100 transition"
        >
          <div className="text-center text-gray-500">
            <ImagePlus className="mx-auto mb-2 h-8 w-8" />
            <p className="text-sm">Click to upload gallery images</p>
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          ref={galleryInputRef}
          onChange={handleGalleryImages}
          className="hidden"
        />
        {Array.isArray(formData.galleryImages) && formData.galleryImages.length > 0 && (
          <ul className="mt-2 text-sm text-gray-600 list-disc pl-5 space-y-1">
            {formData.galleryImages.map((file, i) => (
              <li key={i}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
