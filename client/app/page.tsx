"use client"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  Building,
  ChevronRight,
  MessageSquare,
  Share2,
  User,
  Users,
  ArrowUpRight,
  Star,
  Calendar,
  Home,
  Bell,
  Eye,
  Heart,
  Briefcase,
  TrendingUp,
  MapPin,
  Clock,
  CheckCircle,
  Plus,
  Bed,
  Bath,
  Square,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

export default function HomePage() {
  const stats = [
    { name: "Profile visits", value: 229, change: "+12%", trend: "up" },
    { name: "Post impressions", value: 22975, change: "+8.5%", trend: "up" },
    { name: "Active listings", value: 16, change: "+3", trend: "up" },
  ]

  const activities = [
    {
      id: 1,
      type: "listing",
      user: "Emily Watson",
      content: "listed a new property in Malibu",
      time: "2 hours ago",
      icon: User,
    },
    {
      id: 2,
      type: "price_change",
      user: "Downtown penthouse",
      content: "price reduced by $150,000",
      time: "2 hours ago",
      icon: Building,
    },
    {
      id: 3,
      type: "team",
      user: "James Wilson",
      content: "joined a team at metropolitan properties",
      time: "2 hours ago",
      icon: Users,
    },
  ]

  const marketTrends = [
    { name: "Downtown Condos", value: "+5.2%", trend: "up" },
    { name: "Suburban Houses", value: "-1.8%", trend: "down" },
    { name: "Beachfront Properties", value: "+7.3%", trend: "up" },
    { name: "Commercial Spaces", value: "-0.5%", trend: "down" },
  ]

  const upcomingEvents = [
    {
      id: 1,
      title: "Real Estate Summit 2025",
      location: "Convention Center",
      month: "MAY",
      day: "15",
    },
    {
      id: 2,
      title: "Property Investment Workshop",
      location: "Virtual Event",
      month: "JUN",
      day: "03",
    },
    {
      id: 3,
      title: "Networking Mixer",
      location: "Downtown Hotel",
      month: "JUN",
      day: "22",
    },
  ]

  const marketUpdates = [
    {
      id: 1,
      title: "Amsterdam housing prices up 5.2%",
      discussions: 1542,
    },
    {
      id: 2,
      title: "New mortgage regulations announced",
      discussions: 893,
    },
    {
      id: 3,
      title: "Commercial real estate outlook 2023",
      discussions: 627,
    },
  ]

  const feeds = [
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
        price: "$3,500,000",
        beds: 4,
        baths: 3,
        size: "128m²",
        location: "Los Angeles, CA",
      },
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
        price: "$6,200,000",
        beds: 5,
        baths: 4,
        size: "250m²",
        location: "Malibu, CA",
      },
    },
    {
      id: 3,
      author: {
        name: "David Chen",
        role: "Commercial Real Estate Agent",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "5 hours ago",
      content: "New commercial property just listed in the downtown business district. Perfect for a growing company!",
      image: "/placeholder.svg?height=400&width=600",
      property: {
        title: "Downtown Office Space",
        price: "$1,800,000",
        size: "350m²",
        location: "Downtown, Business District",
      },
    },
    {
      id: 4,
      author: {
        name: "Emma Wilson",
        role: "Luxury Property Specialist",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "Yesterday",
      content: "This penthouse with panoramic city views just hit the market! Schedule a viewing today.",
      image: "/placeholder.svg?height=400&width=600",
      property: {
        title: "Luxury Penthouse",
        price: "$4,500,000",
        beds: 3,
        baths: 3.5,
        size: "280m²",
        location: "Skyline Tower, City Center",
      },
    },
    {
      id: 5,
      author: {
        name: "Robert Taylor",
        role: "Investment Property Advisor",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "2 days ago",
      content:
        "Great investment opportunity! Multi-family property with positive cash flow in an up-and-coming neighborhood.",
      image: "/placeholder.svg?height=400&width=600",
      property: {
        title: "Multi-Family Investment",
        price: "$2,100,000",
        beds: 8,
        baths: 6,
        size: "420m²",
        location: "Growth District, Metro Area",
      },
    },
    {
      id: 6,
      author: {
        name: "Jennifer Lopez",
        role: "Vacation Property Specialist",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      time: "3 days ago",
      content: "Dreaming of a vacation home? This beachfront cottage is perfect for weekend getaways!",
      image: "/placeholder.svg?height=400&width=600",
      property: {
        title: "Beachfront Cottage",
        price: "$950,000",
        beds: 2,
        baths: 2,
        size: "110m²",
        location: "Coastal Village, Oceanside",
      },
    },
  ]

  const performanceMetrics = [
    { title: "Listings Views", value: 1243, change: "+12.5%", trend: "up", icon: Eye },
    { title: "Inquiries", value: 56, change: "+8.3%", trend: "up", icon: MessageSquare },
    { title: "Saved Properties", value: 89, change: "+15.2%", trend: "up", icon: Heart },
    { title: "Conversion Rate", value: "4.2%", change: "+2.1%", trend: "up", icon: TrendingUp },
  ]

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="container py-6">
      {/* Welcome Banner */}
      <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl font-bold mb-2">Welcome to your Real Estate Dashboard</h1>
            <p className="text-blue-100">Track your properties, connect with partners, and grow your business</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
              <Plus className="mr-2 h-4 w-4" />
              Add Listing
            </Button>
            <Button className="bg-white text-blue-600 hover:bg-blue-50">
              <ArrowUpRight className="mr-2 h-4 w-4" />
              Explore Market
            </Button>
          </div>
        </div>
      </div>

      {/* Main content with fixed height container */}
      <div className="h-[calc(100vh-200px)] overflow-hidden">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Left Sidebar - Fixed */}
          <div className="col-span-12 md:col-span-3 h-full overflow-y-auto pr-2">
            <Card className="overflow-hidden border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-600/20"></div>
                  <div className="flex flex-col items-center text-center p-6 relative">
                    <div className="absolute top-0 right-0 p-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm text-blue-500"
                      >
                        <Bell className="h-4 w-4" />
                      </Button>
                    </div>
                    <Avatar className="h-16 w-16 mb-3 border-2 border-white shadow-md">
                      <AvatarImage src="/placeholder.svg?height=64&width=64" alt="John Doe" />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <h2 className="font-semibold text-lg">John Doe</h2>
                    <p className="text-sm text-muted-foreground">Senior Real Estate Consultant</p>
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-1 text-xs">5.0 (130 reviews)</span>
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

                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-900">
                  {stats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between py-1.5">
                      <span className="text-sm">{stat.name}</span>
                      <div className="flex items-center">
                        <span className="font-medium">{stat.value.toLocaleString()}</span>
                        <span className={cn("ml-1 text-xs", stat.trend === "up" ? "text-green-500" : "text-red-500")}>
                          {stat.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-4 pb-4 pt-2">
                  <Button
                    variant="outline"
                    className="w-full border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                    size="sm"
                    asChild
                  >
                    <Link href="/profile">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6 border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-blue-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                    >
                      <div className="mt-0.5 flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <activity.icon className="h-4 w-4 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm leading-tight">
                          <span className="font-medium">{activity.user}</span> {activity.content}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                >
                  View All Activity
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6 border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                  Market Trends
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {marketTrends.map((trend, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <span className="text-sm">{trend.name}</span>
                    <span
                      className={cn("font-medium text-sm", trend.trend === "up" ? "text-green-600" : "text-red-600")}
                    >
                      {trend.value}
                    </span>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                >
                  View Market Analysis
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Middle Content - Feed with scrollable content */}
          <div className="col-span-12 md:col-span-6 h-full overflow-y-auto pr-2">
            <Card className="mb-6 border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div>
                  <h2 className="text-xl font-bold mb-3 flex items-center">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Hello, John Doe!
                    </span>
                    <Badge className="ml-2 bg-blue-100 text-blue-500 dark:bg-blue-900/30 dark:text-blue-300">
                      Premium
                    </Badge>
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    Welcome back to your real estate dashboard. You have{" "}
                    <Link href="#" className="text-blue-500 hover:underline font-medium">
                      3 new messages
                    </Link>{" "}
                    and{" "}
                    <Link href="#" className="text-blue-500 hover:underline font-medium">
                      5 new leads
                    </Link>
                    .
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="space-y-1 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium flex items-center">
                        <Home className="h-4 w-4 mr-1 text-blue-500" />
                        Your Listings
                      </h3>
                      <Badge className="font-normal text-xs bg-blue-500">16 active</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      You have 16 active listings with 342 total views this week
                    </p>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Views Progress</span>
                        <span>68%</span>
                      </div>
                      <Progress
                        value={68}
                        className="h-1.5 bg-blue-100 dark:bg-blue-900 bg-gradient-to-r from-blue-500 to-purple-600"
                      />
                    </div>
                    <Link href="/real-estate" className="text-blue-500 hover:underline text-xs flex items-center mt-2">
                      Manage Listings <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>

                  <div className="space-y-1 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium flex items-center">
                        <Users className="h-4 w-4 mr-1 text-purple-500" />
                        Activity
                      </h3>
                      <Badge className="font-normal text-xs bg-purple-500">24h</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      3 new inquiries and 5 new property views in the last 24 hours
                    </p>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Response Rate</span>
                        <span>92%</span>
                      </div>
                      <Progress
                        value={92}
                        className="h-1.5 bg-purple-100 dark:bg-purple-900 bg-gradient-to-r from-purple-500 to-pink-600"
                      />
                    </div>
                    <Link href="#" className="text-purple-500 hover:underline text-xs flex items-center mt-2">
                      View activity <ChevronRight className="h-3 w-3 ml-1" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-6">
              <Tabs defaultValue="feed" className="w-full">
                <TabsList className="w-full bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                  <TabsTrigger
                    value="feed"
                    className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded"
                  >
                    Feed
                  </TabsTrigger>
                  <TabsTrigger
                    value="performance"
                    className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded"
                  >
                    Performance
                  </TabsTrigger>
                  <TabsTrigger
                    value="recommendations"
                    className="flex-1 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-950 data-[state=active]:shadow-sm rounded"
                  >
                    Recommendations
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="feed" className="mt-4 space-y-4">
                  <div className="bg-white dark:bg-gray-950 border rounded-lg p-4 shadow-sm">
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

                  {feeds.map((feed) => (
                    <Card
                      key={feed.id}
                      className="overflow-hidden border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="p-4 border-b">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={feed.author.avatar} alt={feed.author.name} />
                              <AvatarFallback>{feed.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-medium">{feed.author.name}</h3>
                              <p className="text-xs text-muted-foreground">{feed.author.role}</p>
                              <p className="text-xs text-muted-foreground">{feed.time}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                          >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                        </div>
                      </div>

                      <div className="p-4">
                        <p className="text-sm mb-4">{feed.content}</p>
                        <div className="relative h-64 w-full mb-4 rounded-lg overflow-hidden">
                          <img
                            src={feed.image || "/placeholder.svg"}
                            alt="Property"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="mb-4 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                          <h3 className="text-lg font-bold">{feed.property.title}</h3>
                          <div className="flex items-center gap-4 text-sm mt-2">
                            {feed.property.beds && (
                              <div className="flex items-center">
                                <Bed className="h-4 w-4 mr-1 text-blue-500" />
                                <span>{feed.property.beds} bed</span>
                              </div>
                            )}
                            {feed.property.baths && (
                              <div className="flex items-center">
                                <Bath className="h-4 w-4 mr-1 text-blue-500" />
                                <span>{feed.property.baths} bath</span>
                              </div>
                            )}
                            {feed.property.size && (
                              <div className="flex items-center">
                                <Square className="h-4 w-4 mr-1 text-blue-500" />
                                <span>{feed.property.size}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center mt-2">
                            <MapPin className="h-4 w-4 mr-1 text-blue-500" />
                            <span className="text-sm">{feed.property.location}</span>
                          </div>
                          <div className="text-xl font-bold mt-2 text-blue-500">{feed.property.price}</div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                          >
                            View Property
                          </Button>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-4 border-t pt-4">
                          <Button
                            variant="ghost"
                            className="text-sm h-9 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            Like
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-sm h-9 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Comment
                          </Button>
                          <Button
                            variant="ghost"
                            className="text-sm h-9 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                          >
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="performance" className="mt-4">
                  <Card className="border-blue-100 dark:border-blue-900 shadow-sm">
                    <CardHeader>
                      <CardTitle>Performance Metrics</CardTitle>
                      <CardDescription>Track your real estate performance over time</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        {performanceMetrics.map((metric, index) => (
                          <Card key={index} className="bg-gray-50 dark:bg-gray-900 border-0">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                                  <h3 className="text-2xl font-bold mt-1">{metric.value}</h3>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                  <metric.icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                                </div>
                              </div>
                              <div className="mt-2">
                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    metric.trend === "up" ? "text-green-500" : "text-red-500",
                                  )}
                                >
                                  {metric.change}
                                </span>
                                <span className="text-xs text-muted-foreground ml-1">vs last month</span>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>

                      <div className="h-[300px] w-full bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-6">
                        <img
                          src="/placeholder.svg?height=300&width=800&text=Performance+Chart"
                          alt="Performance Chart"
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                      >
                        View Detailed Analytics
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="recommendations" className="mt-4">
                  <Card className="border-blue-100 dark:border-blue-900 shadow-sm">
                    <CardHeader>
                      <CardTitle>Recommended Actions</CardTitle>
                      <CardDescription>Suggestions to improve your real estate business</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[
                          {
                            title: "Complete your profile",
                            description: "Add more details to increase visibility",
                            icon: User,
                            action: "Update Profile",
                          },
                          {
                            title: "Add virtual tours",
                            description: "Properties with virtual tours get 30% more views",
                            icon: Eye,
                            action: "Add Tours",
                          },
                          {
                            title: "Respond to inquiries",
                            description: "You have 3 unanswered inquiries",
                            icon: MessageSquare,
                            action: "View Inquiries",
                          },
                          {
                            title: "Update listing prices",
                            description: "Some of your listings may be overpriced",
                            icon: Home,
                            action: "Review Listings",
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-4 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                          >
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                              <item.icon className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{item.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                            >
                              {item.action}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Sidebar - Fixed */}
          <div className="col-span-12 md:col-span-3 h-full overflow-y-auto pl-2">
            <Card className="border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center gap-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg p-2 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center min-w-[42px] h-12 rounded border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30">
                      <span className="text-xs text-blue-500">{event.month}</span>
                      <span className="font-semibold text-sm">{event.day}</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">{event.title}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Building className="h-3 w-3" /> {event.location}
                      </p>
                    </div>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                >
                  View All Events
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6 border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                  Market Update
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                {marketUpdates.map((update) => (
                  <div
                    key={update.id}
                    className="py-3 border-b last:border-0 hover:bg-gray-50 dark:hover:bg-gray-900 rounded-lg p-2 transition-colors"
                  >
                    <h3 className="text-sm font-medium mb-1">{update.title}</h3>
                    <p className="text-xs text-muted-foreground">{update.discussions} professionals discussing</p>
                  </div>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full mt-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                >
                  View All Updates
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="mt-6 border-blue-100 dark:border-blue-900 shadow-sm hover:shadow-md transition-all duration-300">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium flex items-center">
                  <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Listing
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Find Partners
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-blue-200 text-blue-500 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-900/50"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Schedule
                  </Button>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <h3 className="text-sm font-medium mb-2">Quick Links</h3>
                  <div className="space-y-2">
                    <Link href="/profile" className="flex items-center text-sm text-blue-500 hover:underline">
                      <User className="h-4 w-4 mr-2" />
                      View Profile
                    </Link>
                    <Link href="/real-estate" className="flex items-center text-sm text-blue-500 hover:underline">
                      <Home className="h-4 w-4 mr-2" />
                      Manage Listings
                    </Link>
                    <Link href="/partners" className="flex items-center text-sm text-blue-500 hover:underline">
                      <Users className="h-4 w-4 mr-2" />
                      Find Partners
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

