import React from "react";

const AboutLeft = () => {
  return (
    <section className="relative py-24 bg-gradient-to-br from-[#F6E9FF] via-[#EEF5FF] to-[#E9F6FF]">

      {/* Decorative Elements */}
      <div className="absolute left-10 top-16 opacity-10">
        <img
          src="/hexagon-bg.png"
          alt="pattern"
          className="w-60"
        />
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
                  src="/image/834597132_416060936_service2.png"
                  alt="software development"
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
            
            {/* Main Heading */}
            <div className="border-l-4 border-[#1F2E9A] pl-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2E9A] leading-tight">
                Our Other Expertise
              </h2>
            </div>

            {/* Introduction Text */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-base">
                In addition to our HR services, we provide a range of other
                expertise tailored to elevate your business. From web development
                solutions to business consultancy services, we offer innovative
                solutions designed to enhance efficiency, tackle challenges, and
                achieve strategic goals. With a focus on delivering superior
                results and simplifying complexities, we are your trusted partner
                in navigating the dynamic business landscape.
              </p>
            </div>

            {/* Services Cards */}
            <div className="space-y-5">

              {/* Software Development */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#1F2E9A] group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#1F2E9A] to-[#2A3BAD] flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1F2E9A] mb-3">Software Development</h3>
                    <p className="text-gray-700 leading-relaxed text-sm mb-3">
                      Skilled Workers Cloud offers cutting-edge software development
                      solutions tailored to elevate your business in today's dynamic
                      digital landscape. Our services include custom software, web,
                      and mobile app development aligned with your business goals.
                      With a focus on agility, quality, and security, we deliver
                      scalable and future-ready solutions.
                    </p>
                    {/* <span className="inline-flex items-center text-[#1F2E9A] font-semibold text-sm cursor-pointer group-hover:gap-2 transition-all">
                      See More Details
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span> */}
                  </div>
                </div>
              </div>

              {/* Business Consultancy */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1F2E9A] mb-3">Business Consultancy</h3>
                    <p className="text-gray-700 leading-relaxed text-sm mb-3">
                      We operate a dynamic Business Consultancy serving as a strategy
                      think tank focused on innovative insights from business,
                      technology, and compliance. Our services cover strategy,
                      operations, marketing, HR, and IT, delivering tailored solutions
                      for SMEs.
                    </p>
                    {/* <span className="inline-flex items-center text-[#1F2E9A] font-semibold text-sm cursor-pointer group-hover:gap-2 transition-all">
                      See More Details
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span> */}
                  </div>
                </div>
              </div>

              {/* Web/Profile Development */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1F2E9A] mb-3">Web/Profile Development</h3>
                    <p className="text-gray-700 leading-relaxed text-sm mb-3">
                      We specialize in crafting engaging web solutions using modern
                      technologies. From basic to advanced projects, we prioritize
                      seamless functionality and user-centric design to ensure
                      flawless execution.
                    </p>
                    {/* <span className="inline-flex items-center text-[#1F2E9A] font-semibold text-sm cursor-pointer group-hover:gap-2 transition-all">
                      See More Details
                      <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span> */}
                  </div>
                </div>
              </div>

              {/* Skilled Workers Industry */}
              <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border-l-4 border-teal-500 group">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500 to-teal-700 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#1F2E9A] mb-3">Skilled Workers Industry</h3>
                    <p className="text-gray-700 leading-relaxed text-sm">
                      We deliver recruitment services across Aviation, IT, Oil & Gas,
                      Construction, Finance, Healthcare, Education, and Culinary
                      sectors. Our expertise ensures precise talent acquisition
                      aligned with industry-specific needs.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutLeft;