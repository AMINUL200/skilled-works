import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import AppLayout from "./layout/AppLayout";
import LandingPage from "./pages/landing/LandingPage";
import AdminLayout from "./layout/AdminLayout";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import SiteSettings from "./pages/admin/settings/SiteSettings";
import AdminProfile from "./pages/admin/profile/AdminProfile";
import ContactPage from "./pages/contact/ContactPage";
import BlogPage from "./pages/blog/BlogPage";
import BlogDetails from "./pages/blog/BlogDetails";
import PricingPage from "./pages/pricing/PricingPage";
import ServiceDetails from "./pages/service/ServiceDetails";
import AboutPage from "./pages/about/AboutPage";
import CustomerSupport from "./pages/suport/CustomerSupport";
import Recruitment from "./pages/recruitment/Recruitment";
import RecruitmentDetails from "./pages/recruitment/RecruitmentDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:Id" element={<BlogDetails />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/cms/:Id" element={<ServiceDetails />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/recruitment/apply/:id" element={<RecruitmentDetails />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Additional admin routes can be added here */}
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
