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
import ProductPage from "./pages/product/ProductPage";
import ProductDetailspage from "./pages/product/ProductDetailspage";
import PrivacyPolicy from "./pages/policy/PrivacyPolicy";
import TermsOfUse from "./pages/policy/TermsOfUse";
import PrivacyRights from "./pages/policy/PrivacyRights";
import ServiceRender from "./pages/service/ServiceRender";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ServicePage from "./pages/service/ServicePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:Id" element={<BlogDetails />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/cms/:Id" element={<ServiceDetails />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/service/:slug" element={<ServiceRender />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route path="/recruitment/apply/:id" element={<RecruitmentDetails />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:id" element={<ProductDetailspage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-rights" element={<PrivacyRights />} />
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
