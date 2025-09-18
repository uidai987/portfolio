"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags?: string[];
}

interface PortfolioSectionProps {
  items?: PortfolioItem[];
}

const defaultItems: PortfolioItem[] = [
  {
    id: "1",
    title: "Brand Identity Design",
    description: "Complete brand identity package for a tech startup",
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80",
    category: "Branding",
    tags: ["Branding", "Logo", "Identity"]
  },
  {
    id: "2",
    title: "Social Media Campaign",
    description: "Instagram campaign design for fashion brand",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&q=80",
    category: "Social Media",
    tags: ["Social Media", "Instagram", "Fashion"]
  },
  {
    id: "3",
    title: "Logo Design",
    description: "Modern logo design for restaurant chain",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
    category: "Logo",
    tags: ["Logo", "Restaurant", "Modern"]
  },
  {
    id: "4",
    title: "Print Design",
    description: "Brochure and flyer design for corporate event",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&q=80",
    category: "Print",
    tags: ["Print", "Brochure", "Corporate"]
  },
  {
    id: "5",
    title: "Web Design",
    description: "Landing page design for SaaS product",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80",
    category: "Web Design",
    tags: ["Web", "Landing Page", "SaaS"]
  },
  {
    id: "6",
    title: "Package Design",
    description: "Product packaging for organic skincare line",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&q=80",
    category: "Branding",
    tags: ["Packaging", "Organic", "Skincare"]
  }
];

export default function PortfolioSection({ items }: PortfolioSectionProps) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(defaultItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState<string[]>(["All"]);

  // Load portfolio items from localStorage
  useEffect(() => {
    const savedItems = localStorage.getItem('portfolioItems');
    if (savedItems) {
      const parsedItems = JSON.parse(savedItems);
      setPortfolioItems(parsedItems);
      
      // Extract unique categories
      const uniqueCategories = ["All", ...new Set(parsedItems.map((item: PortfolioItem) => item.category))];
      setCategories(uniqueCategories);
    } else {
      // Use default items and extract categories
      const uniqueCategories = ["All", ...new Set(defaultItems.map(item => item.category))];
      setCategories(uniqueCategories);
    }
  }, []);

  const filteredItems = selectedCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

  return (
    <section id="works" className="min-h-screen bg-black py-20 px-4">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            My <span className="text-[#C4FF00]">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my creative portfolio showcasing various design projects across different categories
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full border-2 transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-[#C4FF00] text-black border-[#C4FF00] font-bold"
                  : "text-white border-gray-600 hover:border-[#C4FF00] hover:text-[#C4FF00]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div key={item.id} className="group cursor-pointer">
              <Card className="bg-gray-900 border-gray-800 overflow-hidden hover:border-[#C4FF00] transition-all duration-300 hover:shadow-[0_0_25px_rgba(196,255,0,0.3)]">
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                    <span className="text-[#C4FF00] font-bold text-lg">
                      View Project
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-[#C4FF00] transition-colors">
                      {item.title}
                    </h3>
                    <Badge variant="outline" className="border-[#C4FF00] text-[#C4FF00]">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-gray-400 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags && item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-[#C4FF00] hover:text-black transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No items found in this category.</p>
            <p className="text-gray-500 mt-2">Try selecting a different category or add new items in the admin panel.</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-gray-300 mb-6">Like what you see? Let's work together!</p>
          <button className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black font-bold px-8 py-4 rounded-md transition-all duration-300 hover:scale-105">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
}