import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import CustomInput from "../../component/form/CustomInput";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateEmail()) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      
      // In real app, you would send the reset link email here
      console.log("Reset link sent to:", email);
      
      // For demo, simulate sending reset link with token
      const token = "demo-reset-token-" + Date.now();
      // In real app, this would come from your backend
      const resetLink = `${window.location.origin}/reset-password?token=${token}&email=${encodeURIComponent(email)}`;
      console.log("Reset Link:", resetLink);
      
      // Show success message
      alert(`Reset link has been sent to ${email}\nCheck your email inbox.`);
    }, 1500);
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
              Forgot Password?
            </h2>
            <p className="text-[#666666] mt-2">
              {isSent 
                ? "Check your email for the reset link"
                : "Enter your email to receive a reset link"
              }
            </p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <CustomInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError("");
                  }}
                  error={error}
                  placeholder="Enter your registered email"
                  icon={<Mail className="w-5 h-5 text-gray-400" />}
                  className="focus:border-[#9B3DFF] focus:ring-[#9B3DFF]/30"
                />
                {error && (
                  <p className="mt-1 text-sm text-red-600">{error}</p>
                )}
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
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send Reset Link
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="text-green-600 font-semibold mb-2">
                  Email Sent Successfully!
                </div>
                <p className="text-sm text-gray-600">
                  We've sent a password reset link to<br />
                  <span className="font-semibold">{email}</span>
                </p>
              </div>
              
              <div className="text-sm text-gray-500">
                Didn't receive the email? Check your spam folder or
                <button
                  onClick={() => setIsSent(false)}
                  className="ml-1 text-[#9B3DFF] font-semibold hover:text-[#1F2E9A]"
                >
                  try again
                </button>
              </div>
              
              <button
                onClick={() => navigate("/login")}
                className="
                  w-full py-3 rounded-xl font-bold text-lg text-[#1F2E9A]
                  bg-white border-2 border-[#1F2E9A]
                  hover:bg-[#1F2E9A] hover:text-white
                  transition-all duration-300
                "
              >
                Back to Login
              </button>
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Remember your password?{" "}
            <button
              onClick={() => navigate("/login")}
              className="font-semibold text-[#9B3DFF] hover:text-[#1F2E9A]"
            >
              Sign in here
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;