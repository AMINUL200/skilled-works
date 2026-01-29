import React from "react";

const AboutRight = () => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-white py-24">

      
      {/* Subtle Background Decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#1F2E9A] opacity-5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#1F2E9A] opacity-5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          
          {/* LEFT CONTENT */}
          <div className="space-y-8">
            
            {/* Main Heading */}
            <div className="border-l-4 border-[#1F2E9A] pl-6">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1F2E9A] leading-tight">
                Benefit of Using HR Management System
              </h2>
            </div>

            {/* Introduction Text */}
            <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
              <p className="text-gray-700 leading-relaxed text-base">
                Human Resource Management Systems offer several advantages for
                organisations. Overall, an HRMS can help organisations streamline
                their processes, reduce manual tasks, improve data accuracy, and
                enhance employee engagement and satisfaction. The most significant
                benefit is that they can help save time and money by automating HR
                processes. They can help improve compliance with UKVI sponsorship
                rules and provide a centralised location for all employee records.
              </p>
            </div>

            {/* Choosing HRMS Section */}
            <div>
              <h3 className="text-2xl font-bold text-[#1F2E9A] mb-4 flex items-center gap-3">
                <span className="w-2 h-2 bg-[#1F2E9A] rounded-full"></span>
                Choosing an HRMS for Your Business
              </h3>

              <p className="text-gray-700 leading-relaxed text-base pl-5">
                It is crucial to consider your specific needs while choosing a
                cloud-based HR software for your business.{" "}
                <strong className="text-[#1F2E9A]">SKILLED WORKERS CLOUD</strong> software meets the
                requirements of companies of all sizes. Reach out to our team to
                discuss your tailormade requirements and find out more about our
                services.
              </p>
            </div>

            {/* Services Section */}
            <div className="bg-gradient-to-br from-[#1F2E9A] to-[#2A3BAD] rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">
                What Does Our HRMS Software Service Include?
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  "Sponsorship Compliance",
                  "Right to Work Check",
                  "Advance Notifications",
                  "Recruitment Automation",
                  "Employee Database Management",
                  "Attendance System",
                  "Leave & Holiday Management",
                  "Job Rota Management",
                  "Dashboard Report",
                  "Free HR Consultation",
                  "Cloud Storage",
                  "Dedicated Relationship Manager"
                ].map((service, index) => (
                  <div key={index} className="flex items-start gap-3 bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
                    <svg className="w-5 h-5  mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className=" text-sm font-medium">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="bg-white rounded-xl p-8 shadow-sm border-2 border-[#1F2E9A] border-opacity-20">
              <p className="text-lg font-semibold text-[#1F2E9A] text-center">
                If you want to know more about our HRMS Software service,
                please leave your enquiry here.
              </p>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex justify-center lg:justify-end lg:sticky lg:top-45">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#1F2E9A] to-[#2A3BAD] rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
              
              {/* Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-lg border-4 border-white">
                <img
                  src="/image/834597132_416060936_service2.png"
                  alt="HR discussion"
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