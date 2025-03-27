"use client";

import { useState, useEffect } from "react";
import { Home, Bell, Phone, User, Users, Settings, Calendar, ChartNoAxesCombined, CreditCard, ChevronDown } from "lucide-react";

export default function UsersTable() {
    const [activeItem, setActiveItem] = useState(null);
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        // Fetch users from backend when integrated
        fetch('/api/users') // Change this to your actual backend API endpoint
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((err) => console.error('Error fetching users:', err));
    }, []);




    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white p-6 shadow-lg h-screen fixed">
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
                        {/* <li>
                                <a href="">
                                    <NavItem Icon={CreditCard} label="Payment" activeItem={activeItem} setActiveItem={setActiveItem} />
                                </a>
                            </li> */}
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
            </aside>

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">USERS</h1>
                    <div className="flex flex-row space-x-4">
                        <input
                            type="text"
                            placeholder="Search"
                            className="px-4 py-2 rounded-md focus:ring outline-none "
                        />
                        <div className="items-center justify-center flex flex-row gap-4">
                            <Bell className="text-white" />
                            <Phone className="text-white" />
                            <User className="text-white" />
                        </div>
                    </div>
                </header>
                <div className="p-6 bg-gray-100 min-h-screen">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-semibold mb-4">Users</h1>
                        <div className="flex justify-end mb-4">
                            <input
                                type="text"
                                placeholder="Search"
                                className="border px-3 py-2 rounded-lg shadow-sm w-64"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    {/* <th className="border p-2">Id</th> */}
                                    <th className="border p-2">User Name</th>
                                    <th className="border p-2">User Email</th>
                                    {/* <th className="border p-2">Gender</th>
              <th className="border p-2">Age</th> */}
                                    <th className="border p-2">Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users
                                    .filter((user) =>
                                        user.name.toLowerCase().includes(search.toLowerCase())
                                    )
                                    .map((user, index) => (
                                        <tr key={index} className="border">
                                            {/* <td className="border p-2 text-center">{user.id}</td> */}
                                            <td className="border p-2 font-semibold">{user.name}</td>
                                            <td className="border p-2">{user.email}</td>
                                            {/* <td className="border p-2">{user.gender}</td>
                  <td className="border p-2 text-center">{user.age}</td> */}
                                            <td className="border p-2 font-semibold">{user.role}</td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
        </div>
    );
};

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
