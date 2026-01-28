import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQComponent = ({ faqs, title = "Frequently Asked Questions", description = "Find quick answers to common questions" }) => {
  const [activeFAQ, setActiveFAQ] = useState(null);

  return (
    <div className="w-full">
      {/* Header */}
      {title && (
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1F2E9A] mb-4">{title}</h2>
          {description && (
            <p className="text-lg text-[#666666] max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="border border-[#E6E0FF] rounded-xl overflow-hidden bg-white hover:shadow-lg transition-shadow duration-200"
          >
            <button
              onClick={() => setActiveFAQ(activeFAQ === faq.id ? null : faq.id)}
              className="w-full px-6 py-5 flex items-center justify-between hover:bg-[#FAFAFF] transition-colors duration-200"
              aria-expanded={activeFAQ === faq.id}
            >
              <div className="flex items-start gap-4 text-left">
                <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-[#1F2E9A] to-[#2430A3]">
                  <HelpCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  {faq.category && (
                    <span className="inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-[#F2EEFF] to-[#E6F7FF] text-[#9B3DFF] mb-2">
                      {faq.category}
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-[#1F2E9A] pr-8">
                    {faq.question}
                  </h3>
                </div>
              </div>
              <ChevronDown
                className={`flex-shrink-0 w-5 h-5 text-[#9B3DFF] transition-transform duration-200 ${
                  activeFAQ === faq.id ? "rotate-180" : ""
                }`}
              />
            </button>
            
            <div
              className={`px-6 overflow-hidden transition-all duration-300 ${
                activeFAQ === faq.id ? "max-h-96 pb-6" : "max-h-0"
              }`}
            >
              <div className="pl-14 pt-2">
                <p className="text-[#666666] leading-relaxed">{faq.answer}</p>
                {faq.link && (
                  <div className="mt-4">
                    <a
                      href={faq.link.url}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#1F2E9A] hover:text-[#9B3DFF] transition-colors"
                    >
                      {faq.link.text || "Learn more"} →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQComponent;