import React from "react";
import MagneticButton from "../../component/common/MagneticButtonProps";

const AboutBusnes = ({ aboutData = {} }) => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  console.log("AboutBusnes data:", aboutData); // Debug log to check data structure
  return (
    <section className="relative py-16 lg:py-24 bg-gradient-to-r from-[#F6E9FF] via-[#EEF0FF] to-[#E9F8FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left">
           <p className="text-base sm:text-lg text-[#444444] leading-relaxed" dangerouslySetInnerHTML={{ __html: aboutData?.description }}
              aria-label={aboutData?.description_meta ? "Business expertise description" : "No description available"}
            
           ></p>
          </div>

          {/* RIGHT IMAGE */}
          <div className="relative flex justify-center lg:justify-end">

            <div className="w-full max-w-sm sm:max-w-md lg:max-w-md rounded-xl overflow-hidden shadow-2xl">
              <img
                src={`${STORAGE_URL}${aboutData?.image}`}
                alt={aboutData?.image_alt || "business growth"}
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
