import React, { useEffect, useState } from "react";
import ServiceHero from "../../component/service/ServiceHero";
import ServiceOurCapabilities from "../../component/service/ServiceOurCapabilities";
import ServiceDevelopmentProcess from "../../component/service/ServiceDevelopmentProcess";
import ServiceWhyChoose from "../../component/service/ServiceWhyChoose";
import ServiceWeServe from "../../component/service/ServiceWeServe";
import ServiceWhatWeOffer from "../../component/service/ServiceWhatWeOffer";
import { api } from "../../utils/app";
import PageLoader from "../../component/common/PageLoader";

const ServicePage = () => {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [capabilityData, setCapabilityData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [servicePageData, setServicePageData] = React.useState(null);
  const [processData, setProcessData] = React.useState(null);
  const [whyChooseData, setWhyChooseData] = React.useState(null);
  const [weServeData, setWeServeData] = React.useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [serviceTypeRes, servicePageRes] = await Promise.all([
          api.get(`/service-type`),
          api.get(`/service`),
        ]);
        // console.log("Service API responses:", {
        //   serviceType: serviceTypeRes.data.data,
        //   servicePage: servicePageRes.data.data,
        //   // capability: capabilityRes
        // });
        setServiceTypes(serviceTypeRes.data.data);
        setServicePageData(servicePageRes.data.data);
        const transformedProcessData = servicePageRes.data.data.slice(2, 7);
        setProcessData(transformedProcessData);
        const transformedWhyChooseData = servicePageRes.data.data.slice(7, 13);
        setWhyChooseData(transformedWhyChooseData);
        const transformedWeServeData = servicePageRes.data.data.slice(13, 25);
        setWeServeData(transformedWeServeData);
        // setCapabilityData(capabilityRes.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load services");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  



  if(loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-[#FAFAFF] to-white pt-30">
      {/* Section 1: hero */}
      <ServiceHero serviceData={servicePageData[0]} />

      {/* Section 2: Services Overview */}
      <ServiceWhatWeOffer serviceTypes={serviceTypes} />

      {/* Section 3: Our Capabilities */}
      <ServiceOurCapabilities capabilityData={servicePageData[1]} />

      {/* Section 4: Development Process */}
      <ServiceDevelopmentProcess processData={processData} />

      {/* Section 5: Why Choose Us */}
      <ServiceWhyChoose whyChooseData={whyChooseData} />

      {/* Section 6: We Serve */}
      <ServiceWeServe weServeData={weServeData} />
    </div>
  );
};

export default ServicePage;
