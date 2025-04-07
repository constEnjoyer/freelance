"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MapPin, Bed, Bath, Square, ArrowRight } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface Property {
  id: string
  title: string
  price: string
  location: string
  beds: number
  baths: number
  sqft: number
  image: string
  tags?: string[]
  isNew?: boolean
  isPremium?: boolean
}

const recommendedProperties: Property[] = [
  {
    id: "1",
    title: "Modern Downtown Apartment",
    price: "$450,000",
    location: "Downtown, New York",
    beds: 2,
    baths: 2,
    sqft: 1200,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Apartment", "City View"],
    isNew: true,
  },
  {
    id: "2",
    title: "Spacious Family Home",
    price: "$750,000",
    location: "Suburbia, California",
    beds: 4,
    baths: 3,
    sqft: 2500,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["House", "Garden"],
    isPremium: true,
  },
  {
    id: "3",
    title: "Luxury Penthouse",
    price: "$1,250,000",
    location: "Financial District, Chicago",
    beds: 3,
    baths: 3.5,
    sqft: 2800,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Penthouse", "Rooftop"],
    isPremium: true,
  },
  {
    id: "4",
    title: "Cozy Studio Apartment",
    price: "$320,000",
    location: "Arts District, Los Angeles",
    beds: 1,
    baths: 1,
    sqft: 650,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Studio", "Modern"],
    isNew: true,
  },
  {
    id: "5",
    title: "Waterfront Condo",
    price: "$580,000",
    location: "Harbor View, Seattle",
    beds: 2,
    baths: 2,
    sqft: 1450,
    image: "/placeholder.svg?height=200&width=300",
    tags: ["Condo", "Waterfront"],
  },
]

export function PropertyRecommendations() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Recommended for You</h2>
        <Button variant="link" className="flex items-center gap-1 p-0">
          View all <ArrowRight className="h-4 w-4" />
        </Button>
      </div>

      <Carousel className="w-full">
        <CarouselContent>
          {recommendedProperties.map((property) => (
            <CarouselItem key={property.id} className="md:basis-1/2 lg:basis-1/3">
              <PropertyCard property={property} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  )
}

interface PropertyCardProps {
  property: Property
}

function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <Card className="overflow-hidden h-full">
      <div className="relative">
        <img src={property.image || "/placeholder.svg"} alt={property.title} className="w-full h-48 object-cover" />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white rounded-full h-8 w-8"
          onClick={toggleFavorite}
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : ""}`} />
          <span className="sr-only">Add to favorites</span>
        </Button>
        <div className="absolute top-2 left-2 flex gap-1">
          {property.isNew && <Badge className="bg-blue-500 hover:bg-blue-600">New</Badge>}
          {property.isPremium && <Badge className="bg-amber-500 hover:bg-amber-600">Premium</Badge>}
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold line-clamp-1">{property.title}</h3>
          <span className="font-bold text-sm">{property.price}</span>
        </div>
        <div className="flex items-center text-muted-foreground text-xs mb-3">
          <MapPin className="h-3 w-3 mr-1" />
          <span>{property.location}</span>
        </div>
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-1" />
            <span>
              {property.beds} {property.beds === 1 ? "Bed" : "Beds"}
            </span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-1" />
            <span>
              {property.baths} {property.baths === 1 ? "Bath" : "Baths"}
            </span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-1" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-1">
          {property.tags?.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs font-normal">
              {tag}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  )
}

