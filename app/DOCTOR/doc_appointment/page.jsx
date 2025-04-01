"use client";

import { useState } from "react";
import { Home, Bell, Phone, User, Users, Settings, Calendar, UserPlus, ChartNoAxesCombined, CreditCard, ChevronDown } from "lucide-react";
import CalendarComponent from "@/components/CalendarComponent"; // Adjust based on location
import DocSideBar from "../../../components/DocSideBar";

export default function DoctorDashboard() {
    const [activeItem, setActiveItem] = useState(null);
    const [selectedDoctor, setSelectedDoctor] = useState("Dr. Anand Nair");
    const [selectedDate, setSelectedDate] = useState(new Date());

    const timeSlots = {
        morning: ["8:00 AM - 8:30 AM", "8:30 AM - 9:00 AM", "9:00 AM - 9:30 AM", "9:30 AM - 10:00 AM", "10:00 AM - 10:30 AM"],
        afternoon: ["12:00 PM - 12:30 PM", "12:30 PM - 1:00 PM", "1:00 PM - 1:30 PM", "1:30 PM - 2:00 PM", "2:00 PM - 2:30 PM"],
        evening: ["4:00 PM - 4:30 PM", "4:30 PM - 5:00 PM", "5:00 PM - 5:30 PM", "5:30 PM - 6:00 PM", "6:00 PM - 6:30 PM", "6:30 PM - 7:00 PM", "7:00 PM - 7:30 PM", "7:30 PM - 8:00 PM", "8:00 PM - 8:30 PM"]
    };

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <DocSideBar />
            {/* <aside className="w-64 bg-white p-6 shadow-lg h-screen fixed">
                            <div className="flex items-center space-x-3 ">
                                <img
                                    src="/images/Doc-logo.png"
                                    alt="Doctor Name"
                                    className="w-10 h-10 rounded-full"
                                />
                                <div>
                                    <h4 className="text-gray-900 text- font-semibold">Dr. Anand Nair</h4>
                                    <p className="text-sm text-gray-500">Eye Care Specialist</p>
                                </div>
                            </div>
                            <nav className="mt-8 ">
                                <ul className="space-y-5 mb-5">
                                    <li>
                                        <a href="/DOCTOR/doc_dashboard">
                                            <NavItem Icon={Home} label="Doctor Dashboard" activeItem={activeItem} setActiveItem={setActiveItem} isActivetext={true} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/DOCTOR/doc_appointment">
                                            <NavItem Icon={Calendar} label="Appointments" activeItem={activeItem} setActiveItem={setActiveItem} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/DOCTOR/doctors_list">
                                            <NavItem Icon={User} label="Doctor's List" activeItem={activeItem} setActiveItem={setActiveItem} />
                                        </a>
                                    </li>
                                    <DropdownNavItem
                                        Icon={Users}
                                        label="Roles"
                                        items={[{
                                            "name": "Doctors",
                                            "Routes": "/DOCTOR/roles_doc"
                                        },
                                        {
                                            "name": "Receptionists",
                                            "Routes": "/DOCTOR/roles_receptionist"
                                        },
                                        {
                                            name: "Eye-wear Employee",
                                            Routes: "/DOCTOR/roles_patient"
                                        }]}
                                        activeItem={activeItem}
                                        setActiveItem={setActiveItem}
                                    />
                                    <DropdownNavItem
                                        Icon={Users}
                                        label="Patients"
                                        items={[{
                                            "name": "Registered",
                                            "Routes": "/DOCTOR/patients_registered"
                                        },
                                        {
                                            "name": "Unregistered",
                                            "Routes": "/DOCTOR/patients_unregistered"
                                        }]}
                                        activeItem={activeItem}
                                        setActiveItem={setActiveItem}
                                    />
            
                                    <li>
                                        <a href="/DOCTOR/doc_newuser">
                                            <NavItem Icon={UserPlus} label="Create New User" activeItem={activeItem} setActiveItem={setActiveItem} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/DOCTOR/doc_clinic_earnings">
                                            <NavItem Icon={ChartNoAxesCombined} label="Clinic Earnings" activeItem={activeItem} setActiveItem={setActiveItem} />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/login">
                                            <NavItem Icon={Settings} label="Logout" activeItem={activeItem} setActiveItem={setActiveItem} />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </aside> */}
            {/* Main Content */}
            <div className="flex-1 p-6 ml-64">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Appointments</h1>
                    <div className="flex flex-row space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 rounded-md focus:ring outline-none "
                        />
                        <a href="/DOCTOR/doc_profile">
                            <div className="items-center justify-center flex flex-row gap-4 mt-2">

                                <User className="text-white" />
                            </div>
                        </a>    
                    </div>
                </header>

                <div className="flex mt-6 gap-6">
                    {/* Calendar Section */}
                    <div className="w-1/3 bg-white text-black p-4 rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold text-black mb-4">Select Date</h2>
                        <CalendarComponent selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                        <div className="mt-4">
                            <label className="block text-gray-700 font-medium">Select Doctor</label>
                            <select className="mt-1 p-2 border rounded w-full" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
                                <option>Dr. Roshini Patel</option>
                                <option>Dr. Anand Nair</option>
                            </select>
                        </div>
                    </div>

                    {/* Time Slots */}
                    <div className="flex-1 bg-white p-4 rounded-lg shadow-md">
                        <h2 className="text-lg text-black font-semibold">Available Time Slots</h2>
                        <div className="mt-4 text-black">
                            {Object.keys(timeSlots).map((period) => (
                                <div key={period} className="mb-4">
                                    <h3 className="font-semibold  text-blue-600">{period.charAt(0).toUpperCase() + period.slice(1)}</h3>
                                    <div className="grid grid-cols-3 gap-2 mt-2">
                                        {timeSlots[period].map((slot, index) => (
                                            <button key={index} className="px-3 py-2 bg-gray-200 rounded text-sm hover:bg-blue-500 hover:text-white">{slot}</button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Sidebar Components
function NavItem({ Icon, label, activeItem, setActiveItem }) {
    const isActive = activeItem === label;
    return (
        <div className={`flex items-center space-x-3 cursor-pointer px-4 py-2 rounded-md transition ${isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-blue-100"}`} onClick={() => setActiveItem(label)}>
            <Icon size={20} />
            <span>{label}</span>
        </div>
    );
}

function DropdownNavItem({ Icon, label, items, activeItem, setActiveItem }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="relative">
            <div className={`flex items-center justify-between cursor-pointer px-4 py-2 rounded-md transition ${activeItem === label ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-100"}`} onClick={() => { setOpen(!open); setActiveItem(label); }}>
                <div className="flex items-center space-x-3">
                    <Icon size={20} />
                    <span>{label}</span>
                </div>
                <ChevronDown size={18} className={`${open ? "rotate-180" : ""} transition-transform`} />
            </div>
            {open && (
                <div className="mt-2 bg-white shadow-md rounded-md w-full">
                    {items.map((item, index) => (
                        <div key={index} className="px-4 py-2 text-gray-700 hover:bg-blue-100 cursor-pointer transition">{item}</div>
                    ))}
                </div>
            )}
        </div>
    );
}
