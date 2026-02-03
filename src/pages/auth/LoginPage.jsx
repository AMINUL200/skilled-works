import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogIn, ArrowLeft } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F2EEFF] via-[#E6F7FF] to-white px-4">
      
      {/* Background blur */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#9B3DFF]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#2EC5FF]/20 rounded-full blur-3xl" />
      </div>

      <div className="w-full max-w-md relative z-10">

        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 text-[#1F2E9A] hover:text-[#9B3DFF] transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-[#E6E0FF] shadow-2xl">

          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-4 bg-gradient-to-br from-[#1F2E9A] to-[#9B3DFF] rounded-2xl shadow-lg">
                <span className="text-white font-bold text-xl">SWC</span>
              </div>
            </div>

            <h2 className="text-3xl font-bold text-[#1F2E9A]">
              Welcome Back
            </h2>
            {/* <p className="text-[#666666] mt-1">
              Login to your HRMS dashboard
            </p> */}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">

            <CustomInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="focus:border-[#9B3DFF] focus:ring-[#9B3DFF]/30"
            />

            <CustomInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="focus:border-[#9B3DFF] focus:ring-[#9B3DFF]/30"
            />

            {/* remember */}
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="checkbox"
                  className="accent-[#9B3DFF]"
                />
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="text-[#1F2E9A] hover:text-[#9B3DFF] font-semibold"
              >
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="
                w-full flex items-center justify-center gap-2
                py-3 rounded-xl font-bold text-lg text-white
                bg-gradient-to-r from-[#1F2E9A] to-[#9B3DFF]
                hover:from-[#9B3DFF] hover:to-[#1F2E9A]
                transition-all duration-300
                shadow-lg hover:shadow-xl
              "
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a
              href="/register"
              className="font-semibold text-[#9B3DFF] hover:text-[#1F2E9A]"
            >
              Create account
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
