import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Download,
  Video,
} from "lucide-react";

const Footer = ({ settingData = null, serviceData = [] }) => {
  // console.log("Footer received settingData:", settingData);
  const navigate = useNavigate();
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;

  // Extract the actual data object from settingData
  const siteData = settingData || {};

  // Navigation handler for internal routes
  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0); // Scroll to top on navigation
  };

  // Social media links from API data
  const socialLinks = [
    {
      icon: Facebook,
      url: siteData.facebook || "https://facebook.com/skilledworkerscloud",
      label: "Facebook",
    },
    {
      icon: Twitter,
      url: siteData.twitter || "https://twitter.com/skilledhrcloud",
      label: "Twitter",
    },
    {
      icon: Linkedin,
      url:
        siteData.linkedin ||
        "https://linkedin.com/company/skilled-workers-cloud",
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      url: siteData.instagram || "https://instagram.com/skilledworkerscloud",
      label: "Instagram",
    },
  ];

  // Quick links with paths
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About us", path: "/about" },
    ...serviceData.slice(0, 5).map((service) => ({
      name: service.name,
      path: `/service/${service.slug}`,
    })),
    { name: "Recruitment", path: "/recruitment" },
    // { name: "Pricing", path: "/pricing" },
    { name: "Blog", path: "/blog" },
    { name: "Contacts", path: "/contact" },
  ];

  // External links (keep as static for now, could be dynamic if API provides them)
  const externalLinks = [
    { name: "Google", url: "https://google.com", icon: ExternalLink },
    { name: "Facebook", url: "https://facebook.com", icon: Facebook },
    { name: "LinkedIn", url: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter", url: "https://twitter.com", icon: Twitter },
    { name: "Instagram", url: "https://instagram.com", icon: Instagram },
    { name: "Google Meet", url: "https://meet.google.com", icon: Video },
    { name: "Zoom", url: "https://zoom.us", icon: Video },
    {
      name: "Download Acrobat Reader",
      url: "https://get.adobe.com/reader/",
      icon: Download,
    },
    {
      name: "Right to Work Check",
      url: "https://www.gov.uk/check-job-applicant-right-to-work",
      icon: ExternalLink,
    },
    {
      name: "Microsoft Teams",
      url: "https://teams.microsoft.com",
      icon: Video,
    },
    {
      name: "HO Media Blogs",
      url: "https://homeofficemedia.blog.gov.uk",
      icon: ExternalLink,
    },
  ];

  // Login links
  const loginLinks = [
    {
      name: "HRMS Register",
      url: "https://skilledworkerscloud.co.uk/hrms-v2/register",
      external: true,
    },
    {
      name: "HRMS Organisation Login",
      url: "https://skilledworkerscloud.co.uk/hrms-v2/",
      external: true,
    },
    {
      name: "Employee Login",
      url: "https://skilledworkerscloud.co.uk/hrms-v2/",
      external: true,
    },
  ];

  // Policy links
  const policyLinks = [
    { name: "Privacy Policy", path: "/policy/privacy-policy" },
    { name: "My Privacy Rights", path: "/policy/my-privacy-rights" },
    { name: "Terms of Use", path: "/policy/terms-of-use" },
    { name: "Sitemap", path: "/sitemap" },
  ];

  // Newsletter subscription handler
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;

    // TODO: Integrate with newsletter service (Mailchimp, etc.)
    console.log("Subscribing email:", email);

    // Show success message
    alert("Thank you for subscribing to our newsletter!");
    form.reset();
  };

  // ICO Certificate handler
  const handleICOCertificate = () => {
    // Replace with actual ICO certificate URL
    window.open("https://ico.org.uk/ESDWebPages/Entry/ZB620846", "_blank");
  };

  // Format address from API data
  const formatAddress = () => {
    const parts = [
      siteData.street_address,
      siteData.city,
      siteData.state,
      siteData.zip,
      siteData.country,
    ].filter(Boolean);

    return parts.length > 0
      ? parts.join(", ")
      : "Suite 602, 6th Floor, 252–262 Romford Road, London, E7 9HZ United Kingdom.";
  };

  // Get primary email
  const primaryEmail = siteData.email || "info@skilledworkerscloud.co.uk";

  // Get phone numbers
  const primaryPhone = siteData.phone || "+44 0208 129 1655";
  const landline = siteData.landline || "";
  const fax = siteData.fax || "";

  return (
    <footer className="bg-[#0f0f0f] text-white">
      {/* MAIN FOOTER */}
      <div className="max-w-8xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* COMPANY INFO */}
        <div>
          <div
            onClick={() => handleNavigation("/")}
            className="cursor-pointer hover:opacity-90 transition-opacity"
          >
            <img
              src={
                siteData.site_web_logo
                  ? `${STORAGE_URL}${siteData.site_web_logo}`
                  : "/image/swch_logo.png"
              }
              alt={siteData.site_logo_alt || "Skilled Workers Cloud Logo"}
              className="w-40 mb-4"
            />
          </div>

          <p className="text-sm text-gray-300 leading-relaxed mb-4">
            {siteData.site_name || "SKILLED WORKERS CLOUD"}
          </p>

          {/* CONTACT INFO */}
          <div className="space-y-2 mb-4">
            <a
              href={`mailto:${primaryEmail}`}
              className="text-red-500 text-sm hover:text-red-400 transition-colors flex items-center gap-2"
            >
              <Mail size={14} />
              {primaryEmail}
            </a>

            {landline && (
              <a
                href={`tel:${landline.replace(/\D/g, "")}`}
                className="text-gray-300 text-sm hover:text-white transition-colors flex items-center gap-2"
              >
                <Phone size={14} />
                Landline: {landline}
              </a>
            )}

            <a
              href={`tel:${primaryPhone.replace(/\D/g, "")}`}
              className="text-gray-300 text-sm hover:text-white transition-colors flex items-center gap-2"
            >
              <Phone size={14} />
              Phone: {primaryPhone}
            </a>

            {fax && (
              <p className="text-gray-300 text-sm flex items-center gap-2">
                <Phone size={14} />
                Fax: {fax}
              </p>
            )}
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3 mt-5">
            {socialLinks
              .filter((social) => social.url)
              .map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-gray-500 rounded-full flex items-center justify-center hover:bg-[#E60023] hover:text-white hover:border-[#E60023] transition-all duration-300 cursor-pointer group"
                  aria-label={`Follow us on ${social.label}`}
                  title={`Follow us on ${social.label}`}
                >
                  <social.icon size={16} />
                </a>
              ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {quickLinks.map((link, i) => (
              <li key={i}>
                <button
                  onClick={() => handleNavigation(link.path)}
                  className="hover:text-[#9B3DFF] cursor-pointer flex items-center gap-1 w-full text-left transition-colors duration-200"
                >
                  › {link.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* EXTERNAL LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {externalLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#9B3DFF] cursor-pointer flex items-center gap-1 transition-colors duration-200 group"
                >
                  › {link.name}
                  <link.icon
                    size={12}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CONNECT US */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>

          <div className="space-y-3">
            <a
              href={`mailto:${primaryEmail}`}
              className="text-red-500 text-sm hover:text-red-400 transition-colors block"
            >
              {primaryEmail}
            </a>

            <p className="text-sm text-gray-300 flex items-start gap-2">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              {formatAddress()}
            </p>

            {landline && (
              <p className="text-sm text-gray-300 flex items-center gap-2">
                <Phone size={16} />
                Landline: {landline}
              </p>
            )}

            <p className="text-sm text-gray-300 flex items-center gap-2">
              <Phone size={16} />
              Phone: {primaryPhone}
            </p>

            <button
              onClick={handleICOCertificate}
              className="text-red-500 text-sm hover:text-red-400 transition-colors cursor-pointer mt-4 inline-block"
            >
              ICO Certificate
            </button>
          </div>
        </div>

        {/* JOIN US & LOGIN */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Join Our Newsletter</h3>

          <form onSubmit={handleNewsletterSubmit} className="mb-6">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full px-4 py-3 rounded-full bg-white text-black mb-3 outline-none focus:ring-2 focus:ring-[#9B3DFF] transition-all"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition-all font-semibold shadow-lg hover:shadow-xl"
            >
              Subscribe
            </button>
          </form>

          <h4 className="text-lg font-semibold mt-8 mb-3">All Login Links</h4>

          <ul className="space-y-2 text-sm text-gray-300">
            {loginLinks.map((link, i) => (
              <li key={i}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white cursor-pointer flex items-center gap-1 transition-colors duration-200"
                >
                  › {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-800 py-6">
        <div className="max-w-8xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              Copyright © {new Date().getFullYear()}{" "}
              {siteData.site_name || "Skilled Workers Cloud Ltd"}. All Rights
              Reserved
            </p>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-gray-400 text-sm">
              {policyLinks.map((link, i) => (
                <button
                  key={i}
                  onClick={() => handleNavigation(link.path)}
                  className="hover:text-[#E60023] cursor-pointer transition-colors duration-200"
                >
                  {link.name}
                </button>
              ))}
            </div>
          </div>

          {/* Company Info */}
          <div className="text-center mt-4 text-gray-500 text-xs">
            <p>
              Registered in {siteData.country || "England and Wales"} | Company
              Number: [YOUR_COMPANY_NUMBER]
            </p>
            <p className="mt-1">VAT Number: [YOUR_VAT_NUMBER]</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
