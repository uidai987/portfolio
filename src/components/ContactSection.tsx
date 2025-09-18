"use client";

import React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Send, Linkedin, Instagram, Dribbble } from "lucide-react";

interface ContactSectionProps {
  id?: string;
}

const ContactSection = ({ id = "contact" }: ContactSectionProps) => {
  return (
    <section
      id={id}
      className="min-h-[600px] w-full bg-black text-white py-20 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-7xl mx-auto">
        {/* Thank You Message */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Thanks For <span className="text-[#C4FF00]">Scrolling!</span>
          </h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            Let's work together and bring your ideas to life.
          </p>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-lg mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center">
            <span className="text-[#C4FF00] mr-2">Get in Touch</span>
            <Send size={20} className="text-[#C4FF00]" />
          </h3>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium"
                >
                  Name
                </label>
                <Input
                  id="name"
                  placeholder="your name"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus-visible:ring-[#C4FF00]"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus-visible:ring-[#C4FF00]"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium"
              >
                Subject
              </label>
              <Input
                id="subject"
                placeholder="What's this about?"
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus-visible:ring-[#C4FF00]"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                rows={5}
                className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-400 focus-visible:ring-[#C4FF00]"
              />
            </div>
            <Button
              type="submit"
              className="bg-[#C4FF00] text-black hover:bg-[#a3cc00] transition-colors w-full md:w-auto"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Social Links */}
        <div className="text-center mb-16">
          <h3 className="text-xl font-bold mb-6">Connect With Me</h3>
          <div className="flex justify-center space-x-6">
            <a
              href="#"
              className="hover:text-[#C4FF00] transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="#"
              className="hover:text-[#C4FF00] transition-colors"
              aria-label="Behance"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 10.9v4.1" />
                <path d="M6 15h4" />
                <path d="M9 10.9h1.5a2.5 2.5 0 0 1 0 5H9" />
                <path d="M16 15h3" />
                <path d="M14 9h4" />
                <path d="M18 13.5a2.5 2.5 0 0 1-2.5 2.5 2.5 2.5 0 1 1 0-5c.84 0 2.5 0 2.5 0" />
                <path d="M4 5h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-[#C4FF00] transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={24} />
            </a>
            <a
              href="#"
              className="hover:text-[#C4FF00] transition-colors"
              aria-label="Dribbble"
            >
              <Dribbble size={24} />
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-zinc-800 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#C4FF00] transition-colors"
                  >
                    Logo
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#C4FF00] transition-colors"
                  >
                    Branding
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#C4FF00] transition-colors"
                  >
                    Social Media
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#C4FF00] transition-colors"
                  >
                    Package Design
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#C4FF00] transition-colors"
                  >
                    Print Media
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#C4FF00] transition-colors"
                  >
                    UI/UX
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-medium mb-4">Contact Info</h4>
              <ul className="space-y-2 text-zinc-400">
                <li>info@amangoswami.com</li>
                <li>+91 9354943277</li>
                <li> Delhi, IND</li>
              </ul>
            </div>

            {/* Copyright */}
            <div>
              <h4 className="text-lg font-medium mb-4">About</h4>
              <p className="text-zinc-400 mb-4">
                Passionate graphic designer specializing in creating modern,
                impactful visual solutions for brands and businesses.{" "}
                <a 
                  href="/admin" 
                  className="text-zinc-400 hover:text-[#C4FF00] transition-colors cursor-pointer"
                  style={{ textDecoration: 'none' }}
                >
                  Aman G
                </a>
              </p>
              <p className="text-sm text-zinc-500">
                © 2025 Aman Goswami. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default ContactSection;