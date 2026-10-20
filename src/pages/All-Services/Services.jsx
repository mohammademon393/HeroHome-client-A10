import React, { useEffect, useState } from "react";
import axios from "axios";
import ServicesCard from "../../components/AllServicesReleted/ServicesCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isActive = true;

    axios
      .get("https://homehero-api.vercel.app/services")
      .then((response) => {
        if (isActive) {
          setServices(Array.isArray(response.data) ? response.data : []);
        }
      })
      .catch(() => {
        if (isActive) setError("Could not load services. Please try again later.");
      })
      .finally(() => {
        if (isActive) setLoading(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black text-center mb-10">
        Explore Our All <span className="text-rose-600">Services</span>
      </h1>
      <p className="text-lg text-gray-600 text-center -mt-3 mb-10">
        Discover the wide range of services we offer to meet your needs.
      </p>

      {loading ? (
        <div className="text-center py-20 font-bold" role="status">
          Loading services...
        </div>
      ) : error ? (
        <p className="text-center py-20 text-rose-700" role="alert">{error}</p>
      ) : (
        <ServicesCard services={services} />
      )}
    </div>
  );
};

export default Services;
