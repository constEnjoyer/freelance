"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Bed,
  Bath,
  MapPin,
  Square,
  ArrowLeft,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckCircle,
  Phone,
  Mail,
  Globe,
  User,
  MessageSquare,
  Star,
  X,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [showAllPhotos, setShowAllPhotos] = useState(false)

  // This would normally come from an API call using the ID
  const property = {
    id: params.id,
    title: "Detached in Calle Clavel 6",
    price: "289,000€",
    location: "Calle Clavel 6 Torrevieja",
    type: "Detached",
    beds: 4,
    baths: 3,
    size: "128m²",
    sqft: "2,944 sqft",
    floor: "14 floor with lift",
    images: [
      "/placeholder.svg?height=600&width=800",
      "/placeholder.svg?height=600&width=800&text=2",
      "/placeholder.svg?height=600&width=800&text=3",
      "/placeholder.svg?height=600&width=800&text=4",
      "/placeholder.svg?height=600&width=800&text=5",
      "/placeholder.svg?height=600&width=800&text=6",
    ],
    ref: "GC43556",
    exclusive: true,
    description:
      "This beautiful detached villa is located in a quiet residential area, just a short drive from the beach and all amenities. The property features a spacious living room with fireplace, a fully equipped kitchen, 4 bedrooms, 3 bathrooms, and a private pool. The villa also has a large terrace with stunning views of the surrounding area. Perfect as a holiday home or permanent residence.",
    features: [
      "Pool",
      "Garden",
      "Garage",
      "Air Conditioning",
      "Heating",
      "Terrace",
      "Storage",
      "Security System",
      "Parking",
      "Fireplace",
    ],
    agent: {
      name: "John Doe",
      phone: "+34 677 130 650",
      email: "john.doe@realestate.com",
      avatar: "/placeholder.svg?height=64&width=64",
      bio: "John is a Senior Real Estate Consultant with over 10 years of experience in the industry. Specializing in luxury properties and commercial real estate, John has helped hundreds of clients find their dream homes and make smart investment decisions.",
      languages: ["English", "Spanish", "French"],
      reviews: 24,
      rating: 4.9,
    },
    status: "Active",
    createdAt: "2023-05-15",
    lastUpdated: "2023-06-01",
    yearBuilt: 2010,
    energyRating: "B",
    nearbyAmenities: [
      { name: "Beach", distance: "500m" },
      { name: "Supermarket", distance: "300m" },
      { name: "Restaurant", distance: "200m" },
      { name: "School", distance: "1km" },
      { name: "Hospital", distance: "3km" },
    ],
    similarProperties: [
      {
        id: "villa2",
        title: "Luxury Villa with Sea Views",
        price: "1,250,000€",
        location: "Marbella, Spain",
        image: "/placeholder.svg?height=200&width=300",
        beds: 5,
        baths: 4,
        size: "350m²",
      },
      {
        id: "villa3",
        title: "Modern Villa with Private Pool",
        price: "895,000€",
        location: "Ibiza, Spain",
        image: "/placeholder.svg?height=200&width=300",
        beds: 4,
        baths: 3,
        size: "220m²",
      },
      {
        id: "villa4",
        title: "Beachfront Villa in Costa Blanca",
        price: "750,000€",
        location: "Alicante, Spain",
        image: "/placeholder.svg?height=200&width=300",
        beds: 3,
        baths: 2,
        size: "180m²",
      },
    ],
  }

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="container py-8">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
        >
          <Link href="/real-estate">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to listings
          </Link>
        </Button>
        <div className="text-sm text-muted-foreground">
          <span className="mx-2">/</span>
          <Link href="/real-estate" className="hover:text-blue-500">
            Real Estate
          </Link>
          <span className="mx-2">/</span>
          <span>{property.title}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{property.title}</h1>
                  <Badge
                    className={cn(
                      "text-white",
                      property.status === "Active"
                        ? "bg-green-500"
                        : property.status === "Under Offer"
                          ? "bg-amber-500"
                          : "bg-muted",
                    )}
                  >
                    {property.status}
                  </Badge>
                </div>
                <div className="flex items-center mt-1 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                  {property.location}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-blue-500">{property.price}</span>
                <div className="flex gap-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className={cn(
                      "rounded-full border-blue-200 hover:bg-blue-50 dark:border-blue-800 dark:hover:bg-blue-900/50",
                      isFavorite &&
                        "text-red-500 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/30 dark:text-red-300",
                    )}
                    onClick={() => setIsFavorite(!isFavorite)}
                  >
                    <Heart className={cn("h-4 w-4", isFavorite && "fill-red-500")} />
                  </Button>

                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative mb-4 rounded-lg overflow-hidden">
              <div className="relative h-[400px] w-full">
                <img
                  src={property.images[activeImageIndex] || "/placeholder.svg"}
                  alt={`${property.title} - Image ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <Badge className="bg-black/50 text-white backdrop-blur-sm">
                    {activeImageIndex + 1} / {property.images.length}
                  </Badge>
                  {property.exclusive && <Badge className="bg-blue-500 text-white">Exclusive</Badge>}
                </div>

                <Button
                  variant="ghost"
                  className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm hover:bg-white text-sm"
                  onClick={() => setShowAllPhotos(true)}
                >
                  View All Photos
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-6">
              {property.images.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative h-20 rounded-lg overflow-hidden cursor-pointer transition-all",
                    activeImageIndex === index ? "ring-2 ring-blue-500" : "opacity-70 hover:opacity-100",
                  )}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} - Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>

            <Tabs defaultValue="details" className="mb-6">
              <TabsList className="w-full grid grid-cols-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger
                  value="details"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="location"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded"
                >
                  Location
                </TabsTrigger>
                <TabsTrigger
                  value="similar"
                  className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded"
                >
                  Similar
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 mb-6">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Property Type</span>
                        <span className="font-medium">{property.type}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Bedrooms</span>
                        <span className="font-medium">{property.beds}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Bathrooms</span>
                        <span className="font-medium">{property.baths}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Size</span>
                        <span className="font-medium">{property.size}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Floor</span>
                        <span className="font-medium">{property.floor}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Year Built</span>
                        <span className="font-medium">{property.yearBuilt}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Energy Rating</span>
                        <span className="font-medium">{property.energyRating}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Reference</span>
                        <span className="font-medium">{property.ref}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground">Last Updated</span>
                        <span className="font-medium">{property.lastUpdated}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground mb-6">{property.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <Bed className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="text-2xl font-bold">{property.beds}</span>
                        <span className="text-sm text-muted-foreground">Bedrooms</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <Bath className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="text-2xl font-bold">{property.baths}</span>
                        <span className="text-sm text-muted-foreground">Bathrooms</span>
                      </div>
                      <div className="flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                        <Square className="h-8 w-8 mb-2 text-blue-500" />
                        <span className="text-2xl font-bold">{property.size.replace("m²", "")}</span>
                        <span className="text-sm text-muted-foreground">m²</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Property Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <CheckCircle className="h-4 w-4 text-blue-500" />
                          </div>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Location & Nearby</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                      <img
                        src="/placeholder.svg?height=300&width=800&text=Map"
                        alt="Map"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-lg font-semibold mb-4">Nearby Amenities</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {property.nearbyAmenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                            <MapPin className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <div className="font-medium">{amenity.name}</div>
                            <div className="text-sm text-muted-foreground">{amenity.distance}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="similar" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Similar Properties</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {property.similarProperties.map((similar) => (
                        <Link key={similar.id} href={`/real-estate/${similar.id}`} className="block group">
                          <div className="border rounded-lg overflow-hidden hover:shadow-md transition-all">
                            <div className="relative h-40">
                              <img
                                src={similar.image || "/placeholder.svg"}
                                alt={similar.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium text-sm group-hover:text-blue-500 transition-colors line-clamp-1">
                                {similar.title}
                              </h3>
                              <div className="text-blue-500 font-bold">{similar.price}</div>
                              <div className="flex items-center text-xs text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {similar.location}
                              </div>
                              <div className="flex justify-between text-xs mt-2">
                                <span>{similar.beds} beds</span>
                                <span>{similar.baths} baths</span>
                                <span>{similar.size}</span>
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        <div>
          <Card className="sticky top-24 border-blue-100 dark:border-blue-900">
            <CardHeader className="pb-2">
              <CardTitle>Contact Agent</CardTitle>
              <CardDescription>Get in touch about this property</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-16 w-16 border-2 border-white shadow-md">
                  <AvatarImage src={property.agent.avatar} alt={property.agent.name} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                    {property.agent.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{property.agent.name}</h3>
                  <div className="flex items-center text-sm">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < Math.floor(property.agent.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="ml-1 text-xs">
                      {property.agent.rating} ({property.agent.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Phone className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Phone</div>
                    <div className="font-medium">{property.agent.phone}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Mail className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Email</div>
                    <div className="font-medium">{property.agent.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                    <Globe className="h-4 w-4 text-blue-500" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Languages</div>
                    <div className="font-medium">{property.agent.languages.join(", ")}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message</label>
                  <Textarea
                    placeholder="I'm interested in this property..."
                    className="min-h-[100px]"
                    defaultValue={`Hi ${property.agent.name},\n\nI'm interested in the property "${property.title}" (Ref: ${property.ref}). Please contact me with more information.\n\nThank you!`}
                  />
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Agent
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 border-t pt-4">
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Viewing
              </Button>
              <Button
                variant="outline"
                className="w-full border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
              >
                <Phone className="mr-2 h-4 w-4" />
                Call Agent
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Full screen gallery */}
      {showAllPhotos && (
        <div className="fixed inset-0 bg-black z-50 overflow-auto">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-white text-xl font-bold">{property.title} - All Photos</h2>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/10"
              onClick={() => setShowAllPhotos(false)}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="container py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {property.images.map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${property.title} - Image ${index + 1}`}
                    className="w-full h-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

