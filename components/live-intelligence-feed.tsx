"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Minus,
  Radio,
  Zap,
  Shield,
  Globe,
  Users,
  DollarSign,
  Flame,
  Eye,
  Brain,
  Radar,
  Signal,
  BarChart3,
  CircleDot,
} from "lucide-react"

// Event data types
interface IntelEvent {
  id: string
  timestamp: string
  title: string
  category: "political" | "economic" | "social" | "security" | "coalition"
  sentiment: "positive" | "neutral" | "negative"
  impactScore: number
  confidence: number
  sourceReliability: "high" | "medium" | "low"
  urgency: "critical" | "high" | "medium" | "low"
  isNew?: boolean
}

// Sample events data
const initialEvents: IntelEvent[] = [
  {
    id: "evt-001",
    timestamp: "2 min ago",
    title: "Fuel price increase detected in Lagos and Abuja metropolitan areas",
    category: "economic",
    sentiment: "negative",
    impactScore: 87,
    confidence: 94,
    sourceReliability: "high",
    urgency: "critical",
    isNew: true,
  },
  {
    id: "evt-002",
    timestamp: "5 min ago",
    title: "Opposition rally engagement rising in Southwest region",
    category: "political",
    sentiment: "neutral",
    impactScore: 72,
    confidence: 88,
    sourceReliability: "high",
    urgency: "high",
    isNew: true,
  },
  {
    id: "evt-003",
    timestamp: "8 min ago",
    title: "Northern coalition discussions ongoing - new alliance forming",
    category: "coalition",
    sentiment: "neutral",
    impactScore: 65,
    confidence: 76,
    sourceReliability: "medium",
    urgency: "medium",
  },
  {
    id: "evt-004",
    timestamp: "12 min ago",
    title: "Youth protest sentiment increasing on social media platforms",
    category: "social",
    sentiment: "negative",
    impactScore: 78,
    confidence: 91,
    sourceReliability: "high",
    urgency: "high",
  },
  {
    id: "evt-005",
    timestamp: "18 min ago",
    title: "Currency volatility concerns detected in forex markets",
    category: "economic",
    sentiment: "negative",
    impactScore: 82,
    confidence: 95,
    sourceReliability: "high",
    urgency: "critical",
  },
  {
    id: "evt-006",
    timestamp: "23 min ago",
    title: "Electoral reform debate intensifying in National Assembly",
    category: "political",
    sentiment: "positive",
    impactScore: 58,
    confidence: 84,
    sourceReliability: "high",
    urgency: "medium",
  },
  {
    id: "evt-007",
    timestamp: "31 min ago",
    title: "Regional insecurity tensions rising in North-Central zone",
    category: "security",
    sentiment: "negative",
    impactScore: 91,
    confidence: 89,
    sourceReliability: "high",
    urgency: "critical",
  },
  {
    id: "evt-008",
    timestamp: "42 min ago",
    title: "Inflation spike reported - consumer prices up 2.3% monthly",
    category: "economic",
    sentiment: "negative",
    impactScore: 85,
    confidence: 97,
    sourceReliability: "high",
    urgency: "high",
  },
]

// Signal analysis data
const signalData = {
  sentimentSpike: { value: 73, trend: "up", label: "Urban Negative Sentiment" },
  volatilityAlert: { value: 68, trend: "up", label: "Coalition Volatility" },
  economicStress: { value: 81, trend: "up", label: "Economic Dissatisfaction" },
  oppositionEngagement: { value: 64, trend: "up", label: "Opposition Activity" },
  regionalInstability: { value: 56, trend: "stable", label: "Regional Tensions" },
  publicEngagement: { value: 72, trend: "up", label: "Public Engagement" },
}

const aiInsights = [
  { time: "Just now", text: "Negative sentiment increasing in urban regions", type: "alert" },
  { time: "2m ago", text: "Coalition volatility rising above threshold", type: "warning" },
  { time: "5m ago", text: "Economic dissatisfaction accelerating in South", type: "alert" },
  { time: "8m ago", text: "Opposition engagement trending upward", type: "info" },
  { time: "12m ago", text: "Youth demographic showing increased activity", type: "info" },
]

function getCategoryIcon(category: IntelEvent["category"]) {
  switch (category) {
    case "political":
      return <Users className="w-3.5 h-3.5" />
    case "economic":
      return <DollarSign className="w-3.5 h-3.5" />
    case "social":
      return <Globe className="w-3.5 h-3.5" />
    case "security":
      return <Shield className="w-3.5 h-3.5" />
    case "coalition":
      return <Activity className="w-3.5 h-3.5" />
  }
}

function getCategoryColor(category: IntelEvent["category"]) {
  switch (category) {
    case "political":
      return "bg-blue-500/20 text-blue-400 border-blue-500/30"
    case "economic":
      return "bg-amber-500/20 text-amber-400 border-amber-500/30"
    case "social":
      return "bg-purple-500/20 text-purple-400 border-purple-500/30"
    case "security":
      return "bg-red-500/20 text-red-400 border-red-500/30"
    case "coalition":
      return "bg-cyan-500/20 text-cyan-400 border-cyan-500/30"
  }
}

function getSentimentColor(sentiment: IntelEvent["sentiment"]) {
  switch (sentiment) {
    case "positive":
      return "text-emerald-400"
    case "neutral":
      return "text-slate-400"
    case "negative":
      return "text-red-400"
  }
}

function getSentimentIcon(sentiment: IntelEvent["sentiment"]) {
  switch (sentiment) {
    case "positive":
      return <TrendingUp className="w-3 h-3" />
    case "neutral":
      return <Minus className="w-3 h-3" />
    case "negative":
      return <TrendingDown className="w-3 h-3" />
  }
}

function getUrgencyStyle(urgency: IntelEvent["urgency"]) {
  switch (urgency) {
    case "critical":
      return "bg-red-500/20 text-red-400 border-red-500/40 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
    case "high":
      return "bg-orange-500/20 text-orange-400 border-orange-500/30"
    case "medium":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
    case "low":
      return "bg-slate-500/20 text-slate-400 border-slate-500/30"
  }
}

function EventCard({ event }: { event: IntelEvent }) {
  return (
    <div
      className={`
        relative p-4 rounded-lg border backdrop-blur-sm transition-all duration-300
        bg-slate-900/60 border-slate-700/50 hover:border-cyan-500/40 hover:bg-slate-900/80
        hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] group
        ${event.isNew ? "ring-1 ring-cyan-500/30" : ""}
      `}
    >
      {/* New Event Badge */}
      {event.isNew && (
        <div className="absolute -top-2 -right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-[10px] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          NEW
        </div>
      )}

      {/* Header Row */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          {/* Category Tag */}
          <span
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${getCategoryColor(event.category)}`}
          >
            {getCategoryIcon(event.category)}
            {event.category.toUpperCase()}
          </span>
          {/* Urgency */}
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getUrgencyStyle(event.urgency)}`}
          >
            {event.urgency.toUpperCase()}
          </span>
        </div>
        <span className="text-[10px] text-muted-foreground whitespace-nowrap">{event.timestamp}</span>
      </div>

      {/* Title */}
      <p className="text-sm text-foreground mb-3 leading-relaxed">{event.title}</p>

      {/* Metrics Row */}
      <div className="flex items-center gap-4 text-[11px]">
        {/* Sentiment */}
        <div className={`flex items-center gap-1 ${getSentimentColor(event.sentiment)}`}>
          {getSentimentIcon(event.sentiment)}
          <span className="capitalize">{event.sentiment}</span>
        </div>

        {/* Impact Score */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <Flame className="w-3 h-3 text-orange-400" />
          <span>
            Impact: <span className="text-foreground font-medium">{event.impactScore}</span>
          </span>
        </div>

        {/* AI Confidence */}
        <div className="flex items-center gap-1 text-muted-foreground">
          <Brain className="w-3 h-3 text-cyan-400" />
          <span>
            AI: <span className="text-foreground font-medium">{event.confidence}%</span>
          </span>
        </div>

        {/* Source Reliability */}
        <div className="flex items-center gap-1 text-muted-foreground ml-auto">
          <Signal
            className={`w-3 h-3 ${
              event.sourceReliability === "high"
                ? "text-emerald-400"
                : event.sourceReliability === "medium"
                  ? "text-yellow-400"
                  : "text-red-400"
            }`}
          />
          <span className="capitalize">{event.sourceReliability}</span>
        </div>
      </div>

      {/* Scanning line effect on hover */}
      <div className="absolute inset-0 rounded-lg overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan" />
      </div>
    </div>
  )
}

function SignalMeter({
  label,
  value,
  trend,
  color = "cyan",
}: {
  label: string
  value: number
  trend: "up" | "down" | "stable"
  color?: "cyan" | "red" | "amber" | "emerald"
}) {
  const colorClasses = {
    cyan: "from-cyan-500 to-cyan-400 shadow-cyan-500/50",
    red: "from-red-500 to-red-400 shadow-red-500/50",
    amber: "from-amber-500 to-amber-400 shadow-amber-500/50",
    emerald: "from-emerald-500 to-emerald-400 shadow-emerald-500/50",
  }

  const trendColors = {
    up: "text-red-400",
    down: "text-emerald-400",
    stable: "text-slate-400",
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <div className={`flex items-center gap-1 ${trendColors[trend]}`}>
          {trend === "up" && <TrendingUp className="w-3 h-3" />}
          {trend === "down" && <TrendingDown className="w-3 h-3" />}
          {trend === "stable" && <Minus className="w-3 h-3" />}
          <span className="font-medium">{value}%</span>
        </div>
      </div>
      <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[color]} shadow-[0_0_10px] transition-all duration-1000`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  )
}

function RadarIndicator() {
  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Radar circles */}
      <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
      <div className="absolute inset-4 rounded-full border border-cyan-500/20" />
      <div className="absolute inset-8 rounded-full border border-cyan-500/20" />
      <div className="absolute inset-12 rounded-full border border-cyan-500/30" />

      {/* Cross lines */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-[1px] bg-cyan-500/20" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[1px] h-full bg-cyan-500/20" />
      </div>

      {/* Scanning beam */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 w-1/2 h-[2px] origin-left bg-gradient-to-r from-cyan-400 to-transparent animate-radar-sweep"
          style={{ transformOrigin: "0% 50%" }}
        />
      </div>

      {/* Center dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)] animate-pulse" />
      </div>

      {/* Signal dots */}
      <div className="absolute top-4 right-6 w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
      <div className="absolute bottom-8 left-5 w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      <div className="absolute top-10 left-8 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
    </div>
  )
}

export function LiveIntelligenceFeed() {
  const [events, setEvents] = useState(initialEvents)
  const [isScanning, setIsScanning] = useState(true)

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setIsScanning((prev) => !prev)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="px-6 py-12 border-t border-slate-800/50">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30">
                <Radio className="w-5 h-5 text-cyan-400" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Live Intelligence Feed</h2>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-medium text-emerald-400">STREAMING</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground max-w-2xl">
              Real-time political, economic, and social event monitoring powered by AI event detection and sentiment
              analysis.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/50 text-xs">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span className="text-muted-foreground">Monitoring:</span>
              <span className="text-foreground font-medium">247 Sources</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-700/50 text-xs">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="text-muted-foreground">Events Today:</span>
              <span className="text-foreground font-medium">1,847</span>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Live Event Stream */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-foreground">Event Stream</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                <span
                  className={`w-1.5 h-1.5 rounded-full ${isScanning ? "bg-cyan-400 animate-pulse" : "bg-slate-500"}`}
                />
                <span>{isScanning ? "Scanning for new events..." : "Processing..."}</span>
              </div>
            </div>

            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
              {events.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          {/* Right: AI Signal Analysis Panel */}
          <div className="space-y-4">
            {/* AI Analysis Header */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-foreground">AI Signal Analysis</span>
                <div className="ml-auto flex items-center gap-1">
                  <CircleDot className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400">ACTIVE</span>
                </div>
              </div>

              {/* Radar Display */}
              <RadarIndicator />

              <p className="text-center text-[10px] text-muted-foreground mt-2">
                Multi-source intelligence triangulation active
              </p>
            </div>

            {/* Signal Meters */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <BarChart3 className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-foreground">Threat Indicators</span>
              </div>

              <SignalMeter
                label={signalData.sentimentSpike.label}
                value={signalData.sentimentSpike.value}
                trend={signalData.sentimentSpike.trend as "up" | "down" | "stable"}
                color="red"
              />
              <SignalMeter
                label={signalData.volatilityAlert.label}
                value={signalData.volatilityAlert.value}
                trend={signalData.volatilityAlert.trend as "up" | "down" | "stable"}
                color="amber"
              />
              <SignalMeter
                label={signalData.economicStress.label}
                value={signalData.economicStress.value}
                trend={signalData.economicStress.trend as "up" | "down" | "stable"}
                color="red"
              />
              <SignalMeter
                label={signalData.oppositionEngagement.label}
                value={signalData.oppositionEngagement.value}
                trend={signalData.oppositionEngagement.trend as "up" | "down" | "stable"}
                color="cyan"
              />
              <SignalMeter
                label={signalData.regionalInstability.label}
                value={signalData.regionalInstability.value}
                trend={signalData.regionalInstability.trend as "up" | "down" | "stable"}
                color="amber"
              />
              <SignalMeter
                label={signalData.publicEngagement.label}
                value={signalData.publicEngagement.value}
                trend={signalData.publicEngagement.trend as "up" | "down" | "stable"}
                color="cyan"
              />
            </div>

            {/* AI Insights Feed */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                <Radar className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-foreground">AI Insights</span>
              </div>

              <div className="space-y-3">
                {aiInsights.map((insight, idx) => (
                  <div
                    key={idx}
                    className={`
                      flex items-start gap-2 p-2 rounded-lg text-xs
                      ${
                        insight.type === "alert"
                          ? "bg-red-500/10 border border-red-500/20"
                          : insight.type === "warning"
                            ? "bg-amber-500/10 border border-amber-500/20"
                            : "bg-slate-800/50 border border-slate-700/30"
                      }
                    `}
                  >
                    {insight.type === "alert" && <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />}
                    {insight.type === "warning" && <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />}
                    {insight.type === "info" && <Activity className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground leading-relaxed">{insight.text}</p>
                      <span className="text-[10px] text-muted-foreground">{insight.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scanning animation styles */}
      <style jsx>{`
        @keyframes scan {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(100%);
            opacity: 0;
          }
        }
        @keyframes radar-sweep {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
        .animate-radar-sweep {
          animation: radar-sweep 4s linear infinite;
        }
        .scrollbar-thin::-webkit-scrollbar {
          width: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: transparent;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: rgba(6, 182, 212, 0.3);
          border-radius: 2px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: rgba(6, 182, 212, 0.5);
        }
      `}</style>
    </section>
  )
}
