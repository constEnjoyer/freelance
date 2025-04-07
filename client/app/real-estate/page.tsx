"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import {
  Bed,
  Bath,
  Square,
  Search,
  Plus,
  Heart,
  Star,
  Filter,
  MapPin,
  ChevronDown,
  Building,
  Home,
  DollarSign,
  Calendar,
  Users,
  CheckCircle2,
  Grid,
  List,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

// Sample property data
const properties = [
  {
    id: 1,
    title: "Modern Apartment in Downtown",
    description: "Luxurious 2-bedroom apartment with stunning city views",
    price: "$2,500/month",
    location: "123 Main St, Downtown",
    image: "/placeholder.svg?height=200&width=300",
    beds: 2,
    baths: 2,
    sqft: 1200,
    type: "Apartment",
    status: "For Rent",
    featured: true,
    agent: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    features: ["Balcony", "Air Conditioning", "Parking", "Elevator"],
  },
  {
    id: 2,
    title: "Cozy Family Home",
    description: "Beautiful 4-bedroom house with a large backyard",
    price: "$450,000",
    location: "456 Oak Ave, Suburbia",
    image: "/placeholder.svg?height=200&width=300",
    beds: 4,
    baths: 3,
    sqft: 2400,
    type: "House",
    status: "For Sale",
    featured: true,
    agent: {
      name: "Michael Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    features: ["Garden", "Garage", "Fireplace", "Storage Room"],
  },
  {
    id: 3,
    title: "Luxury Penthouse",
    description: "Exclusive penthouse with panoramic views and private terrace",
    price: "$1,200,000",
    location: "789 Skyline Blvd, Highrise District",
    image: "/placeholder.svg?height=200&width=300",
    beds: 3,
    baths: 3.5,
    sqft: 3000,
    type: "Penthouse",
    status: "For Sale",
    featured: false,
    agent: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    features: ["Terrace", "Pool", "Security System", "Concierge"],
  },
  {
    id: 4,
    title: "Studio Apartment",
    description: "Compact and modern studio in the heart of the city",
    price: "$1,200/month",
    location: "101 Urban St, Downtown",
    image: "/placeholder.svg?height=200&width=300",
    beds: 1,
    baths: 1,
    sqft: 600,
    type: "Apartment",
    status: "For Rent",
    featured: false,
    agent: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=32&width=32",
    },
    features: ["Furnished", "Utilities Included", "Gym Access", "Laundry"],
  },
]

export default function RealEstate() {
  const [favorites, setFavorites] = useState<number[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filterOpen, setFilterOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState([0, 1500000])
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    beds: "",
    baths: "",
    sqft: "",
    type: "",
    status: "",
  })
  const [sortOption, setSortOption] = useState("newest")

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleAddListing = () => {
    // Here you would typically send the data to your backend
    console.log("New listing data:", formData)
    // Reset form
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      beds: "",
      baths: "",
      sqft: "",
      type: "",
      status: "",
    })
  }

  const togglePropertyType = (type: string) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((t) => t !== type))
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type])
    }
  }

  const toggleFeature = (feature: string) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter((f) => f !== feature))
    } else {
      setSelectedFeatures([...selectedFeatures, feature])
    }
  }

  const resetFilters = () => {
    setSearchQuery("")
    setPriceRange([0, 1500000])
    setSelectedPropertyTypes([])
    setSelectedFeatures([])
  }

  const propertyTypes = ["Apartment", "House", "Condo", "Townhouse", "Penthouse", "Land", "Commercial"]

  const features = [
    "Pool",
    "Garden",
    "Garage",
    "Balcony",
    "Terrace",
    "Sea View",
    "Mountain View",
    "Air Conditioning",
    "Heating",
    "Fireplace",
    "Security System",
    "Storage Room",
    "Elevator",
    "Furnished",
    "Utilities Included",
    "Gym Access",
    "Laundry",
  ]

  const filteredProperties = properties
    .filter((property) => {
      // Search query filter
      if (searchQuery) {
        const searchLower = searchQuery.toLowerCase()
        return (
          property.title.toLowerCase().includes(searchLower) ||
          property.description.toLowerCase().includes(searchLower) ||
          property.location.toLowerCase().includes(searchLower) ||
          property.type.toLowerCase().includes(searchLower)
        )
      }
      return true
    })
    .filter((property) => {
      // Tab filter
      if (activeTab === "all") return true
      if (activeTab === "featured") return property.featured
      if (activeTab === "forSale") return property.status === "For Sale"
      if (activeTab === "forRent") return property.status === "For Rent"
      if (activeTab === "favorites") return favorites.includes(property.id)
      return true
    })
    .filter((property) => {
      // Price range filter
      const numericPrice = Number.parseInt(property.price.replace(/[^0-9]/g, ""))
      return numericPrice >= priceRange[0] && numericPrice <= priceRange[1]
    })
    .filter((property) => {
      // Property type filter
      if (selectedPropertyTypes.length === 0) return true
      return selectedPropertyTypes.includes(property.type)
    })
    .filter((property) => {
      // Features filter
      if (selectedFeatures.length === 0) return true
      return selectedFeatures.some((feature) => property.features.includes(feature))
    })

  // Sort properties
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortOption === "price-high") {
      return Number.parseInt(b.price.replace(/[^0-9]/g, "")) - Number.parseInt(a.price.replace(/[^0-9]/g, ""))
    } else if (sortOption === "price-low") {
      return Number.parseInt(a.price.replace(/[^0-9]/g, "")) - Number.parseInt(b.price.replace(/[^0-9]/g, ""))
    } else if (sortOption === "beds") {
      return b.beds - a.beds
    } else if (sortOption === "size") {
      return b.sqft - a.sqft
    } else {
      // Default: newest first (by id in this case)
      return b.id - a.id
    }
  })

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header with gradient background */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 mb-8 text-white">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Real Estate Marketplace</h1>
            <p className="text-blue-100 mt-2">Find your dream property or list your own</p>
          </div>
          <div className="flex gap-3">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-blue-50">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Listing
                </Button>
              </DrawerTrigger>
              <DrawerContent className="max-h-[90vh] overflow-y-auto">
                <DrawerHeader className="border-b pb-4">
                  <DrawerTitle className="text-2xl font-bold">Add New Property Listing</DrawerTitle>
                  <DrawerDescription>Fill out the form below to create a new property listing.</DrawerDescription>
                </DrawerHeader>
                <div className="px-4 py-6">
                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="title" className="text-sm font-medium">
                        Property Title
                      </Label>
                      <Input
                        id="title"
                        name="title"
                        placeholder="e.g. Modern Apartment in Downtown"
                        value={formData.title}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="description" className="text-sm font-medium">
                        Description
                      </Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your property..."
                        className="min-h-[120px]"
                        value={formData.description}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="price" className="text-sm font-medium">
                          Price
                        </Label>
                        <Input
                          id="price"
                          name="price"
                          placeholder="e.g. $450,000 or $2,500/month"
                          value={formData.price}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="location" className="text-sm font-medium">
                          Location
                        </Label>
                        <Input
                          id="location"
                          name="location"
                          placeholder="Address"
                          value={formData.location}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="beds" className="text-sm font-medium">
                          Bedrooms
                        </Label>
                        <Input
                          id="beds"
                          name="beds"
                          type="number"
                          placeholder="2"
                          value={formData.beds}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="baths" className="text-sm font-medium">
                          Bathrooms
                        </Label>
                        <Input
                          id="baths"
                          name="baths"
                          type="number"
                          placeholder="2"
                          value={formData.baths}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="sqft" className="text-sm font-medium">
                          Square Feet
                        </Label>
                        <Input
                          id="sqft"
                          name="sqft"
                          type="number"
                          placeholder="1200"
                          value={formData.sqft}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="type" className="text-sm font-medium">
                          Property Type
                        </Label>
                        <Select onValueChange={(value) => handleSelectChange("type", value)} value={formData.type}>
                          <SelectTrigger id="type">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-3">
                        <Label htmlFor="status" className="text-sm font-medium">
                          Listing Status
                        </Label>
                        <Select onValueChange={(value) => handleSelectChange("status", value)} value={formData.status}>
                          <SelectTrigger id="status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="For Sale">For Sale</SelectItem>
                            <SelectItem value="For Rent">For Rent</SelectItem>
                            <SelectItem value="Sold">Sold</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label className="text-sm font-medium">Features</Label>
                      <div className="grid grid-cols-2 gap-2">
                        {features.slice(0, 10).map((feature) => (
                          <div key={feature} className="flex items-center space-x-2">
                            <Checkbox
                              id={`feature-${feature}`}
                              checked={selectedFeatures.includes(feature)}
                              onCheckedChange={() => toggleFeature(feature)}
                              className="data-[state=checked]:bg-blue-600"
                            />
                            <label
                              htmlFor={`feature-${feature}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {feature}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid gap-3">
                      <Label className="text-sm font-medium">Property Images</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-3 bg-blue-50 rounded-full">
                            <Plus className="h-6 w-6 text-blue-500" />
                          </div>
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (max. 5MB)</p>
                          <Input id="images" type="file" className="hidden" accept="image/*" multiple />
                          <Button variant="outline" size="sm" className="mt-2">
                            Select Files
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DrawerFooter className="border-t pt-4">
                  <Button onClick={handleAddListing} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Listing
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>

            <Drawer open={filterOpen} onOpenChange={setFilterOpen}>
              <DrawerTrigger asChild>
                <Button variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filter Properties</DrawerTitle>
                  <DrawerDescription>Refine your search with the following filters</DrawerDescription>
                </DrawerHeader>
                <div className="p-4 space-y-6">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Price Range</h3>
                    <div className="space-y-4">
                      <Slider
                        defaultValue={[0, 1500000]}
                        max={1500000}
                        step={10000}
                        value={priceRange}
                        onValueChange={setPriceRange}
                        className="[&>span]:bg-blue-500"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-sm">${priceRange[0].toLocaleString()}</span>
                        <span className="text-sm">${priceRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Property Type</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {propertyTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <Checkbox
                            id={`type-${type}`}
                            checked={selectedPropertyTypes.includes(type)}
                            onCheckedChange={() => togglePropertyType(type)}
                            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <label
                            htmlFor={`type-${type}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {type}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium mb-2">Features</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {features.slice(0, 10).map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={`filter-feature-${feature}`}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={() => toggleFeature(feature)}
                            className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                          />
                          <label
                            htmlFor={`filter-feature-${feature}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <Button onClick={() => setFilterOpen(false)} className="bg-blue-600 hover:bg-blue-700">
                    Apply Filters
                  </Button>
                  <Button variant="outline" onClick={resetFilters}>
                    Reset Filters
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Search bar */}
        <div className="mt-6 relative">
          <div className="flex">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by location, property type, or keywords..."
                className="pl-10 bg-white text-gray-800 border-0 rounded-l-lg h-12"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="rounded-l-none h-12 px-6 bg-blue-800 hover:bg-blue-900">Search</Button>
          </div>

          {/* Quick filters */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 flex-nowrap">
            <Badge className="bg-white/20 hover:bg-white/30 text-white cursor-pointer whitespace-nowrap">
              Price: Any <ChevronDown className="h-3 w-3 ml-1" />
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white cursor-pointer whitespace-nowrap">
              Beds: Any <ChevronDown className="h-3 w-3 ml-1" />
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white cursor-pointer whitespace-nowrap">
              Baths: Any <ChevronDown className="h-3 w-3 ml-1" />
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white cursor-pointer whitespace-nowrap">
              Property Type <ChevronDown className="h-3 w-3 ml-1" />
            </Badge>
            <Badge className="bg-white/20 hover:bg-white/30 text-white cursor-pointer whitespace-nowrap">
              More Filters <ChevronDown className="h-3 w-3 ml-1" />
            </Badge>
          </div>
        </div>
      </div>

      {/* Main content */}
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              All Properties
            </TabsTrigger>
            <TabsTrigger value="featured" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Featured
            </TabsTrigger>
            <TabsTrigger value="forSale" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              For Sale
            </TabsTrigger>
            <TabsTrigger value="forRent" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              For Rent
            </TabsTrigger>
            <TabsTrigger value="favorites" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              Favorites
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="beds">Most Bedrooms</SelectItem>
                <SelectItem value="size">Largest Size</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-none",
                  viewMode === "grid" && "bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300",
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "rounded-none",
                  viewMode === "list" && "bg-blue-50 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300",
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          {sortedProperties.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProperties.map((property) => (
                  <PropertyListItem
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              title="No properties found"
              description="Try adjusting your search or filters to find what you're looking for."
              icon={<Building className="h-12 w-12 text-gray-400" />}
            />
          )}
        </TabsContent>

        <TabsContent value="featured" className="mt-0">
          {sortedProperties.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProperties.map((property) => (
                  <PropertyListItem
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              title="No featured properties"
              description="Check back later for featured properties."
              icon={<Star className="h-12 w-12 text-gray-400" />}
            />
          )}
        </TabsContent>

        <TabsContent value="forSale" className="mt-0">
          {sortedProperties.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProperties.map((property) => (
                  <PropertyListItem
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              title="No properties for sale"
              description="Check back later for properties available for sale."
              icon={<Home className="h-12 w-12 text-gray-400" />}
            />
          )}
        </TabsContent>

        <TabsContent value="forRent" className="mt-0">
          {sortedProperties.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProperties.map((property) => (
                  <PropertyListItem
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              title="No properties for rent"
              description="Check back later for properties available for rent."
              icon={<Building className="h-12 w-12 text-gray-400" />}
            />
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-0">
          {sortedProperties.length > 0 ? (
            viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedProperties.map((property) => (
                  <PropertyListItem
                    key={property.id}
                    property={property}
                    isFavorite={favorites.includes(property.id)}
                    onToggleFavorite={() => toggleFavorite(property.id)}
                  />
                ))}
              </div>
            )
          ) : (
            <EmptyState
              title="No favorites yet"
              description="Click the heart icon on properties to add them to your favorites."
              icon={<Heart className="h-12 w-12 text-gray-400" />}
            />
          )}
        </TabsContent>
      </Tabs>

      {/* Stats section */}
      <div className="mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-6">Market Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Average Price"
            value="$425,000"
            change="+5.2%"
            icon={<DollarSign className="h-5 w-5 text-green-500" />}
          />
          <StatCard
            title="Listings This Month"
            value="243"
            change="+12%"
            icon={<Calendar className="h-5 w-5 text-blue-500" />}
          />
          <StatCard
            title="Active Buyers"
            value="1,245"
            change="+3.7%"
            icon={<Users className="h-5 w-5 text-purple-500" />}
          />
          <StatCard
            title="Closed Deals"
            value="89"
            change="+7.1%"
            icon={<CheckCircle2 className="h-5 w-5 text-teal-500" />}
          />
        </div>
      </div>

      {/* Featured neighborhoods */}
      <div className="mt-16 mb-8">
        <h2 className="text-2xl font-bold mb-6">Featured Neighborhoods</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <NeighborhoodCard
            name="Downtown"
            properties="124"
            avgPrice="$550,000"
            image="/placeholder.svg?height=150&width=300"
          />
          <NeighborhoodCard
            name="Westside"
            properties="87"
            avgPrice="$720,000"
            image="/placeholder.svg?height=150&width=300"
          />
          <NeighborhoodCard
            name="Riverside"
            properties="56"
            avgPrice="$380,000"
            image="/placeholder.svg?height=150&width=300"
          />
        </div>
      </div>
    </div>
  )
}

// Property Card Component
function PropertyCard({
  property,
  isFavorite,
  onToggleFavorite,
}: {
  property: any
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        <img src={property.image || "/placeholder.svg"} alt={property.title} className="w-full h-48 object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${isFavorite ? "text-red-500" : "text-gray-500"}`}
          onClick={(e) => {
            e.preventDefault()
            onToggleFavorite()
          }}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
        </Button>
        <Badge className="absolute top-2 left-2 bg-blue-600">{property.status}</Badge>
        {property.featured && <Badge className="absolute bottom-2 left-2 bg-amber-500">Featured</Badge>}
      </div>
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold line-clamp-1">
              <Link href={`/real-estate/${property.id}`} className="hover:text-blue-600 transition-colors">
                {property.title}
              </Link>
            </CardTitle>
            <CardDescription className="flex items-center mt-1 text-gray-500">
              <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
              <span className="truncate">{property.location}</span>
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="font-bold text-blue-600">{property.price}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{property.description}</p>
        <div className="flex justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>{property.beds} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>{property.baths} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Badge variant="outline" className="text-xs">
          {property.type}
        </Badge>
        <Button variant="link" className="p-0 h-auto text-blue-600" asChild>
          <Link href={`/real-estate/${property.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

// Property List Item Component
function PropertyListItem({
  property,
  isFavorite,
  onToggleFavorite,
}: {
  property: any
  isFavorite: boolean
  onToggleFavorite: () => void
}) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
        <div className="relative h-64 md:h-auto md:w-1/3">
          <img src={property.image || "/placeholder.svg"} alt={property.title} className="w-full h-full object-cover" />
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${isFavorite ? "text-red-500" : "text-gray-500"}`}
            onClick={(e) => {
              e.preventDefault()
              onToggleFavorite()
            }}
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
          </Button>
          <Badge className="absolute top-2 left-2 bg-blue-600">{property.status}</Badge>
          {property.featured && <Badge className="absolute bottom-2 left-2 bg-amber-500">Featured</Badge>}
        </div>
        <CardContent className="p-4 md:w-2/3">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg font-bold">
                <Link href={`/real-estate/${property.id}`} className="hover:text-blue-600 transition-colors">
                  {property.title}
                </Link>
              </CardTitle>
              <CardDescription className="flex items-center mt-1 text-gray-500">
                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span>{property.location}</span>
              </CardDescription>
            </div>
            <div className="text-right">
              <span className="font-bold text-blue-600">{property.price}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-3 mb-4">{property.description}</p>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1 text-blue-500" />
              <span>{property.beds} Beds</span>
            </div>
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1 text-blue-500" />
              <span>{property.baths} Baths</span>
            </div>
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1 text-blue-500" />
              <span>{property.sqft} sqft</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-4">
            {property.features.slice(0, 4).map((feature: string) => (
              <Badge
                key={feature}
                variant="outline"
                className="text-xs font-normal bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
              >
                {feature}
              </Badge>
            ))}
            {property.features.length > 4 && (
              <Badge
                variant="outline"
                className="text-xs font-normal bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
              >
                +{property.features.length - 4} more
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <div className="flex items-center">
              <Avatar className="h-6 w-6 mr-2">
                <AvatarImage src={property.agent.avatar} alt={property.agent.name} />
                <AvatarFallback>{property.agent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{property.agent.name}</span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
              >
                Contact
              </Button>
              <Button variant="default" size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
                <Link href={`/real-estate/${property.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

// Empty State Component
function EmptyState({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border rounded-lg bg-gray-50">
      <div className="bg-white p-4 rounded-full mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 text-center max-w-md">{description}</p>
    </div>
  )
}

// Stat Card Component
function StatCard({
  title,
  value,
  change,
  icon,
}: {
  title: string
  value: string
  change: string
  icon: React.ReactNode
}) {
  const isPositive = change.startsWith("+")

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="text-2xl font-bold mt-1">{value}</h4>
            <p className={`text-sm mt-1 ${isPositive ? "text-green-600" : "text-red-600"}`}>{change} from last month</p>
          </div>
          <div className="p-3 rounded-full bg-gray-100">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

// Neighborhood Card Component
function NeighborhoodCard({
  name,
  properties,
  avgPrice,
  image,
}: {
  name: string
  properties: string
  avgPrice: string
  image: string
}) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-40">
        <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
          <h3 className="text-xl font-bold text-white">{name}</h3>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-500">Properties</p>
            <p className="font-medium">{properties}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Avg. Price</p>
            <p className="font-medium">{avgPrice}</p>
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4" asChild>
          <Link href="#">View Properties</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

