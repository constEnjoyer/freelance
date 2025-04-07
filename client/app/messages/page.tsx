"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Search,
  Phone,
  Video,
  Info,
  MoreHorizontal,
  ImageIcon,
  File,
  Smile,
  Paperclip,
  Send,
  Plus,
  Users,
  UserPlus,
  MessageSquare,
  User,
  Settings,
  Bell,
  Filter,
  X,
  Check,
  Mic,
  Camera,
  ChevronRight,
  MoreVertical,
  Star,
  Clock,
  Calendar,
  Eye,
  MapPin,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

// Types
interface Contact {
  id: string
  name: string
  avatar: string
  status: "online" | "offline" | "away" | "busy"
  lastSeen?: string
  unreadCount?: number
  isTyping?: boolean
  isFriend: boolean
  bio?: string
  role?: string
}

interface Message {
  id: string
  senderId: string
  text: string
  timestamp: string
  attachments?: {
    type: "image" | "file" | "audio" | "video"
    url: string
    name?: string
    duration?: string
    size?: string
  }[]
  status: "sent" | "delivered" | "read"
  reactions?: {
    type: "❤️" | "👍" | "😂" | "😮" | "😢" | "🔥"
    users: string[]
  }[]
  replyTo?: {
    id: string
    text: string
    senderId: string
  }
}

interface ChatGroup {
  id: string
  name: string
  avatar: string
  members: string[]
  lastMessage?: string
  lastMessageTime?: string
  unreadCount?: number
  description?: string
}

// Sample data
const contacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Active now",
    unreadCount: 3,
    isFriend: true,
    role: "Real Estate Agent",
    bio: "Luxury property specialist with 10+ years of experience in high-end real estate markets.",
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Active now",
    isTyping: true,
    isFriend: true,
    role: "Property Developer",
    bio: "Building sustainable urban spaces for modern communities.",
  },
  {
    id: "3",
    name: "Emma Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "away",
    lastSeen: "20m ago",
    isFriend: true,
    role: "Interior Designer",
    bio: "Creating beautiful, functional living environments with modern influences.",
  },
  {
    id: "4",
    name: "David Chen",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "busy",
    lastSeen: "1h ago",
    isFriend: true,
    role: "Real Estate Investor",
    bio: "Strategic investor with a diverse portfolio across commercial and residential properties.",
  },
  {
    id: "5",
    name: "Olivia Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "3h ago",
    isFriend: true,
    role: "Real Estate Agent",
    bio: "Specializing in beachfront and vacation properties along the California coast.",
  },
  {
    id: "6",
    name: "James Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Active now",
    isFriend: false,
    role: "Architect",
    bio: "Award-winning architect specializing in sustainable and modern design.",
  },
  {
    id: "7",
    name: "Sophia Lee",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "online",
    lastSeen: "Active now",
    isFriend: false,
    role: "Property Manager",
    bio: "Experienced property manager with a focus on client satisfaction and efficient operations.",
  },
  {
    id: "8",
    name: "Benjamin Taylor",
    avatar: "/placeholder.svg?height=40&width=40",
    status: "offline",
    lastSeen: "2d ago",
    isFriend: false,
    role: "Mortgage Broker",
    bio: "Helping clients find the best financing solutions for their real estate investments.",
  },
]

const chatGroups: ChatGroup[] = [
  {
    id: "g1",
    name: "Real Estate Agents",
    avatar: "/placeholder.svg?height=40&width=40&text=RE",
    members: ["1", "2", "3"],
    lastMessage: "When is the next meeting?",
    lastMessageTime: "10:45 AM",
    unreadCount: 2,
    description: "A group for real estate professionals to share market insights and opportunities.",
  },
  {
    id: "g2",
    name: "Property Investors",
    avatar: "/placeholder.svg?height=40&width=40&text=PI",
    members: ["1", "4", "5"],
    lastMessage: "Check out this new listing",
    lastMessageTime: "Yesterday",
    description: "Discussion group for property investment strategies and market analysis.",
  },
  {
    id: "g3",
    name: "Downtown Properties",
    avatar: "/placeholder.svg?height=40&width=40&text=DP",
    members: ["2", "3", "4"],
    lastMessage: "Market analysis is ready",
    lastMessageTime: "2 days ago",
    description: "Focused on downtown real estate developments and opportunities.",
  },
]

const messageHistory: Record<string, Message[]> = {
  "1": [
    {
      id: "m1",
      senderId: "1",
      text: "Hi there! I saw your listing for the downtown apartment.",
      timestamp: "10:30 AM",
      status: "read",
    },
    {
      id: "m2",
      senderId: "current-user",
      text: "Hello Sarah! Yes, it's still available. Are you interested in viewing it?",
      timestamp: "10:32 AM",
      status: "read",
    },
    {
      id: "m3",
      senderId: "1",
      text: "Definitely! When would be a good time to schedule a viewing?",
      timestamp: "10:35 AM",
      status: "read",
      reactions: [
        {
          type: "👍",
          users: ["current-user"],
        },
      ],
    },
    {
      id: "m4",
      senderId: "current-user",
      text: "I have availability tomorrow afternoon or Friday morning. What works for you?",
      timestamp: "10:36 AM",
      status: "read",
    },
    {
      id: "m5",
      senderId: "1",
      text: "Tomorrow afternoon would be perfect! Around 2 PM?",
      timestamp: "10:40 AM",
      status: "read",
    },
    {
      id: "m6",
      senderId: "1",
      text: "Also, could you send me some more photos of the kitchen and bathroom?",
      timestamp: "10:41 AM",
      status: "delivered",
    },
    {
      id: "m7",
      senderId: "current-user",
      text: "2 PM works great! I'll add it to my calendar.",
      timestamp: "10:45 AM",
      status: "delivered",
      replyTo: {
        id: "m5",
        text: "Tomorrow afternoon would be perfect! Around 2 PM?",
        senderId: "1",
      },
    },
    {
      id: "m8",
      senderId: "current-user",
      text: "Here are some additional photos of the kitchen and bathroom:",
      timestamp: "10:46 AM",
      attachments: [
        {
          type: "image",
          url: "/placeholder.svg?height=200&width=300&text=Kitchen",
        },
        {
          type: "image",
          url: "/placeholder.svg?height=200&width=300&text=Bathroom",
        },
      ],
      status: "sent",
    },
  ],
  "2": [
    {
      id: "m1",
      senderId: "2",
      text: "Hey, do you have time to discuss the new property listing?",
      timestamp: "9:15 AM",
      status: "read",
    },
    {
      id: "m2",
      senderId: "current-user",
      text: "Sure, what's on your mind?",
      timestamp: "9:20 AM",
      status: "read",
    },
    {
      id: "m3",
      senderId: "2",
      text: "I think we should adjust the pricing strategy. The market has been shifting.",
      timestamp: "9:22 AM",
      status: "read",
      reactions: [
        {
          type: "🔥",
          users: ["current-user"],
        },
      ],
    },
    {
      id: "m4",
      senderId: "2",
      text: "I've prepared a market analysis report. Take a look when you have a chance.",
      timestamp: "9:23 AM",
      attachments: [
        {
          type: "file",
          url: "#",
          name: "Market_Analysis_Q2_2023.pdf",
          size: "2.4 MB",
        },
      ],
      status: "read",
    },
    {
      id: "m5",
      senderId: "2",
      text: "Also, I recorded a quick voice note explaining the key findings.",
      timestamp: "9:25 AM",
      attachments: [
        {
          type: "audio",
          url: "#",
          name: "Voice Note",
          duration: "0:48",
        },
      ],
      status: "read",
    },
  ],
  g1: [
    {
      id: "m1",
      senderId: "1",
      text: "Good morning everyone! Just a reminder about our weekly team meeting.",
      timestamp: "8:30 AM",
      status: "read",
    },
    {
      id: "m2",
      senderId: "3",
      text: "Thanks for the reminder! Will it be in the conference room or virtual?",
      timestamp: "8:45 AM",
      status: "read",
    },
    {
      id: "m3",
      senderId: "2",
      text: "Virtual this time. I'll send the link shortly.",
      timestamp: "9:00 AM",
      status: "read",
      reactions: [
        {
          type: "👍",
          users: ["1", "3", "current-user"],
        },
      ],
    },
    {
      id: "m4",
      senderId: "current-user",
      text: "I'll be there. I have some updates on the new development project.",
      timestamp: "9:15 AM",
      status: "read",
    },
    {
      id: "m5",
      senderId: "1",
      text: "Great! Looking forward to hearing about it.",
      timestamp: "9:20 AM",
      status: "read",
    },
    {
      id: "m6",
      senderId: "3",
      text: "When is the next meeting?",
      timestamp: "10:45 AM",
      status: "delivered",
    },
    {
      id: "m7",
      senderId: "2",
      text: "Here's a video walkthrough of the new property we discussed:",
      timestamp: "11:30 AM",
      attachments: [
        {
          type: "video",
          url: "#",
          name: "Property Walkthrough",
          duration: "2:15",
        },
      ],
      status: "delivered",
    },
  ],
}

// Emoji reactions available
const emojiReactions = ["❤️", "👍", "😂", "😮", "😢", "🔥"]

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState("direct")
  const [selectedChat, setSelectedChat] = useState<string | null>("1")
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [showFriendRequests, setShowFriendRequests] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showAddFriendDialog, setShowAddFriendDialog] = useState(false)
  const [newFriendEmail, setNewFriendEmail] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const [replyingTo, setReplyingTo] = useState<Message | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [showContactInfo, setShowContactInfo] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Filter contacts based on search query and friendship status
  const filteredContacts = contacts.filter(
    (contact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (showFriendRequests ? !contact.isFriend : contact.isFriend),
  )

  // Filter groups based on search query
  const filteredGroups = chatGroups.filter((group) => group.name.toLowerCase().includes(searchQuery.toLowerCase()))

  // Load messages when selected chat changes
  useEffect(() => {
    if (selectedChat) {
      setMessages(messageHistory[selectedChat] || [])
      setShowContactInfo(false)
    } else {
      setMessages([])
    }
  }, [selectedChat])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Get selected contact or group
  const getSelectedContactOrGroup = () => {
    if (!selectedChat) return null

    if (selectedChat.startsWith("g")) {
      return chatGroups.find((group) => group.id === selectedChat)
    } else {
      return contacts.find((contact) => contact.id === selectedChat)
    }
  }

  const selected = getSelectedContactOrGroup()

  // Simulate typing indicator
  useEffect(() => {
    if (newMessage.length > 0 && !isTyping) {
      setIsTyping(true)

      // Simulate the other person typing after a delay
      if (selectedChat === "1") {
        const timeout = setTimeout(() => {
          const contact = contacts.find((c) => c.id === "1")
          if (contact) {
            const updatedContact = { ...contact, isTyping: true }
            contacts[0] = updatedContact
          }
        }, 1000)

        return () => clearTimeout(timeout)
      }
    }
  }, [newMessage, isTyping, selectedChat])

  // Handle sending a new message
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return

    const newMsg: Message = {
      id: `new-${Date.now()}`,
      senderId: "current-user",
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      status: "sent",
      ...(replyingTo
        ? {
            replyTo: {
              id: replyingTo.id,
              text: replyingTo.text,
              senderId: replyingTo.senderId,
            },
          }
        : {}),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")
    setReplyingTo(null)

    // Simulate response after a delay
    if (selectedChat === "1") {
      // First, show typing indicator
      setTimeout(() => {
        const contact = contacts.find((c) => c.id === "1")
        if (contact) {
          const updatedContact = { ...contact, isTyping: true }
          contacts[0] = updatedContact
        }
      }, 1000)

      // Then send a response
      setTimeout(() => {
        const responseMsg: Message = {
          id: `resp-${Date.now()}`,
          senderId: "1",
          text: getRandomResponse(),
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          status: "delivered",
        }

        setMessages((prev) => [...prev, responseMsg])

        // Remove typing indicator
        const contact = contacts.find((c) => c.id === "1")
        if (contact) {
          const updatedContact = { ...contact, isTyping: false }
          contacts[0] = updatedContact
        }
      }, 3000)
    }
  }

  // Get a random response message
  const getRandomResponse = () => {
    const responses = [
      "That sounds great!",
      "Thanks for letting me know.",
      "I'll check that out and get back to you.",
      "Perfect! Looking forward to it.",
      "Interesting. Tell me more about that.",
      "I appreciate the update.",
      "Let me think about that and I'll respond soon.",
      "That's exactly what I was looking for!",
      "Great news! When can we meet to discuss further?",
      "I have a few questions about that. Can we schedule a call?",
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Handle adding a new friend
  const handleAddFriend = () => {
    // In a real app, this would send a friend request
    console.log("Friend request sent to:", newFriendEmail)
    setNewFriendEmail("")
    setShowAddFriendDialog(false)
  }

  // Handle keypress for sending messages
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  // Handle adding a reaction to a message
  const handleAddReaction = (messageId: string, reaction: string) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === messageId) {
          const existingReactionIndex = msg.reactions?.findIndex((r) => r.type === reaction)

          if (existingReactionIndex !== undefined && existingReactionIndex >= 0) {
            // Reaction exists, toggle user
            const updatedReactions = [...(msg.reactions || [])]
            const userIndex = updatedReactions[existingReactionIndex].users.indexOf("current-user")

            if (userIndex >= 0) {
              // Remove user from reaction
              updatedReactions[existingReactionIndex].users = updatedReactions[existingReactionIndex].users.filter(
                (u) => u !== "current-user",
              )

              // Remove reaction if no users left
              if (updatedReactions[existingReactionIndex].users.length === 0) {
                updatedReactions.splice(existingReactionIndex, 1)
              }
            } else {
              // Add user to reaction
              updatedReactions[existingReactionIndex].users.push("current-user")
            }

            return { ...msg, reactions: updatedReactions.length > 0 ? updatedReactions : undefined }
          } else {
            // Add new reaction
            return {
              ...msg,
              reactions: [...(msg.reactions || []), { type: reaction as any, users: ["current-user"] }],
            }
          }
        }
        return msg
      }),
    )
  }

  // Toggle recording state
  const toggleRecording = () => {
    setIsRecording(!isRecording)

    // Simulate stopping recording after 3 seconds
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)

        if (selectedChat) {
          const newMsg: Message = {
            id: `voice-${Date.now()}`,
            senderId: "current-user",
            text: "",
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            status: "sent",
            attachments: [
              {
                type: "audio",
                url: "#",
                name: "Voice Message",
                duration: "0:12",
              },
            ],
          }

          setMessages([...messages, newMsg])
        }
      }, 3000)
    }
  }

  return (
    <div className="container py-6">
      <div className="h-[calc(100vh-120px)] overflow-hidden rounded-lg border bg-background shadow">
        <div className="grid h-full grid-cols-12">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-4 lg:col-span-3 border-r">
            <div className="flex h-full flex-col">
              {/* Sidebar Header */}
              <div className="border-b p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Messages
                  </h2>
                  <div className="flex gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          >
                            <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Settings</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          >
                            <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Notifications</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <DropdownMenu>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                              >
                                <Plus className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                              </Button>
                            </DropdownMenuTrigger>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>New Message</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuItem onClick={() => setShowAddFriendDialog(true)} className="cursor-pointer">
                          <UserPlus className="mr-2 h-4 w-4 text-blue-600" />
                          <span>Add Friend</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer">
                          <Users className="mr-2 h-4 w-4 text-indigo-600" />
                          <span>Create Group</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <MessageSquare className="mr-2 h-4 w-4 text-green-600" />
                          <span>New Message</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search messages..."
                    className="pl-9 pr-4 bg-white dark:bg-gray-950 border-blue-100 dark:border-blue-900 focus-visible:ring-blue-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="direct" className="flex-1 overflow-hidden" onValueChange={setActiveTab}>
                <div className="border-b px-4">
                  <TabsList className="w-full justify-start px-0 h-12 bg-transparent">
                    <TabsTrigger
                      value="direct"
                      className="flex-1 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                    >
                      Direct Messages
                    </TabsTrigger>
                    <TabsTrigger
                      value="groups"
                      className="flex-1 data-[state=active]:bg-transparent data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600 rounded-none"
                    >
                      Groups
                    </TabsTrigger>
                  </TabsList>
                </div>

                {/* Direct Messages Tab */}
                <TabsContent value="direct" className="h-[calc(100%-108px)] overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between px-4 py-2 border-b">
                    <div className="flex gap-2">
                      <Button
                        variant={showFriendRequests ? "ghost" : "secondary"}
                        size="sm"
                        className={
                          !showFriendRequests
                            ? "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300"
                            : ""
                        }
                        onClick={() => setShowFriendRequests(false)}
                      >
                        Friends
                      </Button>
                      <Button
                        variant={showFriendRequests ? "secondary" : "ghost"}
                        size="sm"
                        className={
                          showFriendRequests
                            ? "bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-900/50 dark:text-blue-300"
                            : ""
                        }
                        onClick={() => setShowFriendRequests(true)}
                      >
                        Requests
                      </Button>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          >
                            <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Filter Contacts</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <ScrollArea className="flex-1">
                    <div className="px-2 py-2">
                      {showFriendRequests ? (
                        <div className="space-y-1">
                          <h3 className="px-2 text-sm font-medium text-blue-600 dark:text-blue-400">Friend Requests</h3>
                          {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact) => (
                              <ContactItem
                                key={contact.id}
                                contact={contact}
                                isSelected={selectedChat === contact.id}
                                onClick={() => setSelectedChat(contact.id)}
                                showAcceptReject
                              />
                            ))
                          ) : (
                            <div className="px-2 py-8 text-center">
                              <UserPlus className="h-12 w-12 mx-auto text-blue-200 dark:text-blue-900" />
                              <p className="mt-2 text-sm text-muted-foreground">No friend requests</p>
                              <Button
                                variant="outline"
                                size="sm"
                                className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                                onClick={() => setShowAddFriendDialog(true)}
                              >
                                <UserPlus className="h-4 w-4 mr-1" />
                                Add Friend
                              </Button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <h3 className="px-2 text-sm font-medium text-blue-600 dark:text-blue-400">Online</h3>
                          {filteredContacts
                            .filter((c) => c.status === "online")
                            .map((contact) => (
                              <ContactItem
                                key={contact.id}
                                contact={contact}
                                isSelected={selectedChat === contact.id}
                                onClick={() => setSelectedChat(contact.id)}
                              />
                            ))}

                          <h3 className="mt-4 px-2 text-sm font-medium text-blue-600 dark:text-blue-400">Offline</h3>
                          {filteredContacts
                            .filter((c) => c.status !== "online")
                            .map((contact) => (
                              <ContactItem
                                key={contact.id}
                                contact={contact}
                                isSelected={selectedChat === contact.id}
                                onClick={() => setSelectedChat(contact.id)}
                              />
                            ))}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>

                {/* Groups Tab */}
                <TabsContent value="groups" className="h-[calc(100%-108px)] overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="px-2 py-2">
                      <div className="flex items-center justify-between px-2 mb-2">
                        <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Your Groups</h3>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 px-2 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                        >
                          <Plus className="h-4 w-4 mr-1" />
                          New Group
                        </Button>
                      </div>
                      {filteredGroups.map((group) => (
                        <GroupItem
                          key={group.id}
                          group={group}
                          isSelected={selectedChat === group.id}
                          onClick={() => setSelectedChat(group.id)}
                        />
                      ))}

                      {filteredGroups.length === 0 && (
                        <div className="px-2 py-8 text-center">
                          <Users className="h-12 w-12 mx-auto text-blue-200 dark:text-blue-900" />
                          <p className="mt-2 text-sm text-muted-foreground">No groups found</p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-4 border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Create Group
                          </Button>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Chat Area */}
          <div className="col-span-12 md:col-span-8 lg:col-span-9 flex flex-col h-full">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="border-b p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
                        <AvatarImage src={selected?.avatar} alt={selected?.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                          {selected?.name?.charAt(0) || (selected as ChatGroup)?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">
                            {(selected as Contact)?.name || (selected as ChatGroup)?.name}
                          </h3>
                          {(selected as Contact)?.status && <StatusIndicator status={(selected as Contact).status} />}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {(selected as Contact)?.isTyping ? (
                            <span className="text-blue-600 dark:text-blue-400 flex items-center">
                              Typing
                              <span className="ml-1 flex">
                                <span className="animate-bounce mx-0.5">.</span>
                                <span className="animate-bounce animation-delay-200 mx-0.5">.</span>
                                <span className="animate-bounce animation-delay-400 mx-0.5">.</span>
                              </span>
                            </span>
                          ) : (
                            (selected as Contact)?.lastSeen ||
                            `${(selected as ChatGroup)?.members?.length || 0} members`
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                            >
                              <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Voice Call</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                            >
                              <Video className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Video Call</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                              onClick={() => setShowContactInfo(!showContactInfo)}
                            >
                              <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Contact Info</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-9 w-9 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                          >
                            <MoreHorizontal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="cursor-pointer">
                            <User className="mr-2 h-4 w-4" />
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Bell className="mr-2 h-4 w-4" />
                            Mute Notifications
                          </DropdownMenuItem>
                          <DropdownMenuItem className="cursor-pointer">
                            <Search className="mr-2 h-4 w-4" />
                            Search in Conversation
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-500 cursor-pointer">
                            <X className="mr-2 h-4 w-4" />
                            Block Contact
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                  {/* Messages */}
                  <div className="flex-1 flex flex-col">
                    <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-gray-950">
                      <div className="space-y-4">
                        {/* Date separator */}
                        <div className="flex items-center justify-center">
                          <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs px-3 py-1 rounded-full">
                            Today
                          </div>
                        </div>

                        {messages.map((message, index) => {
                          const isCurrentUser = message.senderId === "current-user"
                          const showAvatar =
                            index === 0 ||
                            messages[index - 1].senderId !== message.senderId ||
                            new Date(message.timestamp).getTime() - new Date(messages[index - 1].timestamp).getTime() >
                              5 * 60 * 1000 // 5 minutes

                          return (
                            <div
                              key={message.id}
                              className={cn("flex", isCurrentUser ? "justify-end" : "justify-start")}
                            >
                              <div className={cn("flex max-w-[80%]", isCurrentUser ? "flex-row-reverse" : "flex-row")}>
                                {!isCurrentUser && showAvatar ? (
                                  <Avatar className="h-8 w-8 mr-2 mt-1 border-2 border-white dark:border-gray-800 shadow-sm">
                                    <AvatarImage
                                      src={
                                        contacts.find((c) => c.id === message.senderId)?.avatar ||
                                        "/placeholder.svg?height=32&width=32"
                                      }
                                      alt="Avatar"
                                    />
                                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                                      {contacts.find((c) => c.id === message.senderId)?.name.charAt(0) || "U"}
                                    </AvatarFallback>
                                  </Avatar>
                                ) : (
                                  !isCurrentUser && <div className="w-10" />
                                )}
                                <div>
                                  {!isCurrentUser && showAvatar && (
                                    <div className="text-xs text-muted-foreground mb-1 ml-1">
                                      {contacts.find((c) => c.id === message.senderId)?.name}
                                    </div>
                                  )}

                                  {/* Reply reference */}
                                  {message.replyTo && (
                                    <div
                                      className={cn(
                                        "text-xs rounded-t-lg px-3 py-1 border-l-2 mb-1 max-w-xs overflow-hidden text-ellipsis",
                                        isCurrentUser
                                          ? "bg-blue-100/50 dark:bg-blue-900/20 border-l-blue-400 text-blue-700 dark:text-blue-300 ml-auto"
                                          : "bg-gray-100 dark:bg-gray-800/50 border-l-gray-400 text-gray-700 dark:text-gray-300",
                                      )}
                                    >
                                      <div className="font-medium">
                                        {message.replyTo.senderId === "current-user"
                                          ? "You"
                                          : contacts.find((c) => c.id === message.replyTo?.senderId)?.name}
                                      </div>
                                      <div className="truncate">{message.replyTo.text}</div>
                                    </div>
                                  )}

                                  <div
                                    className={cn(
                                      "rounded-lg px-3 py-2 text-sm relative group",
                                      isCurrentUser
                                        ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                                        : "bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm",
                                    )}
                                  >
                                    {message.text}
                                    {message.attachments && message.attachments.length > 0 && (
                                      <div className="mt-2 space-y-2">
                                        {message.attachments.map((attachment, i) => (
                                          <div key={i}>
                                            {attachment.type === "image" ? (
                                              <div className="relative rounded-md overflow-hidden">
                                                <img
                                                  src={attachment.url || "/placeholder.svg"}
                                                  alt="Attachment"
                                                  className="rounded-md max-w-full max-h-[200px] object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                                                  <Button
                                                    variant="secondary"
                                                    size="sm"
                                                    className="bg-white/80 backdrop-blur-sm"
                                                  >
                                                    <Eye className="h-4 w-4 mr-1" />
                                                    View
                                                  </Button>
                                                </div>
                                              </div>
                                            ) : attachment.type === "audio" ? (
                                              <div className="flex items-center gap-2 rounded-md bg-black/5 dark:bg-white/5 p-2">
                                                <Button
                                                  variant="ghost"
                                                  size="icon"
                                                  className="h-8 w-8 rounded-full bg-blue-500 text-white hover:bg-blue-600"
                                                >
                                                  <Play className="h-4 w-4" />
                                                </Button>
                                                <div className="flex-1">
                                                  <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full">
                                                    <div className="h-1 w-0 bg-blue-500 rounded-full"></div>
                                                  </div>
                                                </div>
                                                <span className="text-xs">{attachment.duration}</span>
                                              </div>
                                            ) : attachment.type === "video" ? (
                                              <div className="relative rounded-md overflow-hidden">
                                                <div className="bg-gray-200 dark:bg-gray-800 h-[150px] flex items-center justify-center">
                                                  <Play className="h-10 w-10 text-blue-500" />
                                                </div>
                                                <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                  {attachment.duration}
                                                </div>
                                              </div>
                                            ) : (
                                              <div className="flex items-center gap-2 rounded-md bg-black/5 dark:bg-white/5 p-2">
                                                <div className="h-8 w-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                                                  <File className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                  <div className="text-xs font-medium truncate">{attachment.name}</div>
                                                  <div className="text-xs text-muted-foreground">{attachment.size}</div>
                                                </div>
                                                <Button variant="ghost" size="sm" className="h-7 w-7 rounded-full">
                                                  <Download className="h-4 w-4" />
                                                </Button>
                                              </div>
                                            )}
                                          </div>
                                        ))}
                                      </div>
                                    )}

                                    {/* Reaction buttons that appear on hover */}
                                    <div
                                      className={cn(
                                        "absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-100 dark:border-gray-700 p-1 flex gap-1",
                                        isCurrentUser ? "-left-2" : "-right-2",
                                      )}
                                    >
                                      {emojiReactions.map((emoji) => (
                                        <button
                                          key={emoji}
                                          className="h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center text-xs transition-transform hover:scale-125"
                                          onClick={() => handleAddReaction(message.id, emoji)}
                                        >
                                          {emoji}
                                        </button>
                                      ))}
                                    </div>

                                    {/* Context menu */}
                                    <div
                                      className={cn(
                                        "absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity",
                                        isCurrentUser
                                          ? "left-0 -translate-x-full -ml-1"
                                          : "right-0 translate-x-full mr-1",
                                      )}
                                    >
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                                          >
                                            <MoreVertical className="h-3 w-3" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align={isCurrentUser ? "start" : "end"} className="w-40">
                                          <DropdownMenuItem
                                            onClick={() => setReplyingTo(message)}
                                            className="cursor-pointer"
                                          >
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            <span>Reply</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="cursor-pointer">
                                            <Copy className="mr-2 h-4 w-4" />
                                            <span>Copy</span>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem className="cursor-pointer">
                                            <Forward className="mr-2 h-4 w-4" />
                                            <span>Forward</span>
                                          </DropdownMenuItem>
                                          {isCurrentUser && (
                                            <>
                                              <DropdownMenuSeparator />
                                              <DropdownMenuItem className="text-red-500 cursor-pointer">
                                                <Trash className="mr-2 h-4 w-4" />
                                                <span>Delete</span>
                                              </DropdownMenuItem>
                                            </>
                                          )}
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>

                                  {/* Reactions display */}
                                  {message.reactions && message.reactions.length > 0 && (
                                    <div
                                      className={cn("flex mt-1 gap-1", isCurrentUser ? "justify-end" : "justify-start")}
                                    >
                                      {message.reactions.map((reaction, idx) => (
                                        <div
                                          key={idx}
                                          className="bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700 px-1.5 py-0.5 flex items-center gap-1 text-xs"
                                        >
                                          <span>{reaction.type}</span>
                                          <span className="text-muted-foreground">{reaction.users.length}</span>
                                        </div>
                                      ))}
                                    </div>
                                  )}

                                  <div
                                    className={cn(
                                      "text-xs text-muted-foreground mt-1 flex items-center gap-1",
                                      isCurrentUser ? "justify-end" : "justify-start",
                                    )}
                                  >
                                    {message.timestamp}
                                    {isCurrentUser && (
                                      <span className={message.status === "read" ? "text-blue-500" : ""}>
                                        {message.status === "read" ? "✓✓" : message.status === "delivered" ? "✓✓" : "✓"}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                        <div ref={messagesEndRef} />
                      </div>
                    </ScrollArea>

                    {/* Reply indicator */}
                    {replyingTo && (
                      <div className="border-t p-2 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-6 bg-blue-500 rounded-full"></div>
                          <div>
                            <div className="text-xs font-medium text-blue-600 dark:text-blue-400">
                              Replying to{" "}
                              {replyingTo.senderId === "current-user"
                                ? "yourself"
                                : contacts.find((c) => c.id === replyingTo.senderId)?.name}
                            </div>
                            <div className="text-xs text-muted-foreground truncate max-w-[300px]">
                              {replyingTo.text}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 rounded-full hover:bg-blue-100 dark:hover:bg-blue-800"
                          onClick={() => setReplyingTo(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}

                    {/* Message Input */}
                    <div className="border-t p-4 bg-white dark:bg-gray-950">
                      <div className="flex items-end gap-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                            >
                              <Paperclip className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" side="top">
                            <DropdownMenuItem className="cursor-pointer">
                              <ImageIcon className="mr-2 h-4 w-4 text-blue-600" />
                              <span>Image</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <File className="mr-2 h-4 w-4 text-indigo-600" />
                              <span>File</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Camera className="mr-2 h-4 w-4 text-purple-600" />
                              <span>Camera</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <Calendar className="mr-2 h-4 w-4 text-green-600" />
                              <span>Schedule</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">
                              <MapPin className="mr-2 h-4 w-4 text-red-600" />
                              <span>Location</span>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="relative flex-1">
                          <Input
                            placeholder={isRecording ? "Recording audio..." : "Type a message..."}
                            className={cn(
                              "pr-10 border-blue-100 dark:border-blue-900 focus-visible:ring-blue-500",
                              isRecording && "bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400",
                            )}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={handleKeyPress}
                            disabled={isRecording}
                          />
                          <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:bg-transparent"
                              >
                                <Smile className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-64" align="end" alignOffset={-40} side="top">
                              <div className="grid grid-cols-8 gap-2 p-2">
                                {[
                                  "😊",
                                  "😂",
                                  "❤️",
                                  "👍",
                                  "🎉",
                                  "🔥",
                                  "👋",
                                  "😎",
                                  "🤔",
                                  "😢",
                                  "😍",
                                  "🙏",
                                  "👏",
                                  "🌟",
                                  "💯",
                                  "🤝",
                                  "👀",
                                  "💪",
                                  "🙌",
                                  "✨",
                                  "💖",
                                  "🤗",
                                  "🥳",
                                  "😁",
                                ].map((emoji) => (
                                  <button
                                    key={emoji}
                                    className="h-8 w-8 rounded hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-xl"
                                    onClick={() => {
                                      setNewMessage((prev) => prev + emoji)
                                      setShowEmojiPicker(false)
                                    }}
                                  >
                                    {emoji}
                                  </button>
                                ))}
                              </div>
                            </PopoverContent>
                          </Popover>
                        </div>

                        {newMessage.trim() ? (
                          <Button
                            size="icon"
                            className="h-9 w-9 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                            onClick={handleSendMessage}
                          >
                            <Send className="h-5 w-5" />
                          </Button>
                        ) : (
                          <Button
                            size="icon"
                            className={cn(
                              "h-9 w-9 rounded-full",
                              isRecording
                                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                                : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700",
                            )}
                            onClick={toggleRecording}
                          >
                            <Mic className="h-5 w-5" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contact Info Sidebar */}
                  {showContactInfo && (
                    <div className="w-80 border-l overflow-auto">
                      <ScrollArea className="h-full">
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="font-medium text-blue-600 dark:text-blue-400">Contact Info</h3>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30"
                              onClick={() => setShowContactInfo(false)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="flex flex-col items-center mb-6">
                            <Avatar className="h-24 w-24 mb-3 border-4 border-white dark:border-gray-800 shadow-md">
                              <AvatarImage src={selected?.avatar} alt={(selected as Contact)?.name} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xl">
                                {(selected as Contact)?.name?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <h2 className="text-lg font-semibold">{(selected as Contact)?.name}</h2>
                            <p className="text-sm text-muted-foreground">{(selected as Contact)?.role}</p>

                            <div className="flex items-center mt-2">
                              <StatusIndicator status={(selected as Contact)?.status} className="mr-1" />
                              <span className="text-xs">
                                {(selected as Contact)?.status === "online"
                                  ? "Online"
                                  : (selected as Contact)?.lastSeen}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">About</h4>
                              <p className="text-sm text-muted-foreground">
                                {(selected as Contact)?.bio || "No bio available"}
                              </p>
                            </div>

                            <Separator />

                            <div>
                              <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                                Media & Files
                              </h4>
                              <div className="grid grid-cols-3 gap-2">
                                <div className="aspect-square rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                  <img
                                    src="/placeholder.svg?height=80&width=80&text=Image"
                                    alt="Shared media"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="aspect-square rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden">
                                  <img
                                    src="/placeholder.svg?height=80&width=80&text=Image"
                                    alt="Shared media"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="aspect-square rounded-md bg-gray-100 dark:bg-gray-800 overflow-hidden relative group">
                                  <img
                                    src="/placeholder.svg?height=80&width=80&text=Image"
                                    alt="Shared media"
                                    className="w-full h-full object-cover"
                                  />
                                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-white text-sm font-medium">+12</span>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="w-full mt-2 text-blue-600 dark:text-blue-400"
                              >
                                View All
                                <ChevronRight className="h-4 w-4 ml-1" />
                              </Button>
                            </div>

                            <Separator />

                            <div>
                              <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Actions</h4>
                              <div className="space-y-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start border-blue-100 dark:border-blue-900"
                                >
                                  <Star className="h-4 w-4 mr-2 text-amber-500" />
                                  Add to Favorites
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start border-blue-100 dark:border-blue-900"
                                >
                                  <Bell className="h-4 w-4 mr-2 text-blue-600 dark:text-blue-400" />
                                  Mute Notifications
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start border-blue-100 dark:border-blue-900"
                                >
                                  <Search className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />
                                  Search in Conversation
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full justify-start text-red-500 border-red-100 dark:border-red-900/50"
                                >
                                  <X className="h-4 w-4 mr-2" />
                                  Block Contact
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-full items-center justify-center bg-gradient-to-b from-blue-50/50 to-white dark:from-blue-950/10 dark:to-gray-950">
                <div className="text-center max-w-md p-8">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <MessageSquare className="h-12 w-12 text-blue-500 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Welcome to Messages</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with your real estate network. Choose a contact or group to start messaging.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => setShowAddFriendDialog(true)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Add Friend
                    </Button>
                    <Button
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-400"
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Create Group
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Friend Dialog */}
      <Dialog open={showAddFriendDialog} onOpenChange={setShowAddFriendDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Friend</DialogTitle>
            <DialogDescription>
              Enter the email address or username of the person you want to add as a friend.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email or Username
              </label>
              <Input
                id="email"
                placeholder="friend@example.com"
                value={newFriendEmail}
                onChange={(e) => setNewFriendEmail(e.target.value)}
                className="border-blue-100 dark:border-blue-900 focus-visible:ring-blue-500"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddFriendDialog(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleAddFriend}
              disabled={!newFriendEmail.trim()}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Send Friend Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Contact Item Component
interface ContactItemProps {
  contact: Contact
  isSelected: boolean
  onClick: () => void
  showAcceptReject?: boolean
}

function ContactItem({ contact, isSelected, onClick, showAcceptReject }: ContactItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer transition-colors",
        isSelected
          ? "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30"
          : "hover:bg-blue-50 dark:hover:bg-blue-900/20",
      )}
      onClick={onClick}
    >
      <div className="relative">
        <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
            {contact.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <StatusIndicator status={contact.status} className="absolute bottom-0 right-0 ring-2 ring-background" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{contact.name}</div>
          {contact.unreadCount ? (
            <Badge className="ml-auto bg-blue-500 hover:bg-blue-600">{contact.unreadCount}</Badge>
          ) : null}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {contact.isTyping ? (
            <span className="text-blue-600 dark:text-blue-400 flex items-center">
              Typing
              <span className="ml-1 flex">
                <span className="animate-bounce mx-0.5">.</span>
                <span className="animate-bounce animation-delay-200 mx-0.5">.</span>
                <span className="animate-bounce animation-delay-400 mx-0.5">.</span>
              </span>
            </span>
          ) : showAcceptReject ? (
            "Wants to connect with you"
          ) : (
            contact.lastSeen
          )}
        </div>
      </div>
      {showAcceptReject && (
        <div className="flex gap-1">
          <Button
            variant="outline"
            size="icon"
            className="h-7 w-7 rounded-full border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:text-red-400"
          >
            <X className="h-4 w-4" />
          </Button>
          <Button size="icon" className="h-7 w-7 rounded-full bg-green-500 hover:bg-green-600">
            <Check className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

// Group Item Component
interface GroupItemProps {
  group: ChatGroup
  isSelected: boolean
  onClick: () => void
}

function GroupItem({ group, isSelected, onClick }: GroupItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-lg px-2 py-2 cursor-pointer transition-colors",
        isSelected
          ? "bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30"
          : "hover:bg-blue-50 dark:hover:bg-blue-900/20",
      )}
      onClick={onClick}
    >
      <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm">
        <AvatarImage src={group.avatar} alt={group.name} />
        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-600 text-white">
          {group.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{group.name}</div>
          {group.unreadCount ? (
            <Badge className="ml-auto bg-blue-500 hover:bg-blue-600">{group.unreadCount}</Badge>
          ) : null}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {group.lastMessage ? (
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {group.lastMessageTime}: {group.lastMessage}
            </span>
          ) : (
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {group.members.length} members
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// Status Indicator Component
interface StatusIndicatorProps {
  status: "online" | "offline" | "away" | "busy"
  className?: string
}

function StatusIndicator({ status, className }: StatusIndicatorProps) {
  return (
    <span
      className={cn(
        "flex h-3 w-3 rounded-full",
        {
          "bg-green-500": status === "online",
          "bg-gray-400": status === "offline",
          "bg-yellow-500": status === "away",
          "bg-red-500": status === "busy",
        },
        className,
      )}
    />
  )
}

// Missing icon components
function Play(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function Download(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

function Copy(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

function Forward(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="15 17 20 12 15 7" />
      <path d="M4 18v-2a4 4 0 0 1 4-4h12" />
    </svg>
  )
}

function Trash(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}

