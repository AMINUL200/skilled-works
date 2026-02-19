import React from "react";

const AboutLeft = ({ aboutData = {} }) => {
  const STORAGE_URL = import.meta.env.VITE_STORAGE_URL;
  // console.log("AboutLeft data:", aboutData); // Debug log to check data structure
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#F6E9FF] via-[#EEF5FF] to-[#E9F6FF]">
      {/* Decorative Elements */}
      <div className="absolute left-10 top-16 opacity-10">
        {/* <img
          src="/hexagon-bg.png"
          alt="pattern"
          className="w-60"
        /> */}
      </div>

      {/* Subtle Background Decorations */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-[#1F2E9A] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-300 opacity-10 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT IMAGE */}
          <div className="flex justify-center lg:justify-start lg:sticky lg:top-45">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-purple-400 to-[#1F2E9A] rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg border-4 border-white">
                <img
                  src={`${STORAGE_URL}${aboutData?.image}`}
                  alt={aboutData?.image_alt || "software development"}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1F2E9A] via-transparent to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </div>

              {/* Corner Accent */}
              <div className="absolute -top-3 -left-3 w-24 h-24 border-t-4 border-l-4 border-[#1F2E9A] rounded-tl-2xl"></div>
              <div className="absolute -bottom-3 -right-3 w-24 h-24 border-b-4 border-r-4 border-[#1F2E9A] rounded-br-2xl"></div>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-8">
            <p
              className="text-base sm:text-lg text-[#444444] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: aboutData?.description }}
              aria-label={
                aboutData?.description_meta
                  ? "About us description"
                  : "No description available"
              }
            ></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutLeft;
