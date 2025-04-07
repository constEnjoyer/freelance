"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Share2, MoreHorizontal, ThumbsUp, Bookmark, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ActivityItem {
  id: string
  type: "listing" | "comment" | "like" | "follow" | "sale"
  user: {
    name: string
    avatar: string
    role?: string
  }
  timestamp: string
  content: string
  image?: string
  likes: number
  comments: number
  shares: number
  property?: {
    title: string
    price: string
    location: string
    image: string
    badges?: string[]
  }
}

const activityData: ActivityItem[] = [
  {
    id: "1",
    type: "listing",
    user: {
      name: "Alex Morgan",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Real Estate Agent",
    },
    timestamp: "2 hours ago",
    content: "Just listed this amazing property in downtown! Perfect for young professionals.",
    image: "/placeholder.svg?height=200&width=400",
    likes: 24,
    comments: 5,
    shares: 2,
    property: {
      title: "Modern Downtown Apartment",
      price: "$450,000",
      location: "Downtown, New York",
      image: "/placeholder.svg?height=80&width=80",
      badges: ["New", "Premium"],
    },
  },
  {
    id: "2",
    type: "comment",
    user: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "5 hours ago",
    content: "I've been looking for properties in this area for months. The market is really competitive!",
    likes: 12,
    comments: 3,
    shares: 0,
  },
  {
    id: "3",
    type: "sale",
    user: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Real Estate Agent",
    },
    timestamp: "1 day ago",
    content: "Just closed on this beautiful family home! Congratulations to the new owners!",
    image: "/placeholder.svg?height=200&width=400",
    likes: 56,
    comments: 8,
    shares: 4,
    property: {
      title: "Spacious Family Home",
      price: "$750,000",
      location: "Suburbia, California",
      image: "/placeholder.svg?height=80&width=80",
    },
  },
  {
    id: "4",
    type: "follow",
    user: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    timestamp: "2 days ago",
    content: "Started following Real Estate Trends",
    likes: 8,
    comments: 0,
    shares: 0,
  },
]

export function ActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(activityData)

  const handleLike = (id: string) => {
    setActivities((prev) => prev.map((item) => (item.id === id ? { ...item, likes: item.likes + 1 } : item)))
  }

  const handleSave = (id: string) => {
    // Implementation for saving an activity
    console.log("Saved activity", id)
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="listings">Listings</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} onLike={handleLike} onSave={handleSave} />
          ))}
        </TabsContent>

        <TabsContent value="listings" className="space-y-4">
          {activities
            .filter((a) => a.type === "listing" || a.type === "sale")
            .map((activity) => (
              <ActivityCard key={activity.id} activity={activity} onLike={handleLike} onSave={handleSave} />
            ))}
        </TabsContent>

        <TabsContent value="network" className="space-y-4">
          {activities
            .filter((a) => a.type === "follow" || a.type === "comment")
            .map((activity) => (
              <ActivityCard key={activity.id} activity={activity} onLike={handleLike} onSave={handleSave} />
            ))}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="text-center py-8">
            <p className="text-muted-foreground">No saved activities yet</p>
            <p className="text-sm text-muted-foreground mt-2">Items you save will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ActivityCardProps {
  activity: ActivityItem
  onLike: (id: string) => void
  onSave: (id: string) => void
}

function ActivityCard({ activity, onLike, onSave }: ActivityCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleLikeClick = () => {
    if (!isLiked) {
      onLike(activity.id)
      setIsLiked(true)
    }
  }

  const handleSaveClick = () => {
    onSave(activity.id)
    setIsSaved(!isSaved)
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base font-medium">{activity.user.name}</CardTitle>
                {activity.user.role && (
                  <Badge variant="outline" className="text-xs font-normal">
                    {activity.user.role}
                  </Badge>
                )}
              </div>
              <CardDescription className="text-xs">{activity.timestamp}</CardDescription>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Hide this post</DropdownMenuItem>
              <DropdownMenuItem>Report</DropdownMenuItem>
              <DropdownMenuItem>Copy link</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="text-sm mb-3">{activity.content}</p>

        {activity.image && (
          <div className="relative rounded-md overflow-hidden mb-3">
            <img
              src={activity.image || "/placeholder.svg"}
              alt="Activity content"
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {activity.property && (
          <div className="bg-muted/30 rounded-md p-3 flex items-center gap-3 mb-3">
            <img
              src={activity.property.image || "/placeholder.svg"}
              alt={activity.property.title}
              className="w-16 h-16 rounded-md object-cover"
            />
            <div className="flex-1">
              <h4 className="font-medium text-sm">{activity.property.title}</h4>
              <p className="text-sm font-semibold">{activity.property.price}</p>
              <p className="text-xs text-muted-foreground">{activity.property.location}</p>
            </div>
            {activity.property.badges && (
              <div className="flex flex-col gap-1">
                {activity.property.badges.map((badge) => (
                  <Badge key={badge} variant="secondary" className="text-xs">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center text-xs text-muted-foreground gap-4">
          <div className="flex items-center gap-1">
            <ThumbsUp className="h-3 w-3" />
            <span>{activity.likes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="h-3 w-3" />
            <span>{activity.comments} comments</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{Math.floor(Math.random() * 100) + 50} views</span>
          </div>
        </div>
      </CardContent>
      <Separator />
      <CardFooter className="p-2 flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 ${isLiked ? "text-blue-500" : ""}`}
          onClick={handleLikeClick}
        >
          <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
          Like
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          <MessageCircle className="h-4 w-4 mr-2" />
          Comment
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`flex-1 ${isSaved ? "text-blue-500" : ""}`}
          onClick={handleSaveClick}
        >
          <Bookmark className={`h-4 w-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
          Save
        </Button>
      </CardFooter>
    </Card>
  )
}

