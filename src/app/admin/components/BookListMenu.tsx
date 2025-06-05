import { useState, useRef, useEffect } from "react";
import { Eye, Pencil, Ellipsis, Trash } from "lucide-react";

const ActionMenu = ({ onView, onEdit, onDelete }: any) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="p-2 hover:bg-gray-100 rounded-full"
        onClick={() => setOpen(!open)}
      >
        <Ellipsis size={20} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
          <button
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              onView();
              setOpen(false);
            }}
          >
            <Eye /> View
          </button>
          <button
            className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
          >
            <Pencil /> Edit
          </button>
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            <Trash /> Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default ActionMenu;
