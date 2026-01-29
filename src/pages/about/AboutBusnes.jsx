import React from "react";
import MagneticButton from "../../component/common/MagneticButtonProps";

const AboutBusnes = () => {
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-r from-[#F6E9FF] via-[#EEF0FF] to-[#E9F8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1F2E9A] mb-4">
              Growth in Business 2025
            </h2>

            <p className="text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10 text-sm sm:text-base">
              The Skilled Workers Cloud™ strategy think tank, dedicated to
              exploring and developing valuable new insights from business,
              technology & compliances by embracing the powerful technology of
              ideas. The company engages business leaders in productive
              discussion and experimentation to expand the boundaries of
              business theory and practice and to implement the technology to
              translate innovative ideas from within and beyond business which
              act as Main Catalyst to the business success.
            </p>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
              {[
                { value: "58+", label: "Projects" },
                { value: "100+", label: "Clients" },
                { value: "98%", label: "Satisfaction" },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <h3 className="text-3xl sm:text-4xl font-bold text-black">
                    {item.value}
                  </h3>
                  <p className="text-gray-700 text-sm mt-1">
                    {item.label}
                  </p>
                  {item.label === "Satisfaction" && (
                    <p className="text-xs text-gray-500">
                      Rendered Happy Clients!
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">

            <div className="w-full max-w-sm sm:max-w-md lg:max-w-md rounded-xl overflow-hidden shadow-2xl">
              <img
                src="/image/840315605_about_img1.jpg"
                alt="business growth"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* MAGNETIC BUTTON */}
            <div
              className="
                absolute 
                -bottom-10 
                left-1/2 
                -translate-x-1/2 
                lg:left-12 
                lg:translate-x-0
              "
            >
              <MagneticButton
                variant="round"
                size={160}
                className="bg-gradient-to-r from-[#B800FF] to-[#8A00FF] text-white shadow-xl"
              >
                <span className="text-base sm:text-lg">
                  About Us
                </span>
              </MagneticButton>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBusnes;
