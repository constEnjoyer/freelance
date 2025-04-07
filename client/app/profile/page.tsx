"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  MessageSquare,
  Mail,
  Phone,
  MapPin,
  Share2,
  Star,
  Calendar,
  Home,
  Users,
  Edit,
  Camera,
  Briefcase,
  Heart,
  ArrowUpRight,
  Clock,
  CheckCircle,
  Globe,
  User,
  Bed,
  Bath,
  Square,
  Filter,
  List,
  Grid,
  Eye,
  Plus,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import Link from "next/link"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("about")
  const [shareDialogOpen, setShareDialogOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterOpen, setFilterOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const stats = [
    { name: "Events", value: 629, icon: Calendar, change: "+12%", trend: "up" },
    { name: "Properties", value: 620, icon: Home, change: "+5%", trend: "up" },
    { name: "Followers", value: 229, icon: Users, change: "+8%", trend: "up" },
  ]

  const skills = [
    { name: "Negotiation", value: 95 },
    { name: "Market Analysis", value: 85 },
    { name: "Client Relations", value: 90 },
    { name: "Property Valuation", value: 80 },
  ]

  const achievements = [
    { name: "Top Seller 2023", icon: Star },
    { name: "5 Years Experience", icon: Briefcase },
    { name: "100+ Properties Sold", icon: Home },
  ]

  const feedItems = [
    {
      id: 1,
      author: {
        name: "Michael Carter",
        role: "Luxury Real Estate Specialist",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "1 hour ago",
      content: "Check out this stunning modern home in the heart of Los Angeles! ✨",
      image: "/placeholder.svg?height=400&width=600",
      property: {
        title: "Modern City Retreat",
        beds: 4,
        baths: 3,
        size: "128m²",
        location: "Los Angeles, CA",
        price: "$3,500,000",
      },
      likes: 24,
      comments: 8,
    },
    {
      id: 2,
      author: {
        name: "Sarah Johnson",
        role: "Real Estate Agent",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "3 hours ago",
      content: "Just closed on this beautiful beachfront property! Congratulations to the new owners! 🎉",
      image: "/placeholder.svg?height=400&width=600",
      property: {
        title: "Beachfront Paradise",
        beds: 5,
        baths: 4,
        size: "250m²",
        location: "Malibu, CA",
        price: "$6,200,000",
      },
      likes: 42,
      comments: 15,
    },
  ]

  const listings = [
    {
      id: "villa1",
      title: "Modern City Retreat",
      price: "$3,500,000",
      location: "Los Angeles, CA",
      type: "Villa",
      beds: 4,
      baths: 3,
      size: "128m²",
      image: "/placeholder.svg?height=400&width=600",
      status: "Active",
      views: 1243,
      favorites: 56,
      inquiries: 12,
      lastUpdated: "2 days ago",
    },
    {
      id: "villa2",
      title: "Beachfront Paradise",
      price: "$6,200,000",
      location: "Malibu, CA",
      type: "Villa",
      beds: 5,
      baths: 4,
      size: "250m²",
      image: "/placeholder.svg?height=400&width=600",
      status: "Active",
      views: 2156,
      favorites: 89,
      inquiries: 24,
      lastUpdated: "1 day ago",
    },
    {
      id: "apartment1",
      title: "Downtown Penthouse",
      price: "$2,800,000",
      location: "New York, NY",
      type: "Apartment",
      beds: 3,
      baths: 2,
      size: "180m²",
      image: "/placeholder.svg?height=400&width=600",
      status: "Under Contract",
      views: 1876,
      favorites: 72,
      inquiries: 18,
      lastUpdated: "5 days ago",
    },
    {
      id: "house1",
      title: "Suburban Family Home",
      price: "$1,200,000",
      location: "San Diego, CA",
      type: "House",
      beds: 4,
      baths: 3,
      size: "210m²",
      image: "/placeholder.svg?height=400&width=600",
      status: "Active",
      views: 987,
      favorites: 43,
      inquiries: 9,
      lastUpdated: "1 week ago",
    },
  ]

  // Analytics data
  const analyticsData = [
    { title: "Profile Views", value: "1,234", change: "+12.5%", trend: "up", icon: Users },
    { title: "Listing Views", value: "5,678", change: "+15.8%", trend: "up", icon: Home },
    { title: "Inquiries", value: "187", change: "+12.3%", trend: "up", icon: MessageSquare },
    { title: "Conversion Rate", value: "3.2%", change: "+5.7%", trend: "up", icon: ArrowUpRight },
  ]

  const handleProfileImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle file upload logic here
    console.log(e.target.files)
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        {/* Left Sidebar */}
        <div>
          <div className="rounded-lg border shadow-sm p-6 card-hover sticky top-24 bg-white dark:bg-gray-950">
            <div className="flex flex-col items-center text-center">
              <div className="relative group">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse-slow blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <Avatar className="h-24 w-24 border-4 border-white dark:border-gray-800 shadow-md relative">
                  <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
                  <AvatarFallback className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                    JD
                  </AvatarFallback>
                </Avatar>
                <button
                  className="absolute bottom-0 right-0 rounded-full bg-blue-500 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-lg hover:bg-blue-600"
                  onClick={handleProfileImageClick}
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">Senior Real Estate Consultant</p>

                <div className="mt-2 flex items-center justify-center">
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-1 text-sm">5.0 (130 reviews)</span>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-500 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" /> Verified
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-500 border-green-200 dark:bg-green-900/30 dark:text-green-300 dark:border-green-800"
                  >
                    <Star className="h-3 w-3 mr-1" /> Top Agent
                  </Badge>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {stats.map((stat) => (
                <div
                  key={stat.name}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/50">
                      <stat.icon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <span className="ml-2">{stat.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-medium">{stat.value}</span>
                    <span className={cn("ml-1 text-xs", stat.trend === "up" ? "text-green-500" : "text-red-500")}>
                      {stat.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                variant="default"
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all"
              >
                <Users className="mr-2 h-4 w-4" />
                Follow
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-4">Professional Skills</h3>
              <div className="space-y-4">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">{skill.name}</span>
                      <span className="text-sm font-medium">{skill.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden dark:bg-gray-800">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.name}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900/50">
                      <achievement.icon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    </div>
                    <span className="ml-2 text-sm">{achievement.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t">
              <h3 className="font-medium mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">johndoe@example.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <Globe className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">johndoe.com</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-sm">Los Angeles, CA</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <Tabs defaultValue="about" className="w-full" onValueChange={setActiveTab} value={activeTab}>
            <div className="bg-white dark:bg-gray-950 p-4 rounded-lg border mb-6 shadow-sm">
              <TabsList className="grid grid-cols-4 gap-4 w-full">
                <TabsTrigger value="about" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  <div className="flex flex-col items-center">
                    <User className="h-4 w-4 mb-1" />
                    <span>About</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger value="feed" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                  <div className="flex flex-col items-center">
                    <MessageSquare className="h-4 w-4 mb-1" />
                    <span>Feed</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="listings"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <div className="flex flex-col items-center">
                    <Home className="h-4 w-4 mb-1" />
                    <span>Listings</span>
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  <div className="flex flex-col items-center">
                    <ArrowUpRight className="h-4 w-4 mb-1" />
                    <span>Analytics</span>
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="about">
              <Card className="border shadow-sm bg-white dark:bg-gray-950">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>About John Doe</CardTitle>
                    <CardDescription>Professional Real Estate Agent with 10+ years of experience</CardDescription>
                  </div>
                  {!editMode ? (
                    <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setEditMode(false)}>
                        Cancel
                      </Button>
                      <Button variant="default" size="sm" onClick={() => setEditMode(false)}>
                        Save Changes
                      </Button>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  {!editMode ? (
                    <div className="space-y-4">
                      <p className="text-muted-foreground">
                        John Doe is a Senior Real Estate Consultant with over 10 years of experience in the industry.
                        Specializing in luxury properties and commercial real estate, John has helped hundreds of
                        clients find their dream homes and make smart investment decisions.
                      </p>
                      <p className="text-muted-foreground">
                        With a deep understanding of market trends and property valuation, John provides exceptional
                        service to both buyers and sellers. His negotiation skills and attention to detail ensure that
                        clients receive the best possible outcomes in their real estate transactions.
                      </p>
                    </div>
                  ) : (
                    <Textarea
                      className="min-h-[150px]"
                      defaultValue="John Doe is a Senior Real Estate Consultant with over 10 years of experience in the industry. Specializing in luxury properties and commercial real estate, John has helped hundreds of clients find their dream homes and make smart investment decisions.

With a deep understanding of market trends and property valuation, John provides exceptional service to both buyers and sellers. His negotiation skills and attention to detail ensure that clients receive the best possible outcomes in their real estate transactions."
                    />
                  )}

                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h2 className="text-xl font-bold mb-4">Contact Details</h2>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-blue-500" />
                            <span>Email</span>
                          </div>
                          {!editMode ? (
                            <span className="text-muted-foreground">johndoe@example.com</span>
                          ) : (
                            <Input className="max-w-[220px]" defaultValue="johndoe@example.com" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Phone className="h-5 w-5 mr-2 text-blue-500" />
                            <span>Phone</span>
                          </div>
                          {!editMode ? (
                            <span className="text-muted-foreground">+1 (555) 123-4567</span>
                          ) : (
                            <Input className="max-w-[220px]" defaultValue="+1 (555) 123-4567" />
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <MapPin className="h-5 w-5 mr-2 text-blue-500" />
                            <span>Office</span>
                          </div>
                          {!editMode ? (
                            <span className="text-muted-foreground">Los Angeles, CA</span>
                          ) : (
                            <Input className="max-w-[220px]" defaultValue="Los Angeles, CA" />
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h2 className="text-xl font-bold mb-4">Specialization</h2>
                      {!editMode ? (
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                            Luxury Properties
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                            Beach Front
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                            Investment
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                            Commercial
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                            Residential
                          </Badge>
                          <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                            International
                          </Badge>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                              Luxury Properties <button className="ml-1">×</button>
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                              Beach Front <button className="ml-1">×</button>
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                              Investment <button className="ml-1">×</button>
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                              Commercial <button className="ml-1">×</button>
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                              Residential <button className="ml-1">×</button>
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-500 hover:bg-blue-200 border-none dark:bg-blue-900/30 dark:text-blue-300">
                              International <button className="ml-1">×</button>
                            </Badge>
                          </div>
                          <div className="flex gap-2">
                            <Input placeholder="Add specialization" className="flex-1" />
                            <Button>Add</Button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">Location</h2>
                    <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src="/placeholder.svg?height=300&width=800&text=Map"
                        alt="Map"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="feed">
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-950 border rounded-lg p-4 mb-6 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <input
                      type="text"
                      placeholder="Share a property or update..."
                      className="w-full text-sm bg-transparent outline-none border-b pb-2 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 justify-start hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                    >
                      <svg
                        className="h-4 w-4 mr-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9 10C10.1046 10 11 9.10457 11 8C11 6.89543 10.1046 6 9 6C7.89543 6 7 6.89543 7 8C7 9.10457 7.89543 10 9 10Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.67004 18.9501L7.60004 15.6401C8.39004 15.1101 9.53004 15.1701 10.24 15.7801L10.57 16.0701C11.35 16.7401 12.61 16.7401 13.39 16.0701L17.55 12.5001C18.33 11.8301 19.59 11.8301 20.37 12.5001L22 13.9001"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Photo
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 justify-start hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                    >
                      <svg
                        className="h-4 w-4 mr-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.53 20.4201H6.21C3.05 20.4201 2 18.3201 2 16.2101V7.79008C2 4.63008 3.05 3.58008 6.21 3.58008H12.53C15.69 3.58008 16.74 4.63008 16.74 7.79008V16.2101C16.74 19.3701 15.68 20.4201 12.53 20.4201Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M19.52 17.0999L16.74 15.1499V8.83989L19.52 6.88989C20.88 5.93989 22 6.51989 22 8.18989V15.8099C22 17.4799 20.88 18.0599 19.52 17.0999Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Video
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 justify-start hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                    >
                      <svg
                        className="h-4 w-4 mr-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2 22H22"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M2.95 22.0001L3 9.97006C3 9.36006 3.29 8.78006 3.77 8.40006L10.77 2.95006C11.49 2.39006 12.5 2.39006 13.23 2.95006L20.23 8.39006C20.72 8.77006 21 9.35006 21 9.97006V22.0001"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.5 11H8.5C7.67 11 7 11.67 7 12.5V22H17V12.5C17 11.67 16.33 11 15.5 11Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Property
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 justify-start hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                    >
                      <svg
                        className="h-4 w-4 mr-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 2V5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 2V5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3.5 9.09H20.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeMiterlimit="10"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Events
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-8 justify-start hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                    >
                      <svg
                        className="h-4 w-4 mr-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19.5 9C19.5 11.3869 18.5518 13.6761 16.864 15.364C15.1761 17.0518 12.8869 18 10.5 18C8.11305 18 5.82387 17.0518 4.13604 15.364C2.44821 13.6761 1.5 11.3869 1.5 9C1.5 6.61305 2.44821 4.32387 4.13604 2.63604C5.82387 0.948211 8.11305 0 10.5 0C12.8869 0 15.1761 0.948211 16.864 2.63604C18.5518 4.32387 19.5 6.61305 19.5 9Z"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.1499 21.1499L16.9999 16.9999"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Request
                    </Button>
                  </div>
                </div>

                {feedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-gray-950 border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4 border-b">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={item.author.avatar} alt={item.author.name} />
                            <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{item.author.name}</h3>
                            <p className="text-xs text-muted-foreground">{item.author.role}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <svg
                                className="h-5 w-5"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M5 10C3.9 10 3 10.9 3 12C3 13.1 3.9 14 5 14C6.1 14 7 13.1 7 12C7 10.9 6.1 10 5 10Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M19 10C17.9 10 17 10.9 17 12C17 13.1 17.9 14 19 14C20.1 14 21 13.1 21 12C21 10.9 20.1 10 19 10Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                                <path
                                  d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
                                  stroke="currentColor"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Save post</DropdownMenuItem>
                            <DropdownMenuItem>Report post</DropdownMenuItem>
                            <DropdownMenuItem>Hide post</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>

                    <div className="p-4">
                      <p className="mb-4">{item.content}</p>
                      <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.property.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                        <h3 className="text-lg font-bold">{item.property.title}</h3>
                        <div className="flex items-center gap-4 text-sm mt-2">
                          <div className="flex items-center">
                            <Bed className="h-4 w-4 mr-1 text-blue-500" />
                            <span>{item.property.beds} bed</span>
                          </div>
                          <div className="flex items-center">
                            <Bath className="h-4 w-4 mr-1 text-blue-500" />
                            <span>{item.property.baths} bath</span>
                          </div>
                          <div className="flex items-center">
                            <Square className="h-4 w-4 mr-1 text-blue-500" />
                            <span>{item.property.size}</span>
                          </div>
                        </div>
                        <div className="flex items-center mt-2">
                          <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                          <span className="text-sm">{item.property.location}</span>
                        </div>
                        <div className="text-xl font-bold mt-2 text-blue-500">{item.property.price}</div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                        >
                          View Property
                        </Button>
                      </div>

                      <div className="flex items-center text-xs text-muted-foreground gap-4">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          <span>{item.comments} comments</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex border-t">
                      <Button
                        variant="ghost"
                        className="flex-1 rounded-none py-2 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Like
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex-1 rounded-none py-2 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Comment
                      </Button>
                      <Button
                        variant="ghost"
                        className="flex-1 rounded-none py-2 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                      >
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="listings">
              <div className="bg-white dark:bg-gray-950 border rounded-lg p-4 mb-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Your Listings</h2>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1 border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                    >
                      <Filter className="h-4 w-4" />
                      Filter
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      className="gap-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Listing
                    </Button>
                  </div>
                </div>

                <div className="flex border rounded-md mb-4">
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

                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {listings.map((listing) => (
                      <Card key={listing.id} className="overflow-hidden hover:shadow-md transition-shadow">
                        <div className="relative">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.title}
                            className="h-48 w-full object-cover"
                          />
                          <Badge
                            className={cn(
                              "absolute top-2 right-2",
                              listing.status === "Active" ? "bg-green-500" : "bg-amber-500",
                            )}
                          >
                            {listing.status}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                            <span className="font-bold text-blue-500">{listing.price}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground text-xs mb-3">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center">
                              <Bed className="h-4 w-4 mr-1 text-blue-500" />
                              <span>{listing.beds} Beds</span>
                            </div>
                            <div className="flex items-center">
                              <Bath className="h-4 w-4 mr-1 text-blue-500" />
                              <span>{listing.baths} Baths</span>
                            </div>
                            <div className="flex items-center">
                              <Square className="h-4 w-4 mr-1 text-blue-500" />
                              <span>{listing.size}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t flex justify-between items-center">
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{listing.views}</span>
                              </div>
                              <div className="flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                <span>{listing.favorites}</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>{listing.inquiries}</span>
                              </div>
                            </div>
                            <Link href={`/real-estate/${listing.id}`} className="text-xs text-blue-500 hover:underline">
                              View Details
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {listings.map((listing) => (
                      <div
                        key={listing.id}
                        className="flex flex-col md:flex-row border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <div className="relative md:w-1/4">
                          <img
                            src={listing.image || "/placeholder.svg"}
                            alt={listing.title}
                            className="h-48 md:h-full w-full object-cover"
                          />
                          <Badge
                            className={cn(
                              "absolute top-2 right-2",
                              listing.status === "Active" ? "bg-green-500" : "bg-amber-500",
                            )}
                          >
                            {listing.status}
                          </Badge>
                        </div>
                        <div className="p-4 flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold">{listing.title}</h3>
                            <span className="font-bold text-blue-500">{listing.price}</span>
                          </div>
                          <div className="flex items-center text-muted-foreground text-xs mb-3">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span>{listing.location}</span>
                          </div>
                          <div className="flex gap-4 text-sm">
                            <div className="flex items-center">
                              <Bed className="h-4 w-4 mr-1 text-blue-500" />
                              <span>{listing.beds} Beds</span>
                            </div>
                            <div className="flex items-center">
                              <Bath className="h-4 w-4 mr-1 text-blue-500" />
                              <span>{listing.baths} Baths</span>
                            </div>
                            <div className="flex items-center">
                              <Square className="h-4 w-4 mr-1 text-blue-500" />
                              <span>{listing.size}</span>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t flex justify-between items-center">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <div className="flex items-center">
                                <Eye className="h-3 w-3 mr-1" />
                                <span>{listing.views} views</span>
                              </div>
                              <div className="flex items-center">
                                <Heart className="h-3 w-3 mr-1" />
                                <span>{listing.favorites} saves</span>
                              </div>
                              <div className="flex items-center">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                <span>{listing.inquiries} inquiries</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>Updated {listing.lastUpdated}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                              >
                                Edit
                              </Button>
                              <Button
                                variant="default"
                                size="sm"
                                className="bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700"
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="border shadow-sm bg-white dark:bg-gray-950">
                <CardHeader>
                  <CardTitle>Performance Analytics</CardTitle>
                  <CardDescription>Track your real estate performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {analyticsData.map((item, index) => (
                      <Card key={index} className="bg-gray-50 dark:bg-gray-900 border-0">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-muted-foreground">{item.title}</p>
                              <h3 className="text-2xl font-bold mt-1">{item.value}</h3>
                            </div>
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                              <item.icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                            </div>
                          </div>
                          <div className="mt-2">
                            <span
                              className={cn(
                                "text-xs font-medium",
                                item.trend === "up" ? "text-green-500" : "text-red-500",
                              )}
                            >
                              {item.change}
                            </span>
                            <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-8">
                    <img
                      src="/placeholder.svg?height=300&width=800&text=Performance+Chart"
                      alt="Performance Chart"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <Card className="border-0 bg-gray-50 dark:bg-gray-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Top Performing Listings</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {listings.slice(0, 3).map((listing, index) => (
                            <div key={listing.id} className="flex items-center gap-3">
                              <div className="font-bold text-muted-foreground w-5">{index + 1}</div>
                              <div className="h-10 w-10 rounded-md overflow-hidden">
                                <img
                                  src={listing.image || "/placeholder.svg"}
                                  alt={listing.title}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{listing.title}</p>
                                <p className="text-xs text-muted-foreground">{listing.views} views</p>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-blue-500">{listing.price}</p>
                                <p className="text-xs text-green-500">+{Math.floor(Math.random() * 20) + 5}%</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-0 bg-gray-50 dark:bg-gray-900">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              action: "New inquiry",
                              property: "Modern City Retreat",
                              time: "2 hours ago",
                              icon: MessageSquare,
                            },
                            {
                              action: "Property viewed",
                              property: "Beachfront Paradise",
                              time: "5 hours ago",
                              icon: Eye,
                            },
                            { action: "Listing saved", property: "Downtown Penthouse", time: "1 day ago", icon: Heart },
                          ].map((activity, index) => (
                            <div key={index} className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                <activity.icon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium">{activity.action}</p>
                                <p className="text-xs text-muted-foreground">{activity.property}</p>
                              </div>
                              <div className="text-xs text-muted-foreground">{activity.time}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter className="border-t">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    View Detailed Analytics
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

