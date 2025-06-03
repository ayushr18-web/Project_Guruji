import React from "react";
import { sidebarItems } from "../../constants/admin";

const AdminSidebar = () => {
  return (
    <div className="w-64 h-screen p-4 text-gray-800">
      {sidebarItems.map((section) => (
        <div key={section.section} className="mb-6">
          <h2 className="text-sm font-bold text-black mb-3">{section.section}</h2>
          <ul>
            {section.items.map((item) => {
              return (
                <li key={item.label}>
                  <a
                    href={item.path}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    <span className="text-sm">{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminSidebar;
