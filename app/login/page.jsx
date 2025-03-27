'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    return (
        <div className="relative flex items-center justify-center min-h-screen" style={{ backgroundImage: "url('/images/b7.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Dark overlay for opacity effect */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Form container - make it relative so it's above the overlay */}
            <div className="relative bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-900">Eye Care Clinic</h2>
                <p className="text-lg font-semibold text-center text-gray-700">Login</p>

                <form className="mt-4 space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Your Email *</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-gray-700 font-medium">Your Password *</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 top-6 right-3 flex items-center text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    <a href="/forgot-password">
                        <p className="text-right text-sm text-blue-600 cursor-pointer">Forgot Password?</p>
                    </a>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
                        onClick={(e) => {
                            e.preventDefault();
                            router.push("/DOCTOR/doc_dashboard");
                        }}
                    >
                        Login
                    </button>



                    <a href="/signup">
                        <p className="text-center text-sm text-gray-600 p-2">
                            Not Registered? <span className="text-blue-600 cursor-pointer">Sign Up</span>
                        </p>
                    </a>
                </form>
            </div>
        </div>
    );
}
