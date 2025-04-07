"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, Search, Star, Users, Home, CheckCircle, Plus, MapPin, ArrowUpRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all")
  const [selectedLocation, setSelectedLocation] = useState<string>("all")

  const partners = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Real Estate Agent",
      company: "Metropolitan Properties",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4.9,
      reviews: 87,
      followers: 342,
      properties: 24,
      specialties: ["Luxury Homes", "Waterfront", "Investment"],
      location: "New York, NY",
      verified: true,
      bio: "Experienced real estate agent specializing in luxury properties and waterfront homes. Helping clients find their dream homes for over 10 years.",
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Property Developer",
      company: "Rodriguez Development Group",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4.7,
      reviews: 63,
      followers: 215,
      properties: 18,
      specialties: ["Commercial", "Multi-family", "Urban"],
      location: "Miami, FL",
      verified: true,
      bio: "Leading property developer with a focus on sustainable urban development. Creating innovative living spaces for modern communities.",
    },
    {
      id: 3,
      name: "Emma Wilson",
      role: "Interior Designer",
      company: "Wilson Design Studio",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4.8,
      reviews: 92,
      followers: 456,
      properties: 31,
      specialties: ["Modern", "Scandinavian", "Minimalist"],
      location: "Los Angeles, CA",
      verified: false,
      bio: "Award-winning interior designer transforming spaces with modern and Scandinavian influences. Creating beautiful, functional living environments.",
    },
    {
      id: 4,
      name: "David Chen",
      role: "Real Estate Investor",
      company: "Chen Capital Partners",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4.6,
      reviews: 41,
      followers: 189,
      properties: 47,
      specialties: ["Commercial", "Residential", "International"],
      location: "Chicago, IL",
      verified: true,
      bio: "Strategic real estate investor with a diverse portfolio across commercial and residential properties. Focused on long-term growth and value creation.",
    },
    {
      id: 5,
      name: "Olivia Martinez",
      role: "Real Estate Agent",
      company: "Coastal Properties",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4.8,
      reviews: 76,
      followers: 298,
      properties: 32,
      specialties: ["Beachfront", "Vacation Homes", "Luxury"],
      location: "San Diego, CA",
      verified: true,
      bio: "Specializing in beachfront and vacation properties along the California coast. Helping clients find their perfect getaway or investment opportunity.",
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Architect",
      company: "Wilson & Associates",
      avatar: "/placeholder.svg?height=64&width=64",
      rating: 4.9,
      reviews: 58,
      followers: 276,
      properties: 19,
      specialties: ["Modern", "Sustainable", "Custom Homes"],
      location: "Seattle, WA",
      verified: false,
      bio: "Award-winning architect specializing in sustainable and modern design. Creating beautiful, functional spaces that harmonize with the environment.",
    },
  ]

  const specialties = [
    "all",
    "Luxury Homes",
    "Waterfront",
    "Investment",
    "Commercial",
    "Multi-family",
    "Urban",
    "Modern",
    "Scandinavian",
    "Minimalist",
    "Residential",
    "International",
    "Beachfront",
    "Vacation Homes",
    "Sustainable",
    "Custom Homes",
  ]

  const locations = [
    "all",
    "New York, NY",
    "Miami, FL",
    "Los Angeles, CA",
    "Chicago, IL",
    "San Diego, CA",
    "Seattle, WA",
  ]

  const filteredPartners = partners.filter((partner) => {
    // Search query filter
    if (
      searchQuery &&
      !partner.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !partner.role.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !partner.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !partner.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Specialty filter
    if (selectedSpecialty !== "all" && !partner.specialties.includes(selectedSpecialty)) {
      return false
    }

    // Location filter
    if (selectedLocation !== "all" && partner.location !== selectedLocation) {
      return false
    }

    return true
  })

  return (
    <div className="container py-8">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 rounded-lg mb-8 shadow-lg">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Partner</h1>
          <p className="text-blue-100 mb-6">
            Connect with top real estate professionals to help you buy, sell, or design your dream property
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, role, or location..."
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20 focus:border-white/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              <Plus className="mr-2 h-4 w-4" />
              Become a Partner
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Filter Partners</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Specialty</label>
                <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Specialties" />
                  </SelectTrigger>
                  <SelectContent>
                    {specialties.map((specialty) => (
                      <SelectItem key={specialty} value={specialty}>
                        {specialty === "all" ? "All Specialties" : specialty}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Location</label>
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((location) => (
                      <SelectItem key={location} value={location}>
                        {location === "all" ? "All Locations" : location}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Partner Type</label>
                <Tabs defaultValue="all" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="verified">Verified</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedSpecialty("all")
                  setSelectedLocation("all")
                }}
              >
                Reset Filters
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Partner Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "Expand your professional network",
                  "Showcase your properties and services",
                  "Connect with potential clients",
                  "Collaborate on projects",
                  "Access exclusive market insights",
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t pt-4">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                Apply Now
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">
              {filteredPartners.length} {filteredPartners.length === 1 ? "Partner" : "Partners"} Found
            </h2>
            <Select defaultValue="rating">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="followers">Most Followers</SelectItem>
                <SelectItem value="properties">Most Properties</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner) => (
              <Card
                key={partner.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-blue-100 dark:border-blue-900"
              >
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                        <AvatarImage src={partner.avatar} alt={partner.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                          {partner.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{partner.name}</h3>
                          {partner.verified && (
                            <Badge
                              variant="outline"
                              className="bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                            >
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{partner.role}</p>
                        <p className="text-sm text-muted-foreground">{partner.company}</p>
                        <div className="flex items-center mt-1">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${i < Math.floor(partner.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-xs">
                            {partner.rating} ({partner.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-muted-foreground line-clamp-2">{partner.bio}</p>

                    <div className="mt-4 flex flex-wrap gap-1">
                      {partner.specialties.map((specialty) => (
                        <Badge
                          key={specialty}
                          variant="secondary"
                          className="text-xs font-normal bg-blue-50 text-blue-500 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300"
                        >
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-blue-500" />
                        <span>{partner.location}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-blue-500" />
                          <span>{partner.followers}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Home className="h-4 w-4 text-blue-500" />
                          <span>{partner.properties}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex border-t">
                    <Button
                      variant="ghost"
                      className="flex-1 rounded-none py-6 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Follow
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 rounded-none py-6 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Message
                    </Button>
                    <Button
                      variant="ghost"
                      className="flex-1 rounded-none py-6 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                    >
                      <ArrowUpRight className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPartners.length === 0 && (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg border">
              <div className="mb-4">
                <Search className="h-12 w-12 mx-auto text-gray-400" />
              </div>
              <h3 className="text-lg font-medium mb-2">No partners found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any partners matching your search criteria. Try adjusting your filters or search query.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSearchQuery("")
                  setSelectedSpecialty("all")
                  setSelectedLocation("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {filteredPartners.length > 0 && (
            <div className="mt-8 flex justify-center">
              <Button
                variant="outline"
                className="border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
              >
                Load More Partners
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

