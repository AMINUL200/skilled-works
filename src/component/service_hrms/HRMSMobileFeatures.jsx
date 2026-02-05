import React from "react";

const FeatureBox = ({ icon, title, text }) => {
  return (
    <div className="flex gap-4 items-start mb-8">
      <div className="w-14 h-14 flex items-center justify-center ">
        <img src={icon} alt="icon" className="w-full h-full object-contain" />
      </div>

      <div>
        <h4 className="font-semibold text-lg">{title}</h4>
        <p className="text-gray-500 text-sm mt-1">{text}</p>
      </div>
    </div>
  );
};

const HRMSMobileFeatures = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container max-w-[1200px] mx-auto px-6">
        {/* TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          {/* <p className="text-orange-500 font-medium flex items-center justify-center gap-2">
            Why using our app
          </p> */}

          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            Our HRMS Mobile App Features
          </h2>
        </div>

        {/* MAIN GRID */}
        <div className="grid xl:grid-cols-3 gap-10 items-center">
          {/* LEFT FEATURES */}
          <div>
            <FeatureBox
              icon="/image/smart_att.svg"
              title="Smart Attendance"
              text="Track employee hours with GPS-enabled, real-time attendance logs."
            />

            <FeatureBox
              icon="/image/real_time.svg"
              title="Real-Time Notifications"
              text="Get instant alerts for all HR updates."
            />

            <FeatureBox
              icon="/image/multi_branch.png"
              title="Multi-Branch Access"
              text="Manage multiple branches within one app."
            />
          </div>

          {/* CENTER IMAGE */}
          <div className="flex justify-center relative">
            <img
              src="https://skilledworkerscloud.co.uk/media/hrms/why_used_our_app/178523699_878671622_111197053_imgp.png"
              alt="HRMS App"
              className="w-[360px] relative z-10"
            />

            <img
              src="/image/shape2.png"
              className="absolute -bottom-4"
              alt="shape"
            />
          </div>

          {/* RIGHT FEATURES */}
          <div>
            <FeatureBox
              icon="/image/payslip.png"
              title="Payslip Access"
              text="View and download monthly payslips anytime, anywhere."
            />

            <FeatureBox
              icon="/image/employe.png"
              title="Employee Directory"
              text="Access and manage staff profiles on the go."
            />

            <FeatureBox
              icon="/image/leave.png"
              title="Leave Management"
              text="Easily apply and approve leave from your mobile device."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HRMSMobileFeatures;
