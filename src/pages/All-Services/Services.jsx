import React, { Suspense } from "react";
import ServicesCard from "../../components/AllServicesReleted/ServicesCard";

const servicesPromise = fetch("https://homehero-api.vercel.app/services").then(
  (res) => res.json(),
);

const Services = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-center mb-10">
        Explore Our All <span className="text-rose-600">Services</span>
      </h1>
      <p className="text-lg text-gray-600 text-center -mt-3 mb-10">
        Discover the wide range of services we offer to meet your needs.
      </p>

      <Suspense
        fallback={
          <div className="text-center py-20 font-bold">
            Loading Awesome Services...
          </div>
        }
      >
        <ServicesCard servicesPromise={servicesPromise} />
      </Suspense>
    </div>
  );
};

export default Services;
