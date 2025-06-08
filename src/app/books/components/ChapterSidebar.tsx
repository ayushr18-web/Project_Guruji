import { useState } from "react";

const ChaptersSidebar = ({ onSelect, chapters = [] }: { onSelect: (text: string) => void, chapters: any }) => {
  return (
    <div className="w-64 p-4  bg-[#f5f5dc] shadow-md rounded-md h-[60vh] overflow-y-auto">
      {chapters.map((chapter) => (
        <div key={chapter.id} className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2">{chapter.title}</h3>
          <ul className="pl-2 space-y-1">
            {chapter.sections.map((section) => (
              <li
                key={section.id}
                onClick={() => onSelect(section)}
                className="text-sm text-gray-600 cursor-pointer hover:text-blue-600"
              >
                {section.title}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ChaptersSidebar;