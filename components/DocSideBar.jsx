import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Home, ChartNoAxesCombined,  User, Settings,  Calendar, Users , UserPlus,  ChevronDown } from "lucide-react";

const DocSideBar = () => {
  const [activeItem, setActiveItem] = useState(null);
  return (
    <div>
      <DocSideBar />
    </div>
  )
}

// Navigation Item Component
function NavItem({ Icon, label, activeItem, setActiveItem, isActivetext }) {
  const isActive = activeItem === label;
  // const isActiveText = isActivetext === label;
  return (
    <div
      className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-md transition ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
        } ${isActivetext ? "bg-blue-600 text-white hover:bg-blue-600" : "text-gray-700"}`}
      onClick={() => setActiveItem(label)}
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}

// Dropdown Navigation Item Component
function DropdownNavItem({ Icon, label, items, activeItem, setActiveItem }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-md transition ${
          activeItem === label ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"
        }`}
        onClick={() => {
          setOpen(!open);
          setActiveItem(label);
        }}
      >
        <div className="flex items-center space-x-3">
          <Icon size={20} />
          <span>{label}</span>
        </div>
        <ChevronDown size={18} className={`${open ? "rotate-180" : ""} transition-transform`} />
      </div>
      {open && (
        <div className="mt-2 bg-white shadow-md rounded-md w-full">
          {items.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer transition"
              onClick={() => {
                router.push(item.Routes); // Navigate to the route specified in the item
              }}
            >
              {item.name} {/* Render the name of the item */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocSideBar;
