import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.svg";
import toast from "react-hot-toast";
import { authLogin } from "../api/api";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await authLogin(email, password);
      if (res?.token) {
        login(res?.token, res?.user);

        const currentPath = window.location.pathname;
        if (currentPath === "/login") {
          window.location.href = "/";
        } else {
          navigate("/");
        }
      } else {
        setTimeout(() => navigate("/"), 3);
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-[#f5f7fa] to-[#c3cfe2] px-4">
      <div className="bg-white max-w-md w-full rounded-3xl shadow-lg p-10 flex flex-col items-center">
        <img src={logo} alt="Company Logo" className="h-12 w-auto mb-8" />
        <h1 className="text-3xl font-extrabold text-[#08313D] mb-10 text-center">
          Mini Wallet Management System
        </h1>
        <form onSubmit={handleLogin} className="w-full space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Username
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youemail@example.com"
              required
              className="w-full px-5 py-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-[#E4681B] focus:border-[#E4681B] transition"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-5 py-3 text-gray-900 placeholder-gray-400 border border-gray-300 rounded-lg focus:outline-none focus:ring-3 focus:ring-[#E4681B] focus:border-[#E4681B] transition"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-[#08313D] font-medium">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-[#E4681B]"
              />
              <span>Remember me</span>
            </label>
            <button
              type="button"
              className="text-[#E4681B] hover:underline"
              onClick={() => toast("Forgot password flow not implemented yet")}
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#E4681B] to-[#D95500] hover:from-[#08313D] hover:to-[#0c1e28] text-white py-3 rounded-xl font-semibold shadow-md transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-8 w-full text-center text-gray-500 text-sm">
          {/* Placeholder for social logins */}
          {/* <p>Or login with</p>
          <div className="flex justify-center space-x-4 mt-4">
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <GoogleIcon />
            </button>
            <button className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition">
              <FacebookIcon />
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
