import React from "react";
import ServiceHero from "../../component/service/ServiceHero";
import ServiceOurCapabilities from "../../component/service/ServiceOurCapabilities";
import ServiceDevelopmentProcess from "../../component/service/ServiceDevelopmentProcess";
import ServiceWhyChoose from "../../component/service/ServiceWhyChoose";
import ServiceWeServe from "../../component/service/ServiceWeServe";
import ServiceWhatWeOffer from "../../component/service/ServiceWhatWeOffer";

const ServicePage = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-[#FAFAFF] to-white pt-30">
      {/* Section 1: hero */}
      <ServiceHero />

      {/* Section 2: Services Overview */}
      <ServiceWhatWeOffer />

      {/* Section 3: Our Capabilities */}
      <ServiceOurCapabilities />

      {/* Section 4: Development Process */}
      <ServiceDevelopmentProcess />

      {/* Section 5: Why Choose Us */}
      <ServiceWhyChoose />

      {/* Section 6: We Serve */}
      <ServiceWeServe />
    </div>
  );
};

export default ServicePage;
