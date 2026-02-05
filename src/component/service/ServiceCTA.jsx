import React from "react";

const ServiceCTA = () => {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">

      {/* BLUR BACKGROUND EFFECTS */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>

      <div className="max-w-5xl mx-auto relative">
        <div className="text-center">

          {/* BADGE */}
          <div className="inline-block mb-6 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium border border-white/30">
            Let's Work Together
          </div>

          {/* HEADING */}
          <h2 className="text-white mb-6 text-4xl md:text-5xl font-semibold leading-tight">
            Looking for the Right Digital Solution
            <br />
            for Your Business?
          </h2>

          {/* DESCRIPTION */}
          <p className="text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
            Schedule a free consultation with our experts and discover how we can help you achieve your business goals with cutting-edge technology solutions.
          </p>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

            {/* PRIMARY BUTTON */}
            <button className="px-8 py-4 bg-white text-blue-600 rounded-xl font-medium shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2 group">
              
              {/* ICON */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"></path>
              </svg>

              Get a Free Consultation

              {/* ARROW */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>

            {/* SECONDARY BUTTON */}
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl font-medium hover:bg-white hover:text-blue-600 transition-all duration-300">
              View Our Portfolio
            </button>
          </div>

          {/* FEATURES */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/80 text-sm">

            {[
              "Free Consultation",
              "No Hidden Costs",
              "Quick Response Time",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>{item}</span>
              </div>
            ))}

          </div>

        </div>
      </div>
    </section>
  );
};

export default ServiceCTA;
