import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import './App.css';
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
// import ServiceRender from "./pages/service/ServiceRender";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import ServicePage from "./pages/service/ServicePage";
import { ToastContainer } from "react-toastify";
import SEOSettings from "./pages/admin/settings/SEOSettings";
import PopupSettings from "./pages/admin/settings/PopupSettings";
import NoteSettings from "./pages/admin/settings/NoteSettings";
import HandleFaq from "./pages/admin/faq/HandleFaq";
import HandleBlog from "./pages/admin/blog/HandleBlog";
import HandleServiceType from "./pages/admin/services/HandleServiceType";
import HandleServiceTypeFeature from "./pages/admin/services/HandleServiceTypeFeature";
import HandleBooking from "./pages/admin/booking/HandleBooking";
import HandleWhyChoseOurPlatform from "./pages/admin/about/HandleWhyChoseOurPlatform";
import HandleWhatWeOffer from "./pages/admin/about/HandleWhatWeOffer";
import HandleAbout from "./pages/admin/about/HandleAbout";
import HandleContact from "./pages/admin/booking/HandleContact";
import ServiceRender from "./pages/service/ServiceRender";
import HandleProduct from "./pages/admin/product/HandleProduct";
import HandleServicesWhyChose from "./pages/admin/services/HandleServicesWhyChose";
import HandleServicesCustomerStories from "./pages/admin/services/HandleServicesCustomerStories";
import HandleRecruitmentPage from "./pages/admin/recruitment/HandleRecruitmentPage";
import HandleJobs from "./pages/admin/recruitment/HandleJobs";
import HandleJobsApplication from "./pages/admin/recruitment/HandleJobsApplication";
import HandleBanner from "./pages/admin/banner/HandleBanner";
import HandleAllInOnePlatforms from "./pages/admin/banner/HandleAllInOnePlatforms";

const App = () => {
  return (
    <Router>
      <ToastContainer position="top-right" zIndex={9999} />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<AppLayout />}>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/cms/:Id" element={<ServiceDetails />} />
          <Route path="/services" element={<ServicePage />} />
          <Route path="/service/:slug" element={<ServiceRender />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/customer-support" element={<CustomerSupport />} />
          <Route path="/recruitment" element={<Recruitment />} />
          <Route
            path="/recruitment/apply/:slug"
            element={<RecruitmentDetails />}
          />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:slug" element={<ProductDetailspage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-use" element={<TermsOfUse />} />
          <Route path="/privacy-rights" element={<PrivacyRights />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          {/* Additional admin routes can be added here */}
          <Route path="site-settings" element={<SiteSettings />} />
          <Route path="seo-settings" element={<SEOSettings />} />
          <Route path="popup-settings" element={<PopupSettings />} />
          <Route path="note-settings" element={<NoteSettings />} />
          <Route path="handle-booking" element={<HandleBooking />} />
          <Route path="handle-contact" element={<HandleContact />} />
          <Route path="handle-about" element={<HandleAbout />} />
          <Route
            path="handle-why-chose-our-platform"
            element={<HandleWhyChoseOurPlatform />}
          />
          <Route path="handle-what-we-offer" element={<HandleWhatWeOffer/>}/>

          <Route path="handle-faqs" element={<HandleFaq />} />

          <Route path="handle-blogs" element={<HandleBlog />} />

          <Route path="handle-service-type" element={<HandleServiceType />} />
          <Route
            path="handle-service-type-feature"
            element={<HandleServiceTypeFeature />}
          />
          <Route path="handle-service-why-choose" element={<HandleServicesWhyChose />} />
          <Route path="handle-service-customer-stories" element={<HandleServicesCustomerStories />} />

          <Route path="handle-product" element={<HandleProduct />} />

          <Route path="handle-recruitment-page" element={<HandleRecruitmentPage />} />
          <Route path="handle-jobs" element={<HandleJobs />} />
          <Route path="handle-jobs-applications" element={<HandleJobsApplication />} />

          <Route path="handle-banner" element={<HandleBanner />} />
          <Route path="handle-all-in-one-platforms" element={<HandleAllInOnePlatforms />} />

          {/* <Route path="profile" element={<AdminProfile />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
