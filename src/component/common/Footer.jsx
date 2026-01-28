import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-white">
      {/* MAIN FOOTER */}
      <div className="max-w-8xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

        {/* COMPANY INFO */}
        <div>
          <img
            src="/image/swch_logo.png"
            alt="Logo"
            className="w-40 mb-4"
          />

          <p className="text-sm text-gray-300 leading-relaxed">
            SKILLED WORKERS CLOUD is a UK regulated skilled HR-tech company.
            We specialise in Skilled HR systems for business in the UK.
            We are a combination of skilled HR and technology based company
            to deliver superior business results for our client.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex gap-3 mt-5">
            {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 border border-gray-500 rounded-full flex items-center justify-center hover:bg-[#E60023] hover:text-white transition cursor-pointer"
              >
                <Icon size={16} />
              </div>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              "Home",
              "About us",
              "HRMS Software",
              "HR File Preparation",
              "File Manager",
              "Software Development",
              "Business Consultancy",
              "Web/Profile Development",
              "Skilled Workers Industry",
              "Recruitment",
              "Pricing",
              "Blog",
              "Contacts",
            ].map((item, i) => (
              <li key={i} className="hover:text-[#9B3DFF] cursor-pointer">
                › {item}
              </li>
            ))}
          </ul>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {[
              "Google",
              "Facebook",
              "LinkedIn",
              "Twitter",
              "Instagram",
              "Google Meet",
              "Zoom",
              "Download Acrobat Reader",
              "Right to Work Check",
              "Microsoft Teams",
              "HO Media Blogs",
            ].map((item, i) => (
              <li key={i} className="hover:text-[#9B3DFF] cursor-pointer">
                › {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CONNECT US */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Connect Us</h3>

          <p className="text-red-500 text-sm mb-3">
            info@skilledworkerscloud.co.uk
          </p>

          <p className="text-sm text-gray-300 flex gap-2 mb-2">
            <MapPin size={16} />
            Suite 602, 6th Floor, 252–262 Romford Road,
            London, E7 9HZ United Kingdom.
          </p>

          <p className="text-sm text-gray-300 flex gap-2 mb-2">
            <Phone size={16} />
            Landline: +44 0208 129 1655
          </p>

          <p className="text-sm text-gray-300 flex gap-2">
            <Phone size={16} />
            Mobile & WhatsApp: +44 0746 728 4718
          </p>

          <p className="text-red-500 text-sm mt-4 cursor-pointer">
            ICO Certificate
          </p>
        </div>

        {/* JOIN US */}
        <div>
          <h3 className="text-lg font-semibold mb-4">JOIN US</h3>

          <input
            type="email"
            placeholder="Your Email"
            className="w-full px-4 py-2 rounded-full bg-white text-black mb-3 outline-none"
          />

          <button className="w-full py-2 rounded-full bg-gradient-to-r from-red-600 to-red-800 hover:opacity-90 transition font-semibold">
            Submit
          </button>

          <h4 className="text-lg font-semibold mt-6 mb-3">
            All Login Links
          </h4>

          <ul className="space-y-2 text-sm text-gray-300">
            <li className="hover:text-white cursor-pointer">› HRMS Register</li>
            <li className="hover:text-white cursor-pointer">
              › HRMS Organisation Login
            </li>
            <li className="hover:text-white cursor-pointer">
              › Employee Login
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
        <p>
          Copyright © {new Date().getFullYear()} Skilled Workers Cloud Ltd.
          All Rights Reserved
        </p>

        <div className="flex justify-center gap-6 mt-2 text-red-500 text-sm">
          <span className="cursor-pointer hover:underline">Privacy Policy</span>
          <span className="cursor-pointer hover:underline">My Privacy Rights</span>
          <span className="cursor-pointer hover:underline">Terms of Us</span>
          <span className="cursor-pointer hover:underline">Sitemap</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
