"use client"

import { useEffect, useState, useMemo } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts"
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Brain,
  AlertTriangle,
  Users,
  MapPin,
  Zap,
  BarChart3,
  Shield,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"

// Party colors for Nigerian political parties
const partyColors: Record<string, string> = {
  APC: "#00A859", // Green
  PDP: "#E31B23", // Red
  "Labour Party": "#FF6B00", // Orange
  NNPP: "#1E3A8A", // Navy Blue
  SDP: "#8B5CF6", // Purple
  ADP: "#0EA5E9", // Sky Blue
  ADC: "#F59E0B", // Amber
  "Emerging Coalition": "#EC4899", // Pink
}

// Generate realistic probability data with fluctuations
function generateProbabilityData(days: number) {
  const data = []
  const baseValues: Record<string, number> = {
    APC: 32,
    PDP: 28,
    "Labour Party": 22,
    NNPP: 8,
    SDP: 4,
    ADP: 2,
    ADC: 2,
    "Emerging Coalition": 2,
  }

  const volatility: Record<string, number> = {
    APC: 3,
    PDP: 4,
    "Labour Party": 5,
    NNPP: 2,
    SDP: 1,
    ADP: 0.8,
    ADC: 0.8,
    "Emerging Coalition": 1.5,
  }

  let currentValues = { ...baseValues }

  for (let i = 0; i < days; i++) {
    const date = new Date()
    date.setDate(date.getDate() - (days - i))
    
    // Add realistic random fluctuations
    const dataPoint: Record<string, number | string> = {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      fullDate: date.toISOString(),
    }

    Object.keys(currentValues).forEach((party) => {
      const change = (Math.random() - 0.5) * volatility[party]
      currentValues[party] = Math.max(1, Math.min(50, currentValues[party] + change))
      dataPoint[party] = parseFloat(currentValues[party].toFixed(1))
      // Add confidence intervals
      dataPoint[`${party}Upper`] = parseFloat((currentValues[party] + volatility[party]).toFixed(1))
      dataPoint[`${party}Lower`] = parseFloat(Math.max(0, currentValues[party] - volatility[party]).toFixed(1))
    })

    data.push(dataPoint)
  }

  return data
}

type TimeFilter = "7d" | "30d" | "6m" | "1y"

interface ForecastInsight {
  type: "rising" | "falling" | "alert" | "neutral"
  title: string
  description: string
  timestamp: string
}

const aiInsights: ForecastInsight[] = [
  {
    type: "rising",
    title: "Northern coalition engagement increasing",
    description: "12% uptick in grassroots mobilization across Kano, Kaduna, and Sokoto states",
    timestamp: "2 hours ago",
  },
  {
    type: "alert",
    title: "Youth sentiment trending toward opposition",
    description: "Social media analysis shows 18-34 demographic shifting preferences",
    timestamp: "4 hours ago",
  },
  {
    type: "falling",
    title: "Economic hardship weakening incumbent confidence",
    description: "Correlation detected between inflation index and approval ratings",
    timestamp: "6 hours ago",
  },
  {
    type: "neutral",
    title: "Regional coalition talks in progress",
    description: "Southwest political leaders convening for alliance discussions",
    timestamp: "8 hours ago",
  },
  {
    type: "rising",
    title: "Labour Party momentum in urban centers",
    description: "Lagos, Port Harcourt, and Abuja showing sustained growth patterns",
    timestamp: "12 hours ago",
  },
]

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="glass glow-border rounded-lg p-4 min-w-[200px]">
        <p className="text-sm font-medium text-foreground mb-3">{label}</p>
        <div className="space-y-2">
          {payload
            .filter((p: any) => !p.dataKey.includes("Upper") && !p.dataKey.includes("Lower"))
            .sort((a: any, b: any) => b.value - a.value)
            .map((entry: any, index: number) => (
              <div key={index} className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span className="text-xs text-muted-foreground">{entry.dataKey}</span>
                </div>
                <span className="text-xs font-medium text-foreground">{entry.value}%</span>
              </div>
            ))}
        </div>
      </div>
    )
  }
  return null
}

function MiniMetricCard({
  title,
  value,
  change,
  icon,
  status,
}: {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  status: "positive" | "negative" | "warning" | "neutral"
}) {
  const statusColors = {
    positive: "text-emerald-400",
    negative: "text-red-400",
    warning: "text-amber-400",
    neutral: "text-primary",
  }

  return (
    <div className="glass glow-border rounded-lg p-4 flex-1 min-w-[180px]">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-foreground">{value}</span>
        <span className={cn("text-xs font-medium flex items-center gap-0.5", statusColors[status])}>
          {change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {change > 0 ? "+" : ""}{change}%
        </span>
      </div>
    </div>
  )
}

export function ElectionForecast() {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("30d")
  const [selectedParties, setSelectedParties] = useState<string[]>(Object.keys(partyColors))
  const [isAnimating, setIsAnimating] = useState(true)

  const timeFilterDays: Record<TimeFilter, number> = {
    "7d": 7,
    "30d": 30,
    "6m": 180,
    "1y": 365,
  }

  const data = useMemo(() => {
    return generateProbabilityData(timeFilterDays[timeFilter])
  }, [timeFilter])

  // Get current leader
  const latestData = data[data.length - 1]
  const parties = Object.keys(partyColors)
  const sortedParties = parties.sort((a, b) => (latestData[b] as number) - (latestData[a] as number))
  const leader = sortedParties[0]
  const leaderValue = latestData[leader] as number

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 2000)
    return () => clearTimeout(timer)
  }, [timeFilter])

  const toggleParty = (party: string) => {
    setSelectedParties((prev) =>
      prev.includes(party) ? prev.filter((p) => p !== party) : [...prev, party]
    )
  }

  return (
    <section className="px-6 py-16">
      <div className="max-w-[1600px] mx-auto">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                National Election Forecast Engine
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                AI-generated probability forecasting based on political events, economic indicators, public sentiment, and historical election analysis.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Chart Area */}
          <div className="xl:col-span-3">
            <div className="glass glow-border rounded-xl p-6">
              {/* Chart Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">Party Probability Trends</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Projected win probability with confidence intervals
                  </p>
                </div>

                {/* Time Filters */}
                <div className="flex items-center gap-1 p-1 bg-secondary/50 rounded-lg">
                  {(["7d", "30d", "6m", "1y"] as TimeFilter[]).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setTimeFilter(filter)
                        setIsAnimating(true)
                      }}
                      className={cn(
                        "px-4 py-1.5 rounded-md text-xs font-medium transition-all duration-200",
                        timeFilter === filter
                          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      )}
                    >
                      {filter === "7d" && "7 Days"}
                      {filter === "30d" && "30 Days"}
                      {filter === "6m" && "6 Months"}
                      {filter === "1y" && "1 Year"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Party Legend/Toggles */}
              <div className="flex flex-wrap gap-2 mb-6">
                {parties.map((party) => (
                  <button
                    key={party}
                    onClick={() => toggleParty(party)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border",
                      selectedParties.includes(party)
                        ? "border-transparent"
                        : "border-border/50 opacity-40 hover:opacity-70"
                    )}
                    style={{
                      backgroundColor: selectedParties.includes(party)
                        ? `${partyColors[party]}20`
                        : "transparent",
                      color: selectedParties.includes(party)
                        ? partyColors[party]
                        : undefined,
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: partyColors[party] }}
                    />
                    {party}
                    <span className="ml-1 opacity-70">{latestData[party]}%</span>
                  </button>
                ))}
              </div>

              {/* Main Chart */}
              <div className="h-[400px] relative">
                {/* Live indicator */}
                <div className="absolute top-2 right-2 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-background/80 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  <span className="text-[10px] font-medium text-primary uppercase tracking-wider">
                    Live Data
                  </span>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                    <defs>
                      {parties.map((party) => (
                        <linearGradient key={party} id={`gradient-${party}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor={partyColors[party]} stopOpacity={0.3} />
                          <stop offset="100%" stopColor={partyColors[party]} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.25 0.02 250)" />
                    <XAxis
                      dataKey="date"
                      stroke="oklch(0.5 0.02 250)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="oklch(0.5 0.02 250)"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                      domain={[0, 50]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    
                    {/* Confidence interval areas (rendered first, behind lines) */}
                    {selectedParties.map((party) => (
                      <Area
                        key={`area-${party}`}
                        type="monotone"
                        dataKey={party}
                        stroke="none"
                        fill={`url(#gradient-${party})`}
                        fillOpacity={0.2}
                        isAnimationActive={isAnimating}
                        animationDuration={1500}
                      />
                    ))}

                    {/* Main probability lines */}
                    {selectedParties.map((party) => (
                      <Line
                        key={party}
                        type="monotone"
                        dataKey={party}
                        stroke={partyColors[party]}
                        strokeWidth={2.5}
                        dot={false}
                        activeDot={{
                          r: 6,
                          stroke: partyColors[party],
                          strokeWidth: 2,
                          fill: "oklch(0.12 0.02 250)",
                        }}
                        isAnimationActive={isAnimating}
                        animationDuration={1500}
                      />
                    ))}

                    {/* Reference line for 25% threshold */}
                    <ReferenceLine
                      y={25}
                      stroke="oklch(0.4 0.02 250)"
                      strokeDasharray="5 5"
                      label={{
                        value: "Viability threshold",
                        position: "right",
                        fill: "oklch(0.5 0.02 250)",
                        fontSize: 10,
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Volatility markers */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/30">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="text-xs text-muted-foreground">High volatility period</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Momentum shift detected</span>
                  </div>
                </div>
                <span className="text-[10px] text-muted-foreground">
                  Last updated: {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>

            {/* Mini Metric Cards */}
            <div className="flex flex-wrap gap-4 mt-6">
              <MiniMetricCard
                title="AI Confidence Score"
                value="87.3%"
                change={2.1}
                icon={<Brain className="w-4 h-4 text-primary" />}
                status="positive"
              />
              <MiniMetricCard
                title="Political Volatility Index"
                value="42.8"
                change={-3.4}
                icon={<Activity className="w-4 h-4 text-amber-400" />}
                status="warning"
              />
              <MiniMetricCard
                title="Sentiment Momentum"
                value="+12.4"
                change={5.2}
                icon={<TrendingUp className="w-4 h-4 text-emerald-400" />}
                status="positive"
              />
              <MiniMetricCard
                title="Coalition Stability"
                value="68.9%"
                change={-1.8}
                icon={<Shield className="w-4 h-4 text-primary" />}
                status="neutral"
              />
            </div>
          </div>

          {/* AI Forecast Summary Panel */}
          <div className="xl:col-span-1">
            <div className="glass glow-border rounded-xl p-5 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">AI Forecast Summary</h3>
              </div>

              {/* Leading Party */}
              <div className="mb-6 p-4 rounded-lg bg-secondary/30 border border-border/30">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Current Leader
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: partyColors[leader] }}
                  />
                  <span className="text-lg font-bold text-foreground">{leader}</span>
                  <span
                    className="text-sm font-medium ml-auto"
                    style={{ color: partyColors[leader] }}
                  >
                    {leaderValue.toFixed(1)}%
                  </span>
                </div>
                <div className="mt-2 h-1.5 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${(leaderValue / 50) * 100}%`,
                      backgroundColor: partyColors[leader],
                    }}
                  />
                </div>
              </div>

              {/* Rising Opposition */}
              <div className="mb-6 p-4 rounded-lg bg-secondary/30 border border-border/30">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Rising Opposition
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: partyColors[sortedParties[2]] }}
                  />
                  <span className="text-base font-semibold text-foreground">
                    {sortedParties[2]}
                  </span>
                  <TrendingUp className="w-4 h-4 text-emerald-400 ml-auto" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  +4.2% momentum in last 7 days
                </p>
              </div>

              {/* Key Alerts */}
              <div className="mb-6">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Regional Alerts
                </span>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-400/10 border border-amber-400/20">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs text-amber-400">North-Central instability</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-primary">Southwest coalition forming</span>
                  </div>
                </div>
              </div>

              {/* AI Insights Feed */}
              <div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  AI Intelligence Feed
                </span>
                <div className="mt-3 space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {aiInsights.map((insight, index) => (
                    <div
                      key={index}
                      className={cn(
                        "p-3 rounded-lg border transition-all duration-200 hover:bg-secondary/50 cursor-pointer group",
                        insight.type === "rising" && "border-emerald-400/20 bg-emerald-400/5",
                        insight.type === "falling" && "border-red-400/20 bg-red-400/5",
                        insight.type === "alert" && "border-amber-400/20 bg-amber-400/5",
                        insight.type === "neutral" && "border-border/30 bg-secondary/20"
                      )}
                    >
                      <div className="flex items-start gap-2">
                        {insight.type === "rising" && (
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        )}
                        {insight.type === "falling" && (
                          <TrendingDown className="w-3.5 h-3.5 text-red-400 mt-0.5 shrink-0" />
                        )}
                        {insight.type === "alert" && (
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                        )}
                        {insight.type === "neutral" && (
                          <Activity className="w-3.5 h-3.5 text-muted-foreground mt-0.5 shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-foreground leading-tight">
                            {insight.title}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1 line-clamp-2">
                            {insight.description}
                          </p>
                          <p className="text-[9px] text-muted-foreground/70 mt-1.5">
                            {insight.timestamp}
                          </p>
                        </div>
                        <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
