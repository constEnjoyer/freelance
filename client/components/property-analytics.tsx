"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpRight, ArrowDownRight, TrendingUp, Users, Eye, Clock } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  value: string
  description: string
  trend: number
  icon: React.ReactNode
}

function AnalyticsCard({ title, value, description, trend, icon }: AnalyticsCardProps) {
  const isPositive = trend >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1">
          <span className={`text-xs ${isPositive ? "text-green-500" : "text-red-500"} flex items-center`}>
            {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {Math.abs(trend)}%
          </span>
          <CardDescription className="text-xs ml-2">{description}</CardDescription>
        </div>
      </CardContent>
    </Card>
  )
}

export function PropertyAnalytics() {
  const [timeframe, setTimeframe] = useState("week")

  const analyticsData = {
    week: [
      {
        title: "Views",
        value: "1,234",
        description: "vs last week",
        trend: 12.5,
        icon: <Eye className="h-4 w-4" />,
      },
      {
        title: "Inquiries",
        value: "56",
        description: "vs last week",
        trend: 8.2,
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Avg. Time on Page",
        value: "2:45",
        description: "vs last week",
        trend: -3.1,
        icon: <Clock className="h-4 w-4" />,
      },
      {
        title: "Market Trend",
        value: "+5.2%",
        description: "vs last week",
        trend: 5.2,
        icon: <TrendingUp className="h-4 w-4" />,
      },
    ],
    month: [
      {
        title: "Views",
        value: "5,678",
        description: "vs last month",
        trend: 15.8,
        icon: <Eye className="h-4 w-4" />,
      },
      {
        title: "Inquiries",
        value: "187",
        description: "vs last month",
        trend: 12.3,
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Avg. Time on Page",
        value: "3:12",
        description: "vs last month",
        trend: 5.7,
        icon: <Clock className="h-4 w-4" />,
      },
      {
        title: "Market Trend",
        value: "+8.7%",
        description: "vs last month",
        trend: 8.7,
        icon: <TrendingUp className="h-4 w-4" />,
      },
    ],
    year: [
      {
        title: "Views",
        value: "42,567",
        description: "vs last year",
        trend: 32.1,
        icon: <Eye className="h-4 w-4" />,
      },
      {
        title: "Inquiries",
        value: "1,245",
        description: "vs last year",
        trend: 24.5,
        icon: <Users className="h-4 w-4" />,
      },
      {
        title: "Avg. Time on Page",
        value: "3:45",
        description: "vs last year",
        trend: 12.8,
        icon: <Clock className="h-4 w-4" />,
      },
      {
        title: "Market Trend",
        value: "+15.3%",
        description: "vs last year",
        trend: 15.3,
        icon: <TrendingUp className="h-4 w-4" />,
      },
    ],
  }

  const handleTimeframeChange = (value: string) => {
    setTimeframe(value)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Property Analytics</h2>
        <Tabs defaultValue="week" onValueChange={handleTimeframeChange}>
          <TabsList>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
            <TabsTrigger value="year">Year</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsData[timeframe as keyof typeof analyticsData].map((item, index) => (
          <AnalyticsCard
            key={index}
            title={item.title}
            value={item.value}
            description={item.description}
            trend={item.trend}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  )
}

