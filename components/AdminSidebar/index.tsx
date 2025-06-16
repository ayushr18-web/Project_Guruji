import React from "react";
import { usePathname } from "next/navigation";
import { menuItems } from "../../constants/admin";

const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen p-4 text-gray-800 overflow-y-auto border-r border-gray-200 shadow-lg">
      {menuItems.map((section) => (
        <div key={section.title} className="mb-6">
          <h2 className="text-sm font-bold text-black mb-3">{section.title}</h2>
          <ul>
            {section.items.map((item) => {
              const Icon = item.icon;
              const isActive = pathname.includes(item.href);

              return (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`flex items-center gap-3 px-2 py-2 rounded-lg transition ${
                      isActive
                        ? "bg-[#F3EDEB] text-[#4A2E23] font-semibold"
                        : "hover:text-[#4A2E23]"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
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
