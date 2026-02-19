import React from "react";
import {
  Layers,
  Building2,
  Database,
  Plug,
  Cloud,
  ArrowRight,
} from "lucide-react";

// Helper function to extract plain text from HTML
const extractPlainText = (htmlString) => {
  if (!htmlString) return "";
  const doc = new DOMParser().parseFromString(htmlString, 'text/html');
  return doc.body.textContent || "";
};

// Helper function to extract bullet points from HTML
const extractBulletPoints = (htmlString) => {
  if (!htmlString) return [];
  
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  
  // Find all list items
  const listItems = doc.querySelectorAll('li');
  const points = [];
  
  listItems.forEach((item) => {
    const text = item.textContent?.trim();
    if (text && text.length > 0) {
      points.push(text);
    }
  });
  
  return points.length > 0 ? points : [];
};

// Helper function to get icon based on heading
const getIconForHeading = (heading) => {
  const headingLower = (heading || '').toLowerCase();
  
  if (headingLower.includes('custom') || headingLower.includes('business')) {
    return Layers;
  }
  if (headingLower.includes('enterprise')) {
    return Building2;
  }
  if (headingLower.includes('crm') || headingLower.includes('erp')) {
    return Database;
  }
  if (headingLower.includes('api') || headingLower.includes('integration')) {
    return Plug;
  }
  if (headingLower.includes('cloud')) {
    return Cloud;
  }
  // Default icon
  return Layers;
};

const HRMSOtherService = ({ serviceData = [], storageUrl = '' }) => {
  console.log("HRMSOtherService received:", { serviceData, storageUrl });

  // Sort service data by ID or priority
  const sortedServices = [...serviceData].sort((a, b) => a.id - b.id);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* SECTION HEADER */}
        <div className="text-center mb-16">
         
          <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-[#2430A3]"> What We Offer</span>
            {/* <span className="block mt-2 bg-gradient-to-r from-[#1F2E9A] via-[#9B3DFF] to-[#E60023] bg-clip-text text-transparent">
              Choose Our HRMS Platform
            </span> */}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
            Comprehensive software development services tailored to your
            business needs
          </p>
        </div>

        {/* First two cards in first row */}
        {sortedServices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {sortedServices.slice(0, 2).map((service) => {
              const Icon = getIconForHeading(service.heading);
              const description = extractPlainText(service.description);
              const bulletPoints = extractBulletPoints(service.description);
              
              // If no bullet points found, try to extract from the description
              const points = bulletPoints.length > 0 ? bulletPoints : 
                description.split('\n').filter(line => line.trim().length > 0).slice(0, 3);
              
              return (
                <OfferCard
                  key={service.id}
                  icon={Icon}
                  title={service.heading}
                  description={description.split('.')[0] + '.'} // First sentence as description
                  points={points.slice(0, 3)} // Limit to 3 points
                  buttonName={service.button_name || "Learn More"}
                  buttonUrl={service.button_url}
                />
              );
            })}
          </div>
        )}

        {/* Remaining cards in second row */}
        {sortedServices.length > 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedServices.slice(2).map((service) => {
              const Icon = getIconForHeading(service.heading);
              const description = extractPlainText(service.description);
              const bulletPoints = extractBulletPoints(service.description);
              
              // If no bullet points found, try to extract from the description
              const points = bulletPoints.length > 0 ? bulletPoints : 
                description.split('\n').filter(line => line.trim().length > 0).slice(0, 3);
              
              return (
                <OfferCard
                  key={service.id}
                  icon={Icon}
                  title={service.heading}
                  description={description.split('.')[0] + '.'} // First sentence as description
                  points={points.slice(0, 3)} // Limit to 3 points
                  buttonName={service.button_name || "Learn More"}
                  buttonUrl={service.button_url}
                />
              );
            })}
          </div>
        )}

        {/* Fallback if no service data */}
        {sortedServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600">Services coming soon...</p>
          </div>
        )}
      </div>
    </section>
  );
};

/* REUSABLE CARD COMPONENT */
const OfferCard = ({ icon: Icon, title, description, points, buttonName, buttonUrl }) => {
  const handleClick = () => {
    if (buttonUrl) {
      window.open(buttonUrl, '_blank', 'noopener,noreferrer');
    }
  };

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
      {points && points.length > 0 && (
        <ul className="space-y-2 mb-6">
          {points.map((point, index) => (
            <li
              key={index}
              className="text-sm text-slate-600 flex items-center"
            >
              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2" />
              {point}
            </li>
          ))}
        </ul>
      )}

      {/* CTA */}
      <button 
        onClick={handleClick}
        className="text-blue-600 font-medium flex items-center group-hover:translate-x-2 transition-transform"
      >
        {buttonName || "Learn More"}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </article>
  );
};

export default HRMSOtherService;