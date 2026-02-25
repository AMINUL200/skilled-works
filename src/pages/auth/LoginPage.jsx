import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogIn, ArrowLeft } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/app";

const LoginPage = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/admin";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (apiError) setApiError("");
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setApiError("");

    try {
      // Make API call to login endpoint
      const response = await api.post("/login", formData);
      console.log(response);

      // Extract data from response (adjust based on your API response structure)
      const { token, user } = response.data.data;

      // Call the login function from AuthContext
      login(user, token);

      // after successful login
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error cases
      if (error.response?.status === 401) {
        setApiError("Invalid email or password");
      } else if (error.response?.status === 400) {
        // Handle validation errors from backend
        const backendErrors =
          error.response.data?.errors || error.response.data;
        if (Array.isArray(backendErrors)) {
          // If errors are in array format
          const errorObj = {};
          backendErrors.forEach((err) => {
            if (err.field) errorObj[err.field] = err.message;
          });
          setErrors(errorObj);
        } else if (typeof backendErrors === "object") {
          // If errors are in object format
          setErrors(backendErrors);
        } else {
          setApiError(error.message || "Invalid credentials");
        }
      } else if (error.response?.status === 404) {
        setApiError("User not found");
      } else if (error.response?.status === 429) {
        setApiError("Too many attempts. Please try again later.");
      } else {
        setApiError(error.message || "Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Demo login function (optional - for testing)
  const handleDemoLogin = async () => {
    setFormData({
      email: "demo@example.com",
      password: "demo123",
    });

    // Optional: Auto-submit after setting demo credentials
    // setTimeout(() => handleSubmit(new Event('submit')), 100);
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
          className="mb-6 flex items-center gap-2 text-[#1F2E9A] hover:text-[#9B2E9A] transition group"
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

            <h2 className="text-3xl font-bold text-[#1F2E9A]">Welcome Back</h2>
            <p className="text-[#666666] mt-1">Login to your dashboard</p>
          </div>

          {/* API Error Message */}
          {apiError && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
              {apiError}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <CustomInput
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              className="focus:border-[#9B3DFF] focus:ring-[#9B3DFF]/30"
            />

            <CustomInput
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={errors.password}
              className="focus:border-[#9B3DFF] focus:ring-[#9B3DFF]/30"
            />

            {/* Remember me */}
            <div className="flex justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="accent-[#9B3DFF]" />
                Remember me
              </label>

              <a
                href="/forgot-password"
                className="text-[#1F2E9A] hover:text-[#9B3DFF] font-semibold"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
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
                disabled:opacity-50 disabled:cursor-not-allowed
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

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
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
