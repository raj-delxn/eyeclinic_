"use client";

import React, { useEffect, useState } from "react";
import DocSideBar from "../../../components/DocSideBar";
import { useRouter } from "next/navigation";

const DoctorProfile = () => {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  // Fetch today's appointments from backend
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("/api/doctor/checkup");
        if (!response.ok) throw new Error("Failed to fetch appointments");
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  // Handle Proceed button
  const handleProceed = (id) => {
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
          <h1 className="text-white text-lg font-bold">Today's Upcoming Appointments</h1>
        </header>

        {/* Appointments Table */}
        <div className="mt-6 bg-white text-black shadow-lg rounded-lg p-4">
          {appointments.length === 0 ? (
            <p className="text-gray-500 text-center">No upcoming appointments today.</p>
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
                  <tr key={appointment._id} className="border-b">
                    <td className="p-3">{appointment.patientName}</td>
                    <td className="p-3">{appointment.patientEmail}</td>
                    <td className="p-3">{appointment.age}</td>
                    <td className="p-3">{appointment.gender}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleProceed(appointment._id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Proceed
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
