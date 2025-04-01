"use client";

import { useState } from "react";
import { Home, Bell, Phone, User, Settings, Calendar, Users, ChartNoAxesCombined, UserPlus, CreditCard, ChevronDown } from "lucide-react";
import DropdownNavItem from "@/components/DropdownNavItem";
import DocSideBar from "../../../components/DocSideBar";

export default function Dashboard() {
    const [activeItem, setActiveItem] = useState(null);
    const [isActivetext, setIsActivetext] = useState(null);
    const [role, setRole] = useState('');
    const [formData, setFormData] = useState({ name: '', phone: '', password: '' });
    const isFormValid = role && formData.name && formData.phone && formData.password;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('Registered:', { role, ...formData });
        }
    };

    return (

        <div className="flex h-screen bg-white">
            {/* Sidebar */}
            <DocSideBar />

            {/* Main Content */}
            <div className="flex-1 p-6 ml-64 items-center justify-center">
                <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
                    <h1 className="text-white text-lg font-bold">Create New User</h1>
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


                <div className="flex items-center justify-center mt-10">
                    <form onSubmit={handleSubmit} className="w-full max-w-sm">
                        <div className="flex justify-around mb-6">
                           {['Doctor', 'Receptionist', 'Eye Wear'].map((r) => (
                                <button
                                    type="button"
                                    key={r}
                                    className={`px-4 py-2 border ${role === r ? 'bg-green-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
                                    onClick={() => setRole(r)}
                                >
                                    {r}
                                </button>
                            ))}
                        </div>
                        <div className="space-y-4">
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className={`w-full px-4 py-2 text-white ${isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-300 cursor-not-allowed'}`}
                                disabled={!isFormValid}
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>



            </div>
        </div>
    );
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
