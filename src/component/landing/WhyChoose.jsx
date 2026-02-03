import React from "react";
import {
  ShieldCheck,
  Zap,
  Users,
  BarChart3,
  Headphones,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure & Compliant",
    desc: "Built with UK GDPR compliance, enterprise-grade security, and data protection you can trust.",
    color: "from-[#1F2E9A] to-[#2430A3]",
  },
  {
    icon: Zap,
    title: "Fast & Scalable",
    desc: "Lightning-fast performance with cloud infrastructure that grows as your business grows.",
    color: "from-[#9B3DFF] to-[#B47BFF]",
  },
  {
    icon: Users,
    title: "Employee-Centric Design",
    desc: "Simple, intuitive UI designed for HR teams and employees — zero training required.",
    color: "from-[#2EC5FF] to-[#00B894]",
  },
  {
    icon: BarChart3,
    title: "Smart Analytics",
    desc: "Real-time dashboards and insights to help HR leaders make data-driven decisions.",
    color: "from-[#FFA726] to-[#FF6B6B]",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    desc: "Human support when you need it — email, chat, and phone assistance from HR experts.",
    color: "from-[#E60023] to-[#FF1F1F]",
  },
  {
    icon: Sparkles,
    title: "Future-Ready HR",
    desc: "AI-powered features designed for the future of HR management in modern businesses.",
    color: "from-[#9B3DFF] to-[#2EC5FF]",
  },
];

const WhyChoose = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-[#FAFAFF] to-white relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#9B3DFF]/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#2EC5FF]/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F2E9A] mb-4">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9B3DFF] to-[#2EC5FF]">
              Our Platform
            </span>
          </h2>

          <p className="text-lg text-[#666666] leading-relaxed">
            We combine technology, compliance, and human-focused design to help
            UK businesses manage HR smarter, faster, and better.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group bg-white/70 backdrop-blur-xl border border-[#E6E0FF] rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1F2E9A] mb-3">
                  {item.title}
                </h3>

                <p className="text-[#666666] leading-relaxed">
                  {item.desc}
                </p>

                {/* Hover line */}
                <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-[#9B3DFF] to-[#2EC5FF] group-hover:w-full transition-all duration-500"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
