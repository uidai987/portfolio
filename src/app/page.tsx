"use client";

import React, { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ContactSection from "@/components/ContactSection";
import { Separator } from "@/components/ui/separator";
import { PROFILE_IMAGE, FALLBACK_PROFILE_IMAGE } from "@/lib/imageUrls";
import ServicesSection from "@/components/ServicesSection";

export default function Home() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }
      });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    return () => {
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Navigation */}
      <HeroSection />

      {/* About Section */}
      <section id="about" className="bg-black py-20 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content - Animate from left to right */}
            <div className="animate-on-scroll animate-slide-left">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                About <span className="text-[#C4FF00]">Me</span>
              </h2>
              <p className="text-gray-300 text-lg mb-6">
                I'm a passionate graphic designer with over 2 years of
                experience creating compelling visual identities and digital
                experiences. My work spans across branding, logo design, social
                media graphics, and UI/UX design.
              </p>
              <p className="text-gray-300 text-lg mb-8">
                I believe in the power of good design to transform businesses
                and create meaningful connections with audiences. Every project
                is an opportunity to tell a unique story through visual
                elements.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-[#C4FF00] text-2xl font-bold">50+</h3>
                  <p className="text-gray-300">Projects Completed</p>
                </div>
                <div className="animate-on-scroll" style={{ animationDelay: '0.4s' }}>
                  <h3 className="text-[#C4FF00] text-2xl font-bold">2+</h3>
                  <p className="text-gray-300">Years Experience</p>
                </div>
              </div>
            </div>

            {/* Image - Animate from right to left */}
            <div className="flex justify-center animate-on-scroll animate-slide-right">
              <div className="w-80 h-80 rounded-lg overflow-hidden border-2 border-[#C4FF00] shadow-[0_0_25px_rgba(196,255,0,0.3)] hover-scale">
                <img
                  src={PROFILE_IMAGE}
                  alt="About me"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}