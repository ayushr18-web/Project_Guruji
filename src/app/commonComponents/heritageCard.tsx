// components/HeritageCard.tsx
'use client';


import { ArrowRight } from 'lucide-react';
export type HeritageItem = {
  tag: string;
  title: string;
  description: string;
  location: string;
  time: string;
};
export default function HeritageCard({ item }: { item: HeritageItem }) {


  return (
    <div className="border border-yellow-300 rounded-lg overflow-hidden bg-white shadow hover:shadow-md transition max-w-sm">
      <div className="relative h-40 bg-gray-100 flex items-center justify-center text-gray-400">
        <span className="absolute top-2 left-2 bg-[#7B3F00] text-white text-xs px-2 py-1 rounded">
          {item.tag}
        </span>
        <span className="text-sm">[Image Placeholder]</span>
      </div>
      <div className="p-4 flex flex-col gap-2">
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <p className="text-sm text-gray-700">{item.description}</p>
        <div className="text-sm text-gray-500 flex justify-between pt-2">
          <span>{item.location}</span>
          <span>{item.time}</span>
        </div>
        <div className="pt-2">
          <a href="#" className="flex items-center gap-1 text-sm text-[#7B3F00] font-medium hover:underline">
            Read more <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}
