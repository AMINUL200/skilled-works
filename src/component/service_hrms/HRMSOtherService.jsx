import React from "react";
import {
  Layers,
  Building2,
  Database,
  Plug,
  Cloud,
  ArrowRight,
} from "lucide-react";

const HRMSOtherService = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            What We Offer
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive software development services tailored to your
            business needs
          </p>
        </div>

        {/* ROW 1 – 2 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Card 1 */}
          <OfferCard
            icon={Layers}
            title="Custom Business Software"
            description="Build bespoke applications that perfectly align with your business processes and goals."
            points={["Web Applications", "Desktop Software", "Mobile Apps"]}
          />

          {/* Card 2 */}
          <OfferCard
            icon={Building2}
            title="Enterprise Software Solutions"
            description="Scalable enterprise-grade systems designed for large organizations and complex workflows."
            points={[
              "Workflow Automation",
              "Document Management",
              "Business Intelligence",
            ]}
          />
        </div>

        {/* ROW 2 – 3 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OfferCard
            icon={Database}
            title="CRM & ERP Systems"
            description="Comprehensive customer relationship and enterprise resource planning solutions."
            points={[
              "Customer Management",
              "Resource Planning",
              "Analytics & Reporting",
            ]}
          />

          <OfferCard
            icon={Plug}
            title="API Development & Integration"
            description="Connect your systems seamlessly with custom API development and third-party integrations."
            points={[
              "RESTful APIs",
              "Third-party Integration",
              "Microservices",
            ]}
          />

          <OfferCard
            icon={Cloud}
            title="Cloud-Based Applications"
            description="Modern cloud-native applications leveraging AWS, Azure, and Google Cloud."
            points={[
              "Scalable Infrastructure",
              "Multi-tenant SaaS",
              "Cloud Migration",
            ]}
          />
        </div>
      </div>
    </section>
  );
};

/* REUSABLE CARD COMPONENT */
const OfferCard = ({ icon: Icon, title, description, points }) => {
  return (
    <article className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
      {/* Icon */}
      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-white" aria-hidden="true" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-slate-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 mb-4">
        {description}
      </p>

      {/* Bullet Points */}
      <ul className="space-y-2 mb-6">
        {points.map((point) => (
          <li
            key={point}
            className="text-sm text-slate-600 flex items-center"
          >
            <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
            {point}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button className="text-blue-600 font-medium flex items-center group-hover:translate-x-2 transition-transform">
        Learn More
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </article>
  );
};

export default HRMSOtherService;
