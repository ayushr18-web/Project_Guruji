import { useState, useRef, useEffect } from "react";
import { Eye, Pencil, Ellipsis, Trash } from "lucide-react";
import ReactDOM from "react-dom";

const ActionMenu = ({ onView, onEdit, onDelete }: any) => {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.getElementById("action-menu-portal");
      if (menu && !menu.contains(e.target as Node) && !buttonRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenMenu = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPos({
        top: rect.bottom + window.scrollY,
        left: rect.right - 160 + window.scrollX, // align right, adjust width
      });
    }
    setOpen(!open);
  };

  return (
    <>
      <button
        className="p-2 hover:bg-gray-100 rounded-full"
        onClick={handleOpenMenu}
        ref={buttonRef}
      >
        <Ellipsis size={20} />
      </button>

      {open &&
        ReactDOM.createPortal(
          <div
            id="action-menu-portal"
            className="absolute z-50 w-40 bg-white border rounded-lg shadow-lg"
            style={{
              position: "absolute",
              top: `${menuPos.top}px`,
              left: `${menuPos.left}px`,
            }}
          >
            <button
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                onView();
                setOpen(false);
              }}
            >
              <Eye size={16} /> View
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 hover:bg-gray-100"
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
            >
              <Pencil size={16} /> Edit
            </button>
            <button
              className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
            >
              <Trash size={16} /> Delete
            </button>
          </div>,
          document.body
        )}
    </>
  );
};

export default ActionMenu;
