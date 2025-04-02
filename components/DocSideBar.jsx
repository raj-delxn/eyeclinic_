"use client"; // Ensure client-side rendering

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Calendar,
  User,
  Users,
  UserPlus,
  Settings,
  ChevronDown,
  BarChart2,
} from "lucide-react";

const DocSideBar = () => {
  const [activeItem, setActiveItem] = useState(null);
  const router = useRouter(); 
  const pathname = usePathname(); // Get the current path

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/sign-out", { method: "POST" });
      if (res.ok) {
        router.push("/login"); // Redirect to login
        router.refresh(); // Refresh the page to clear cached authentication state
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <aside className="w-64 bg-white p-6 shadow-lg h-screen fixed">
      {/* Doctor Profile Section */}
      <div className="flex items-center space-x-3">
        <a href="/DOCTOR/doc_profile">
          <img
            src="/images/Doc-logo.png"
            alt="Doctor"
            className="w-10 h-10 rounded-full"
          />
        </a>
        <div>
          <h4 className="text-gray-900 font-semibold">Dr. Anand Nair</h4>
          <p className="text-sm text-gray-500">Eye Care Specialist</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8">
        <ul className="space-y-5 mb-5">
          <li>
            <NavItem Icon={Home} label="Doctor Dashboard" route="/DOCTOR/doc_dashboard" pathname={pathname} />
          </li>
          <li>
            <NavItem Icon={UserPlus} label="Check-Ups" route="/DOCTOR/doc_checkup" pathname={pathname} />
          </li>

          <li>
            <NavItem Icon={Calendar} label="Appointments" route="/DOCTOR/doc_appointment" pathname={pathname} />
          </li>

          <li>
            <NavItem Icon={User} label="Doctor's List" route="/DOCTOR/doctors_list" pathname={pathname} />
          </li>

          {/* Roles Dropdown */}
          <DropdownNavItem
            Icon={Users}
            label="Roles"
            items={[
              { name: "Doctors", route: "/DOCTOR/roles_doc" },
              { name: "Receptionists", route: "/DOCTOR/roles_receptionist" },
              { name: "Eye-wear Employee", route: "/DOCTOR/roles_patient" },
            ]}
            pathname={pathname}
          />

          <li>
            <NavItem Icon={User} label="Patients" route="/DOCTOR/patients_registered" pathname={pathname} />
          </li>

          <li>
            <NavItem Icon={UserPlus} label="Create New User" route="/DOCTOR/doc_newuser" pathname={pathname} />
          </li>

          <li>
            <NavItem Icon={BarChart2} label="Clinic Earnings" route="/DOCTOR/doc_clinic_earnings" pathname={pathname} />
          </li>

          <li>
            <button
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 px-4 py-2 rounded-md text-gray-700 hover:bg-red-500 hover:text-white transition"
            >
              <Settings size={20} />
              <span>Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// Navigation Item Component
function NavItem({ Icon, label, route, pathname }) {
  const router = useRouter();
  const isActive = pathname === route; // Check if the route is active

  return (
    <div
      className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-md transition ${
        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
      }`}
      onClick={() => router.push(route)}
    >
      <Icon size={20} />
      <span>{label}</span>
    </div>
  );
}

// Dropdown Navigation Item Component
function DropdownNavItem({ Icon, label, items, pathname }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Check if any child route is active
  const isActive = items.some((item) => pathname === item.route);

  return (
    <div className="relative">
      <div
        className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-md transition ${
          isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
        }`}
        onClick={() => setOpen(!open)}
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
              onClick={() => router.push(item.route)}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DocSideBar;
