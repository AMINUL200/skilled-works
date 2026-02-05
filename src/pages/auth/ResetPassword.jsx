import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Lock, Check } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Extract token and email from URL
    const tokenFromUrl = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");
    
    if (tokenFromUrl && emailFromUrl) {
      setToken(tokenFromUrl);
      setEmail(decodeURIComponent(emailFromUrl));
    } else {
      // Redirect if no token or email
      alert("Invalid or expired reset link");
      navigate("/forgot-password");
    }
  }, [searchParams, navigate]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate API call to reset password
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // In real app, you would send to backend:
      // fetch("/api/reset-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     token,
      //     email,
      //     newPassword: formData.password
      //   })
      // })
      
      console.log("Password reset for:", email);
      console.log("Token:", token);
      console.log("New password set");
    }, 1500);
  };

  if (!token || !email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#9B3DFF] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

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
          onClick={() => navigate("/login")}
          className="mb-6 flex items-center gap-2 text-[#1F2E9A] hover:text-[#9B3DFF] transition group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Login
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
              {isSuccess ? "Password Reset!" : "Reset Password"}
            </h2>
            <p className="text-[#666666] mt-2">
              {isSuccess 
                ? "Your password has been successfully reset"
                : `Set new password for ${email}`
              }
            </p>
          </div>

          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <CustomInput
                label="New Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                placeholder="Enter new password (min. 8 characters)"
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                className="focus:border-[#9B3DFF] focus:ring-[#9B3DFF]/30"
              />

              <CustomInput
                label="Confirm New Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                placeholder="Re-enter new password"
                icon={<Lock className="w-5 h-5 text-gray-400" />}
                className="focus:border-[#9B3DFF] focus:ring-[#9B3DFF]/30"
              />

              <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
                <p className="font-semibold mb-1">Password Requirements:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>At least 8 characters</li>
                  <li>Include uppercase and lowercase letters</li>
                  <li>Include at least one number</li>
                </ul>
              </div>

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
                    Resetting Password...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Reset Password
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <div className="text-green-600 font-semibold mb-2">
                  Password Reset Successful!
                </div>
                <p className="text-sm text-gray-600">
                  You can now log in with your new password
                </p>
              </div>
              
              <button
                onClick={() => navigate("/login")}
                className="
                  w-full flex items-center justify-center gap-2
                  py-3 rounded-xl font-bold text-lg text-white
                  bg-gradient-to-r from-[#10B981] to-[#34D399]
                  hover:from-[#059669] hover:to-[#10B981]
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                "
              >
                <Check className="w-5 h-5" />
                Go to Login
              </button>
            </div>
          )}

          {/* Footer */}
          {!isSuccess && (
            <div className="mt-6 text-center text-sm text-gray-600">
              Remember your password?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-[#9B3DFF] hover:text-[#1F2E9A]"
              >
                Sign in here
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;