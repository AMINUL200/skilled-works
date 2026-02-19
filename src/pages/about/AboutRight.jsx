import React from "react";

const AboutRight = ({ aboutData = {} }) => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  // console.log("AboutRight data:", aboutData); // Debug log to check data structure

  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-24">
      {/* Subtle Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1F2E9A] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1F2E9A] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            <p
              className="text-base sm:text-lg text-[#444444] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData?.description }}
              aria-label={aboutData?.description_meta ? "About us description" : "No description available"}
            ></p>

            

            
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end lg:sticky lg:top-45">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#1F2E9A] to-[#2A3BAD] rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg border-4 border-white">
                <img
                  src={`${STORAGE_URL}${aboutData?.image}`}
                  alt={aboutData?.image_alt || aboutData?.heading || "About Us"}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2E9A] via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Corner Accent */}
              <div className="absolute -top-3 -right-3 w-24 h-24 border-t-4 border-r-4 border-[#1F2E9A] rounded-tr-2xl"></div>
              <div className="absolute -bottom-3 -left-3 w-24 h-24 border-b-4 border-l-4 border-[#1F2E9A] rounded-bl-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutRight;
