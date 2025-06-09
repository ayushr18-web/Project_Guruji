import { Menu } from "lucide-react"; // or use any hamburger icon

const ChaptersSidebar = ({
  onSelect,
  chapters = [],
  onToggle,
}: {
  onSelect: (text: string) => void;
  chapters: any[];
  onToggle?: () => void; // optional toggle handler
}) => {
  return (
    <div className="w-64 p-4 bg-[#f5f5dc] shadow-md rounded-md h-[60vh] overflow-y-auto relative">
      {/* Hamburger/Close Icon */}
      {onToggle && (
        <button
          onClick={onToggle}
          className="absolute top-2 right-2 p-1 rounded hover:bg-gray-200"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {chapters.map((chapter) => (
        <div key={chapter.id} className="mb-6">
          <h3 className="text-base font-semibold text-gray-800 mb-2">
            {chapter.title}
          </h3>
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
};

export default ChaptersSidebar;
