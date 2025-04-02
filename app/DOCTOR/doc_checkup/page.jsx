"use client";

import React, { useEffect, useState } from "react";
import { Home, Calendar, User, Users, UserPlus, Settings } from "lucide-react";
import DocSideBar from "../../../components/DocSideBar";
import { useRouter } from "next/navigation";

const DoctorProfile = () => {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  // Fetch today's appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/appointments/today");
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Handle Submit button
  const handleSubmit = (id) => {
    router.push(`/DOCTOR/prescription/${id}`);
  };

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <DocSideBar />

      {/* Main Content */}
      <div className="flex-1 p-6 ml-64">
        {/* Header */}
        <header className="flex justify-between items-center bg-blue-600 p-4 rounded-lg shadow-md">
          <h1 className="text-white text-lg font-bold">Today's Appointments</h1>
          <div className="flex flex-row space-x-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 py-2 rounded-md focus:ring outline-none"
            />
            <div className="items-center justify-center flex flex-row gap-4">
              <User className="text-white" />
            </div>
          </div>
        </header>

        {/* Appointments Table */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-4">
          {appointments.length === 0 ? (
            <p className="text-gray-500 text-center">No appointments today.</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Age</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="border-b">
                    <td className="p-3">{appointment.name}</td>
                    <td className="p-3">{appointment.email}</td>
                    <td className="p-3">{appointment.age}</td>
                    <td className="p-3">{appointment.gender}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleSubmit(appointment.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
