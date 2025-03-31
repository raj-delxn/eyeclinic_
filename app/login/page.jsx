'use client';

import { useState } from 'react';
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            // Here you would typically validate credentials first
            // For now, we'll just redirect
            router.push("/DOCTOR/doc_dashboard");
            
            // Force a hard refresh if the navigation doesn't work
            setTimeout(() => {
                window.location.href = "/DOCTOR/doc_dashboard";
            }, 1000);
        } catch (error) {
            console.error("Login error:", error);
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen" style={{ backgroundImage: "url('/images/b7.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>

            <div className="relative bg-white p-8 rounded-2xl shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-900">Eye Care Clinic</h2>
                <p className="text-lg font-semibold text-center text-gray-700">Login</p>

                <form className="mt-4 space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-gray-700 font-medium">Your Email *</label>
                        <input
                            type="email"
                            placeholder="Enter Your Email"
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
                        />
                    </div>

                    <div className="relative">
                        <label className="block text-gray-700 font-medium">Your Password *</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter Password"
                            className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                            required
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
                        className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
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