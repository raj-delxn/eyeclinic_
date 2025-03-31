import React, { useState } from "react";
import { useRouter } from "next/navigation";
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

  return (
    <aside className="w-64 bg-white p-6 shadow-lg h-screen fixed">
      {/* Doctor Profile Section */}
      <div className="flex items-center space-x-3">
        <img
          src="/images/Doc-logo.png"
          alt="Doctor"
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h4 className="text-gray-900 font-semibold">Dr. Anand Nair</h4>
          <p className="text-sm text-gray-500">Eye Care Specialist</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-8">
        <ul className="space-y-5 mb-5">
          <li>
            <a href="/DOCTOR/doc_dashboard">
              <NavItem
                Icon={Home}
                label="Doctor Dashboard"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                isActive
              />
            </a>
          </li>

          <li>
            <a href="/DOCTOR/doc_appointment">
              <NavItem
                Icon={Calendar}
                label="Appointments"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </a>
          </li>

          <li>
            <a href="/DOCTOR/doctors_list">
              <NavItem
                Icon={User}
                label="Doctor's List"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </a>
          </li>

          {/* Roles Dropdown */}
          <DropdownNavItem
            Icon={Users}
            label="Roles"
            items={[
              { name: "Doctors", Routes: "/DOCTOR/roles_doc" },
              { name: "Receptionists", Routes: "/DOCTOR/roles_receptionist" },
              { name: "Eye-wear Employee", Routes: "/DOCTOR/roles_patient" },
            ]}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />

          {/* Patients Dropdown */}

          <li>
            <a href="/DOCTOR/patients_registered">
              <NavItem
                Icon={User}
                label="Patients"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </a>
          </li>
          {/* <DropdownNavItem
            Icon={Users}
            label="Patients"
            items={[
              { name: "Registered", Routes: "/DOCTOR/patients_registered" },
              { name: "Unregistered", Routes: "/DOCTOR/patients_unregistered" },
            ]}
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          /> */}

          <li>
            <a href="/DOCTOR/doc_newuser">
              <NavItem
                Icon={UserPlus}
                label="Create New User"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </a>
          </li>

          <li>
            <a href="/DOCTOR/doc_clinic_earnings">
              <NavItem
                Icon={BarChart2}
                label="Clinic Earnings"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </a>
          </li>

          <li>
            <a href="/login">
              <NavItem
                Icon={Settings}
                label="Logout"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// Navigation Item Component
function NavItem({ Icon, label, activeItem, setActiveItem, isActive }) {
  return (
    <div
      className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-md transition ${
        isActive
          ? "bg-blue-500 text-white"
          : "text-gray-700 hover:bg-blue-100"
      }`}
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
          activeItem === label ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"
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
              onClick={() => router.push(item.Routes)}
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
