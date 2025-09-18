"use client";

import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  LogOut,
  BarChart3,
  FolderOpen,
  Settings,
  Image as ImageIcon
} from "lucide-react";

interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  tags: string[];
}

interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  images: string[];
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [serviceCategories, setServiceCategories] = useState<ServiceCategory[]>([]);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [editingService, setEditingService] = useState<ServiceCategory | null>(null);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isAddingService, setIsAddingService] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedPortfolio = localStorage.getItem('portfolioItems');
    const savedServices = localStorage.getItem('serviceCategories');
    
    if (savedPortfolio) {
      setPortfolioItems(JSON.parse(savedPortfolio));
    } else {
      // Default portfolio items
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
        }
      ];
      setPortfolioItems(defaultItems);
      localStorage.setItem('portfolioItems', JSON.stringify(defaultItems));
    }

    if (savedServices) {
      setServiceCategories(JSON.parse(savedServices));
    } else {
      // Default service categories
      const defaultServices: ServiceCategory[] = [
        {
          id: "1",
          name: "Logo Design",
          description: "Professional logo design services",
          images: [
            "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&q=80",
            "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&q=80"
          ]
        },
        {
          id: "2",
          name: "Web Design",
          description: "Modern website design and development",
          images: [
            "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&q=80"
          ]
        }
      ];
      setServiceCategories(defaultServices);
      localStorage.setItem('serviceCategories', JSON.stringify(defaultServices));
    }
  }, []);

  // Save portfolio items to localStorage
  const savePortfolioItems = (items: PortfolioItem[]) => {
    setPortfolioItems(items);
    localStorage.setItem('portfolioItems', JSON.stringify(items));
  };

  // Save service categories to localStorage
  const saveServiceCategories = (services: ServiceCategory[]) => {
    setServiceCategories(services);
    localStorage.setItem('serviceCategories', JSON.stringify(services));
  };

  // Portfolio item management
  const handleSavePortfolioItem = (item: PortfolioItem) => {
    if (editingItem) {
      const updatedItems = portfolioItems.map(p => p.id === item.id ? item : p);
      savePortfolioItems(updatedItems);
    } else {
      const newItem = { ...item, id: Date.now().toString() };
      savePortfolioItems([...portfolioItems, newItem]);
    }
    setEditingItem(null);
    setIsAddingItem(false);
  };

  const handleDeletePortfolioItem = (id: string) => {
    const updatedItems = portfolioItems.filter(item => item.id !== id);
    savePortfolioItems(updatedItems);
  };

  // Service category management
  const handleSaveServiceCategory = (service: ServiceCategory) => {
    if (editingService) {
      const updatedServices = serviceCategories.map(s => s.id === service.id ? service : s);
      saveServiceCategories(updatedServices);
    } else {
      const newService = { ...service, id: Date.now().toString() };
      saveServiceCategories([...serviceCategories, newService]);
    }
    setEditingService(null);
    setIsAddingService(false);
  };

  const handleDeleteServiceCategory = (id: string) => {
    const updatedServices = serviceCategories.filter(service => service.id !== id);
    saveServiceCategories(updatedServices);
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">
            Admin <span className="text-[#C4FF00]">Dashboard</span>
          </h1>
          <Button
            onClick={onLogout}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:border-[#C4FF00] hover:text-[#C4FF00]"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-900">
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-[#C4FF00] data-[state=active]:text-black">
              <FolderOpen className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
            <TabsTrigger value="services" className="data-[state=active]:bg-[#C4FF00] data-[state=active]:text-black">
              <Settings className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#C4FF00] data-[state=active]:text-black">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Portfolio Management */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Portfolio Items</h2>
              <Button
                onClick={() => setIsAddingItem(true)}
                className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <Card key={item.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-32 object-cover rounded mb-3"
                    />
                    <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400 text-sm mb-2">{item.description}</p>
                    <Badge className="mb-3">{item.category}</Badge>
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingItem(item)}
                        className="border-gray-600 text-gray-300 hover:border-[#C4FF00] hover:text-[#C4FF00]"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeletePortfolioItem(item.id)}
                        className="border-red-600 text-red-400 hover:border-red-500 hover:text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Service Categories</h2>
              <Button
                onClick={() => setIsAddingService(true)}
                className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {serviceCategories.map((service) => (
                <Card key={service.id} className="bg-gray-900 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">{service.name}</CardTitle>
                    <p className="text-gray-400">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {service.images.slice(0, 4).map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${service.name} ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-400 mb-3">
                      {service.images.length} images
                    </p>
                    <div className="flex justify-end space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setEditingService(service)}
                        className="border-gray-600 text-gray-300 hover:border-[#C4FF00] hover:text-[#C4FF00]"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteServiceCategory(service.id)}
                        className="border-red-600 text-red-400 hover:border-red-500 hover:text-red-300"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-xl font-semibold text-white">Analytics Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#C4FF00]">{portfolioItems.length}</h3>
                    <p className="text-gray-400">Portfolio Items</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#C4FF00]">{serviceCategories.length}</h3>
                    <p className="text-gray-400">Service Categories</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-[#C4FF00]">
                      {serviceCategories.reduce((total, service) => total + service.images.length, 0)}
                    </h3>
                    <p className="text-gray-400">Total Images</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Portfolio Item Modal */}
      {(editingItem || isAddingItem) && (
        <PortfolioItemModal
          item={editingItem}
          onSave={handleSavePortfolioItem}
          onClose={() => {
            setEditingItem(null);
            setIsAddingItem(false);
          }}
        />
      )}

      {/* Service Category Modal */}
      {(editingService || isAddingService) && (
        <ServiceCategoryModal
          service={editingService}
          onSave={handleSaveServiceCategory}
          onClose={() => {
            setEditingService(null);
            setIsAddingService(false);
          }}
        />
      )}
    </div>
  );
}

// Portfolio Item Modal Component
function PortfolioItemModal({
  item,
  onSave,
  onClose
}: {
  item: PortfolioItem | null;
  onSave: (item: PortfolioItem) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<PortfolioItem>(
    item || {
      id: "",
      title: "",
      description: "",
      image: "",
      category: "",
      tags: []
    }
  );
  const [tagInput, setTagInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">
            {item ? "Edit Portfolio Item" : "Add Portfolio Item"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-300">Title</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Image URL</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                placeholder="https://example.com/image.jpg"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Category</Label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Tags</Label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} className="bg-gray-700 text-white">
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-red-400 hover:text-red-300"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Service Category Modal Component
function ServiceCategoryModal({
  service,
  onSave,
  onClose
}: {
  service: ServiceCategory | null;
  onSave: (service: ServiceCategory) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<ServiceCategory>(
    service || {
      id: "",
      name: "",
      description: "",
      images: []
    }
  );
  const [imageInput, setImageInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const addImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageInput.trim()]
      }));
      setImageInput("");
    }
  };

  const removeImage = (imageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(image => image !== imageToRemove)
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl bg-gray-900 border-gray-800 max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="text-white">
            {service ? "Edit Service Category" : "Add Service Category"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label className="text-gray-300">Service Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
            </div>
            <div>
              <Label className="text-gray-300">Images</Label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white"
                  placeholder="https://example.com/image.jpg"
                />
                <Button type="button" onClick={addImage} className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black">
                  <ImageIcon className="w-4 h-4 mr-2" />
                  Add
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Service image ${index + 1}`}
                      className="w-full h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#C4FF00] hover:bg-[#a3cc00] text-black">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}