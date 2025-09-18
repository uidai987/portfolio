"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { PROFILE_IMAGE, FALLBACK_PROFILE_IMAGE } from "@/lib/imageUrls";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  profileImage?: string;
}

export default function HeroSection({
  title = "Aman Goswami",
  subtitle = "Graphic Design Portfolio 2025",
  profileImage = PROFILE_IMAGE,
}: HeroSectionProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [imageError, setImageError] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (!mounted) {
    return (
      <section className="relative h-screen w-full bg-black flex flex-col justify-center items-center overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
          <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              <span className="text-[#C4FF00]">Aman</span>Goswami
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">{subtitle}</p>
            <Button className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black font-bold px-8 py-6 text-lg rounded-md">
              View My Work
            </Button>
          </div>
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#C4FF00] shadow-[0_0_25px_rgba(196,255,0,0.5)]">
              <img
                src={FALLBACK_PROFILE_IMAGE}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full bg-black flex flex-col justify-center items-center overflow-hidden cursor-none">
      {/* Custom Cursor */}
      <div 
        className="fixed w-6 h-6 bg-[#C4FF00] rounded-full pointer-events-none z-[100] mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'scale(1)',
        }}
      />
      
      {/* Cursor Trail */}
      <div 
        className="fixed w-12 h-12 border-2 border-[#C4FF00]/50 rounded-full pointer-events-none z-[99] transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
        }}
      />

      {/* Interactive Cursor Elements */}
      <div 
        className="fixed w-2 h-2 bg-[#C4FF00]/80 rounded-full pointer-events-none z-[98] transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 4 + Math.sin(Date.now() * 0.001) * 20,
          top: mousePosition.y - 4 + Math.cos(Date.now() * 0.001) * 20,
        }}
      />
      
      <div 
        className="fixed w-1 h-1 bg-[#C4FF00]/60 rounded-full pointer-events-none z-[97] transition-all duration-700 ease-out"
        style={{
          left: mousePosition.x - 2 + Math.cos(Date.now() * 0.002) * 30,
          top: mousePosition.y - 2 + Math.sin(Date.now() * 0.002) * 30,
        }}
      />

      {/* Navigation Bar - Sticky when scrolled */}
      <nav className={`${
        isScrolled 
          ? 'fixed top-0 bg-black/90 backdrop-blur-md border-b border-gray-800' 
          : 'absolute top-0 bg-transparent'
      } w-full flex justify-between items-center p-6 z-50 transition-all duration-300`}>
        <div className="text-white text-xl font-bold cursor-pointer hover:scale-110 transition-transform">
          <span className="text-[#C4FF00]">Aman</span>Goswami
        </div>
        <ul className="hidden md:flex space-x-8">
          {[
            { name: "Home", id: "home" },
            { name: "About", id: "about" },
            { name: "Services", id: "services" },
            { name: "Portfolio", id: "works" },
            { name: "Contact", id: "contact" }
          ].map((item) => (
            <li key={item.name}>
              <button
                onClick={() => scrollToSection(item.id)}
                className="text-white hover:text-[#C4FF00] transition-colors duration-300 cursor-pointer hover:scale-110 transform transition-transform"
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
        <Button
          variant="outline"
          className="md:hidden border-[#C4FF00] text-[#C4FF00] hover:scale-110 transition-transform"
        >
          Menu
        </Button>
      </nav>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Mouse-following elements */}
        <div 
          className="absolute w-32 h-32 border border-[#C4FF00]/20 rounded-full transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x * 0.1,
            top: mousePosition.y * 0.1,
          }}
        />
        
        <div 
          className="absolute w-16 h-16 bg-[#C4FF00]/5 rounded-full transition-all duration-800 ease-out"
          style={{
            left: mousePosition.x * 0.05 + 100,
            top: mousePosition.y * 0.05 + 50,
          }}
        />

        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 border-2 border-[#C4FF00]/30 rotate-45 animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-[#C4FF00]/10 rounded-full animate-float-medium"></div>
        <div className="absolute bottom-40 left-20 w-12 h-12 border border-[#C4FF00]/40 animate-float-fast"></div>
        <div className="absolute top-60 left-1/3 w-8 h-8 bg-[#C4FF00]/20 rotate-12 animate-float-slow"></div>
        <div className="absolute bottom-60 right-1/4 w-24 h-24 border-2 border-[#C4FF00]/20 rounded-full animate-float-medium"></div>
        
        {/* Animated Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C4FF00]/30 to-transparent animate-pulse-slow"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C4FF00]/20 to-transparent animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-1/3 right-10 w-32 h-32 bg-[#C4FF00]/5 rounded-full blur-xl animate-glow-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#C4FF00]/8 rounded-full blur-lg animate-glow-pulse" style={{animationDelay: '3s'}}></div>
        
        {/* Moving Particles */}
        <div className="absolute top-20 right-1/3 w-2 h-2 bg-[#C4FF00] rounded-full animate-particle-1"></div>
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-[#C4FF00]/80 rounded-full animate-particle-2"></div>
        <div className="absolute bottom-1/3 right-1/2 w-1.5 h-1.5 bg-[#C4FF00]/60 rounded-full animate-particle-3"></div>
        
        {/* Grid Pattern with Animation */}
        <div
          className="absolute inset-0 opacity-5 animate-grid-move"
          style={{
            backgroundImage:
              "linear-gradient(to right, #C4FF00 1px, transparent 1px), linear-gradient(to bottom, #C4FF00 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300">
            {title.split("").map((letter, index) => (
              <span
                key={index}
                className={index === 0 ? "text-[#C4FF00]" : "text-white"}
              >
                {letter}
              </span>
            ))}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">{subtitle}</p>
          <Button 
            onClick={() => scrollToSection('works')}
            className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black font-bold px-8 py-6 text-lg rounded-md hover:scale-110 transition-transform duration-300"
          >
            View My Work
          </Button>
        </div>
        <div className="md:w-1/2 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-[#C4FF00] shadow-[0_0_25px_rgba(196,255,0,0.5)] hover:scale-105 transition-transform duration-300">
            <img
              src={imageError ? FALLBACK_PROFILE_IMAGE : profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          </div>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div 
        onClick={() => scrollToSection('about')}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce cursor-pointer z-10 hover:scale-110 transition-transform"
      >
        <span className="text-[#C4FF00] mb-2">Scroll Down</span>
        <ChevronDown className="text-[#C4FF00] w-6 h-6" />
      </div>
    </section>
  );
}