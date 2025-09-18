"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  images: string[];
}

const defaultServices: ServiceCategory[] = [
  {
    id: "1",
    name: "Logo Design",
    description: "Professional logo design services that capture your brand's essence",
    images: [
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80"
    ]
  },
  {
    id: "2",
    name: "Web Design",
    description: "Modern website design and development for digital success",
    images: [
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80"
    ]
  },
  {
    id: "3",
    name: "Brand Identity",
    description: "Complete brand identity packages including logos, colors, and guidelines",
    images: [
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80",
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80"
    ]
  }
];

export default function ServicesSection() {
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>(defaultServices);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({});

  // Load service categories from localStorage
  useEffect(() => {
    const savedServices = localStorage.getItem('serviceCategories');
    if (savedServices) {
      const parsedServices = JSON.parse(savedServices);
      setServiceCategories(parsedServices);
      
      // Initialize image indices
      const initialIndices: { [key: string]: number } = {};
      parsedServices.forEach((service: ServiceCategory) => {
        initialIndices[service.id] = 0;
      });
      setCurrentImageIndex(initialIndices);
    } else {
      // Initialize with default services
      const initialIndices: { [key: string]: number } = {};
      defaultServices.forEach(service => {
        initialIndices[service.id] = 0;
      });
      setCurrentImageIndex(initialIndices);
    }
  }, []);

  const nextImage = (serviceId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [serviceId]: (prev[serviceId] + 1) % totalImages
    }));
  };

  const prevImage = (serviceId: string, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [serviceId]: prev[serviceId] === 0 ? totalImages - 1 : prev[serviceId] - 1
    }));
  };

  return (
    <section id="services" className="bg-gray-900 py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            My <span className="text-[#C4FF00]">Services</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Comprehensive design services tailored to elevate your brand and create lasting impressions
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((service) => (
            <Card key={service.id} className="bg-black border-gray-800 overflow-hidden hover:border-[#C4FF00] transition-all duration-300 hover:shadow-[0_0_25px_rgba(196,255,0,0.3)]">
              <div className="relative h-64 overflow-hidden">
                {service.images.length > 0 ? (
                  <>
                    <img
                      src={service.images[currentImageIndex[service.id] || 0]}
                      alt={`${service.name} example`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    
                    {/* Image Navigation */}
                    {service.images.length > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(service.id, service.images.length)}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => nextImage(service.id, service.images.length)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        
                        {/* Image Indicators */}
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {service.images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === (currentImageIndex[service.id] || 0)
                                  ? "bg-[#C4FF00]"
                                  : "bg-white/50"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                    <p className="text-gray-400">No images available</p>
                  </div>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-white text-xl">{service.name}</CardTitle>
              </CardHeader>
              
              <CardContent className="pb-6">
                <p className="text-gray-400 mb-4">{service.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {service.images.length} sample{service.images.length !== 1 ? 's' : ''}
                  </span>
                  <Button 
                    size="sm" 
                    className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black font-medium"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {serviceCategories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No services available.</p>
            <p className="text-gray-500 mt-2">Add new services in the admin panel to showcase your offerings.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-300 mb-6">
            Let's discuss how I can help bring your vision to life with professional design services.
          </p>
          <Button className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black font-bold px-8 py-4 text-lg">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
}