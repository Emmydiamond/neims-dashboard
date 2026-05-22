"use client"

import { useEffect, useState } from "react"
import {
  Activity,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Gauge,
  Target,
  Zap,
  AlertTriangle,
} from "lucide-react"
import {
  LineChart,
  Line,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { cn } from "@/lib/utils"

interface MetricCardProps {
  title: string
  value: string | number
  change: number
  changeLabel: string
  icon: React.ReactNode
  sparklineData: number[]
  status: "positive" | "negative" | "neutral" | "warning"
  subtitle?: string
  unit?: string
}

function MetricCard({
  title,
  value,
  change,
  changeLabel,
  icon,
  sparklineData,
  status,
  subtitle,
  unit,
}: MetricCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(0)

  const statusColors = {
    positive: "text-emerald-400",
    negative: "text-red-400",
    neutral: "text-primary",
    warning: "text-amber-400",
  }

  const statusBgColors = {
    positive: "bg-emerald-400/10",
    negative: "bg-red-400/10",
    neutral: "bg-primary/10",
    warning: "bg-amber-400/10",
  }

  const chartData = sparklineData.map((value, index) => ({
    value,
    index,
  }))

  useEffect(() => {
    const target = typeof value === "number" ? value : parseFloat(value.toString().replace(/[^0-9.]/g, ""))
    const duration = 1500
    const steps = 60
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        setAnimatedValue(target)
        clearInterval(timer)
      } else {
        setAnimatedValue(current)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  const displayValue = typeof value === "number" 
    ? animatedValue.toFixed(value % 1 !== 0 ? 1 : 0)
    : value

  return (
    <div
      className={cn(
        "relative group rounded-xl p-5 transition-all duration-300 cursor-pointer",
        "glass glow-border glow-border-hover",
        "border border-border/50",
        isHovered && "border-primary/30"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background glow on hover */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500",
          "bg-gradient-to-br from-primary/5 via-transparent to-transparent",
          isHovered && "opacity-100"
        )}
      />

      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className={cn(
            "p-2.5 rounded-lg transition-all duration-300",
            statusBgColors[status],
            isHovered && "scale-110"
          )}>
            {icon}
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
            {subtitle && (
              <p className="text-[10px] text-muted-foreground/70 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        
        {/* Live indicator */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Live</span>
        </div>
      </div>

      {/* Value */}
      <div className="relative z-10 mb-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground tracking-tight">
            {displayValue}
          </span>
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>
        
        {/* Change indicator */}
        <div className="flex items-center gap-2 mt-2">
          <div className={cn(
            "flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
            statusBgColors[status],
            statusColors[status]
          )}>
            {change > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : change < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : (
              <Activity className="w-3 h-3" />
            )}
            <span>{change > 0 ? "+" : ""}{change}%</span>
          </div>
          <span className="text-xs text-muted-foreground">{changeLabel}</span>
        </div>
      </div>

      {/* Sparkline Chart */}
      <div className="h-12 relative z-10">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={`gradient-${title.replace(/\s/g, "")}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.75 0.18 195)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.75 0.18 195)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="value"
              stroke="oklch(0.75 0.18 195)"
              strokeWidth={2}
              fill={`url(#gradient-${title.replace(/\s/g, "")})`}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom shimmer effect */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 h-[1px] opacity-0 transition-opacity duration-300",
        "animate-shimmer",
        isHovered && "opacity-100"
      )} />
    </div>
  )
}

export function MetricCards() {
  const metrics: MetricCardProps[] = [
    {
      title: "Election Momentum Index",
      value: 72.4,
      change: 3.2,
      changeLabel: "vs last week",
      icon: <Zap className="w-5 h-5 text-primary" />,
      sparklineData: [45, 52, 48, 61, 58, 67, 72, 69, 74, 72],
      status: "positive",
      subtitle: "National composite score",
      unit: "pts",
    },
    {
      title: "National Sentiment Score",
      value: 64.8,
      change: -1.4,
      changeLabel: "24h change",
      icon: <Activity className="w-5 h-5 text-primary" />,
      sparklineData: [70, 68, 66, 69, 65, 67, 63, 66, 64, 65],
      status: "neutral",
      subtitle: "Public opinion aggregate",
      unit: "%",
    },
    {
      title: "Economic Pressure Index",
      value: 58.2,
      change: 5.7,
      changeLabel: "this month",
      icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
      sparklineData: [42, 45, 48, 52, 49, 54, 56, 55, 58, 58],
      status: "warning",
      subtitle: "Inflationary impact level",
      unit: "pts",
    },
    {
      title: "Political Stability Meter",
      value: 81.3,
      change: 0.8,
      changeLabel: "weekly avg",
      icon: <Gauge className="w-5 h-5 text-emerald-400" />,
      sparklineData: [78, 79, 80, 79, 81, 80, 82, 81, 81, 81],
      status: "positive",
      subtitle: "Institutional resilience",
      unit: "%",
    },
    {
      title: "Forecast Confidence",
      value: 89.7,
      change: 2.1,
      changeLabel: "model accuracy",
      icon: <Target className="w-5 h-5 text-primary" />,
      sparklineData: [85, 86, 87, 86, 88, 87, 89, 88, 90, 90],
      status: "positive",
      subtitle: "AI prediction reliability",
      unit: "%",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {metrics.map((metric, index) => (
        <MetricCard key={index} {...metric} />
      ))}
    </div>
  )
}
