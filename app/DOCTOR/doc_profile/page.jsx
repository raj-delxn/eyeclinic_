"use client";

import React, { useState } from "react";
import { Home, Calendar, User, Users, UserPlus, Settings, ChartNoAxesCombined } from "lucide-react";
import DropdownNavItem from "@/components/DropdownNavItem";

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState({
    name: "Dr. Anand Nair",
    age: "35",
    gender: "Male",
    mobile: "9876543210",
    specialty: "Eye Care Specialist",
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-lg h-screen fixed">
        <div className="flex items-center space-x-3 ">
          <img
            src="/images/Doc-logo.png"
            alt="Doctor Name"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h4 className="text-gray-900 font-semibold">Dr. Anand Nair</h4>
            <p className="text-sm text-gray-500">Eye Care Specialist</p>
          </div>
        </div>
        <nav className="mt-8 ">
          <ul className="space-y-5 mb-5">
            <li>
              <a href="/DOCTOR/doc_dashboard">
                <NavItem Icon={Home} label="Doctor Dashboard" />
              </a>
            </li>
            <li>
              <a href="/DOCTOR/doc_appointment">
                <NavItem Icon={Calendar} label="Appointments" />
              </a>
            </li>
            <li>
              <a href="/DOCTOR/doctors_list">
                <NavItem Icon={User} label="Doctor's List" />
              </a>
            </li>
            <DropdownNavItem Icon={Users} label="Roles" items={[{ name: "Doctors", Routes: "/DOCTOR/roles_doc" }, { name: "Receptionists", Routes: "/DOCTOR/roles_receptionist" }, { name: "Eye-wear Employee", Routes: "/DOCTOR/roles_patient" }]} />
            <DropdownNavItem Icon={Users} label="Patients" items={[{ name: "Registered", Routes: "/DOCTOR/patients_registered" }, { name: "Unregistered", Routes: "/DOCTOR/patients_unregistered" }]} />
            <li>
              <a href="/DOCTOR/doc_newuser">
                <NavItem Icon={UserPlus} label="Create New User" />
              </a>
            </li>
            <li>
              <a href="/DOCTOR/doc_clinic_earnings">
                <NavItem Icon={ChartNoAxesCombined} label="Clinic Earnings" />
              </a>
            </li>
            <li>
              <a href="/login">
                <NavItem Icon={Settings} label="Logout" />
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        {/* Header */}
        <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
          <h1 className="text-white text-lg font-bold">Profile</h1>
          <div className="flex flex-row space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-md focus:ring outline-none "
            />
            <div className="items-center justify-center flex flex-row gap-4">
              <User className="text-white" />
            </div>
          </div>
        </header>
        {/* Profile Section */}
        <div className="mt-8 bg-white p-6 rounded-lg  shadow-md w-2/3">
          <h2 className="text-xl text-black font-bold">Profile</h2>
          <div className="mt-4 space-y-4 ">
            {Object.keys(doctor).map((key) => (
              <div key={key}>
                <label className="block text-gray-700 capitalize">{key.replace("_", " ")}</label>
                <input
                  type="text"
                  name={key}
                  value={doctor[key]}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full p-2 border rounded-md bg-gray-100 text-black focus:outline-none focus:ring"
                />
              </div>
            ))}
          </div>
          <button
            onClick={handleEdit}
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            {isEditing ? "Save Profile" : "Edit Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};


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


export default DoctorProfile;