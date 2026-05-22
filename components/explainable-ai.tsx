"use client"

import { useState, useEffect } from "react"
import {
  TrendingUp,
  TrendingDown,
  Brain,
  Activity,
  CheckCircle2,
  Zap,
  BarChart3,
  Users,
  Shield,
  Flame,
  MapPin,
  Handshake,
  ArrowRight,
  Sparkles,
  CircleDot,
  AlertTriangle,
  ChevronUp,
  ChevronDown,
  Minus,
} from "lucide-react"

// Key drivers data
const keyDrivers = [
  {
    id: 1,
    name: "Economic Pressure Impact",
    icon: BarChart3,
    direction: "up",
    impact: 87,
    explanation: "Rising inflation and currency devaluation increasing voter dissatisfaction with incumbent",
    color: "text-red-400",
    bgColor: "bg-red-500/20",
  },
  {
    id: 2,
    name: "Public Sentiment Shift",
    icon: Users,
    direction: "down",
    impact: 72,
    explanation: "Social media analysis shows 12% decrease in positive mentions of ruling party",
    color: "text-amber-400",
    bgColor: "bg-amber-500/20",
  },
  {
    id: 3,
    name: "Regional Political Movement",
    icon: MapPin,
    direction: "up",
    impact: 65,
    explanation: "North-Central and Southwest regions showing increased opposition activity",
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/20",
  },
  {
    id: 4,
    name: "Coalition Activity Changes",
    icon: Handshake,
    direction: "up",
    impact: 58,
    explanation: "Labour Party and PDP exploratory talks detected, potential alliance forming",
    color: "text-purple-400",
    bgColor: "bg-purple-500/20",
  },
  {
    id: 5,
    name: "Security Situation Influence",
    icon: Shield,
    direction: "neutral",
    impact: 42,
    explanation: "Security conditions stable, minimal impact on current forecast models",
    color: "text-slate-400",
    bgColor: "bg-slate-500/20",
  },
  {
    id: 6,
    name: "Youth Engagement Trends",
    icon: Flame,
    direction: "up",
    impact: 78,
    explanation: "18-35 demographic showing 23% increase in political registration and activity",
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/20",
  },
]

// AI reasoning pipeline steps
const reasoningSteps = [
  {
    id: 1,
    name: "Event Detection",
    description: "Scanning 847 news sources and social feeds",
    status: "completed",
    confidence: 98,
  },
  {
    id: 2,
    name: "Sentiment Analysis",
    description: "Processing 2.4M data points for sentiment signals",
    status: "completed",
    confidence: 94,
  },
  {
    id: 3,
    name: "Historical Comparison",
    description: "Matching patterns with 12 previous election cycles",
    status: "completed",
    confidence: 89,
  },
  {
    id: 4,
    name: "Political Weighting",
    description: "Applying regional and demographic weight factors",
    status: "active",
    confidence: 91,
  },
  {
    id: 5,
    name: "Probability Update",
    description: "Generating final forecast probability distribution",
    status: "pending",
    confidence: 0,
  },
]

// Forecast change summary data
const forecastChanges = [
  { party: "APC", change: -2.4, color: "bg-emerald-500" },
  { party: "PDP", change: +1.8, color: "bg-blue-500" },
  { party: "Labour", change: +3.1, color: "bg-red-500" },
  { party: "NNPP", change: -0.7, color: "bg-amber-500" },
]

const insights = [
  {
    text: "Rising inflation reduced incumbent confidence by 2.4 percentage points",
    type: "negative",
  },
  {
    text: "Youth engagement shift increased opposition momentum across 4 states",
    type: "positive",
  },
  {
    text: "Regional coalition activity increased overall market volatility index",
    type: "neutral",
  },
]

export function ExplainableAI() {
  const [activeStep, setActiveStep] = useState(3)
  const [animatedImpacts, setAnimatedImpacts] = useState<Record<number, number>>({})

  // Animate impact bars on mount
  useEffect(() => {
    const timers: NodeJS.Timeout[] = []
    keyDrivers.forEach((driver, index) => {
      timers.push(
        setTimeout(() => {
          setAnimatedImpacts((prev) => ({ ...prev, [driver.id]: driver.impact }))
        }, index * 150)
      )
    })
    return () => timers.forEach(clearTimeout)
  }, [])

  // Cycle through active reasoning step
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 4 ? 3 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const getDirectionIcon = (direction: string) => {
    if (direction === "up") return <ChevronUp className="w-4 h-4 text-red-400" />
    if (direction === "down") return <ChevronDown className="w-4 h-4 text-emerald-400" />
    return <Minus className="w-4 h-4 text-slate-400" />
  }

  const getStepStatus = (stepId: number) => {
    if (stepId < activeStep) return "completed"
    if (stepId === activeStep) return "active"
    return "pending"
  }

  return (
    <section className="px-6 py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="max-w-[1600px] mx-auto relative">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
              <Brain className="w-5 h-5 text-cyan-400" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">
              Why Did the Forecast Change?
            </h2>
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
          </div>
          <p className="text-sm text-muted-foreground max-w-2xl">
            AI-driven explanation of political probability shifts based on real-world signals,
            sentiment changes, and economic indicators.
          </p>
        </div>

        {/* Three Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Panel 1: Key Drivers of Change */}
          <div className="lg:col-span-1 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 bg-card/50">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                <h3 className="font-medium text-foreground">Key Drivers of Change</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Top factors affecting probability shifts
              </p>
            </div>
            <div className="p-4 space-y-3">
              {keyDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className="p-3 rounded-lg bg-background/50 border border-border/30 hover:border-cyan-500/30 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-1.5 rounded-md ${driver.bgColor}`}>
                      <driver.icon className={`w-3.5 h-3.5 ${driver.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-sm font-medium text-foreground truncate">
                          {driver.name}
                        </span>
                        <div className="flex items-center gap-1">
                          {getDirectionIcon(driver.direction)}
                          <span className={`text-xs font-semibold ${driver.color}`}>
                            {driver.impact}%
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {driver.explanation}
                      </p>
                      {/* Impact bar */}
                      <div className="mt-2 h-1.5 bg-background rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ease-out ${driver.bgColor.replace("/20", "")}`}
                          style={{ width: `${animatedImpacts[driver.id] || 0}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Panel 2: AI Reasoning Breakdown */}
          <div className="lg:col-span-1 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 bg-card/50">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <h3 className="font-medium text-foreground">AI Reasoning Pipeline</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Step-by-step reasoning flow visualization
              </p>
            </div>
            <div className="p-4">
              <div className="space-y-1">
                {reasoningSteps.map((step, index) => {
                  const status = getStepStatus(step.id)
                  const isLast = index === reasoningSteps.length - 1

                  return (
                    <div key={step.id}>
                      <div
                        className={`p-3 rounded-lg border transition-all duration-300 ${
                          status === "active"
                            ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.1)]"
                            : status === "completed"
                              ? "bg-emerald-500/5 border-emerald-500/20"
                              : "bg-background/30 border-border/30"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {/* Status indicator */}
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              status === "completed"
                                ? "bg-emerald-500/20"
                                : status === "active"
                                  ? "bg-cyan-500/20"
                                  : "bg-slate-500/10"
                            }`}
                          >
                            {status === "completed" ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            ) : status === "active" ? (
                              <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse" />
                            ) : (
                              <CircleDot className="w-4 h-4 text-slate-500" />
                            )}
                          </div>

                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-sm font-medium ${
                                  status === "pending"
                                    ? "text-muted-foreground"
                                    : "text-foreground"
                                }`}
                              >
                                {step.name}
                              </span>
                              {status !== "pending" && (
                                <span
                                  className={`text-xs font-semibold ${
                                    status === "completed"
                                      ? "text-emerald-400"
                                      : "text-cyan-400"
                                  }`}
                                >
                                  {step.confidence}%
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-xs mt-0.5 ${
                                status === "pending"
                                  ? "text-muted-foreground/50"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {step.description}
                            </p>
                          </div>
                        </div>

                        {/* Progress bar for active step */}
                        {status === "active" && (
                          <div className="mt-2 h-1 bg-background rounded-full overflow-hidden">
                            <div className="h-full bg-cyan-500 rounded-full animate-[progress_2s_ease-in-out_infinite]" />
                          </div>
                        )}
                      </div>

                      {/* Connector arrow */}
                      {!isLast && (
                        <div className="flex justify-center py-1">
                          <ArrowRight
                            className={`w-4 h-4 rotate-90 ${
                              status === "completed"
                                ? "text-emerald-500/50"
                                : "text-slate-600"
                            }`}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Overall confidence */}
              <div className="mt-4 p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">
                    Pipeline Confidence
                  </span>
                  <span className="text-sm font-semibold text-cyan-400">93.2%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 rounded-full"
                    style={{ width: "93.2%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Panel 3: Forecast Change Summary */}
          <div className="lg:col-span-1 rounded-xl border border-border/50 bg-card/30 backdrop-blur-sm overflow-hidden">
            <div className="p-4 border-b border-border/50 bg-card/50">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-cyan-400" />
                <h3 className="font-medium text-foreground">Forecast Change Summary</h3>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Party probability shifts and analysis
              </p>
            </div>
            <div className="p-4 space-y-4">
              {/* Party changes */}
              <div className="space-y-2">
                {forecastChanges.map((party) => (
                  <div
                    key={party.party}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-background/50 border border-border/30"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${party.color}`} />
                      <span className="text-sm font-medium text-foreground">
                        {party.party}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm font-semibold ${
                        party.change > 0 ? "text-emerald-400" : "text-red-400"
                      }`}
                    >
                      {party.change > 0 ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      {party.change > 0 ? "+" : ""}
                      {party.change}%
                    </div>
                  </div>
                ))}
              </div>

              {/* Influencing factors */}
              <div className="p-3 rounded-lg bg-background/50 border border-border/30">
                <h4 className="text-xs font-medium text-muted-foreground mb-2">
                  INFLUENCING FACTORS
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">Strongest Factor</span>
                    <span className="text-xs font-medium text-red-400">
                      Economic Pressure
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">Weakest Factor</span>
                    <span className="text-xs font-medium text-slate-400">
                      Security Situation
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-foreground">Market Direction</span>
                    <span className="text-xs font-medium text-amber-400">
                      Increased Volatility
                    </span>
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div>
                <h4 className="text-xs font-medium text-muted-foreground mb-2">
                  AI INSIGHTS
                </h4>
                <div className="space-y-2">
                  {insights.map((insight, index) => (
                    <div
                      key={index}
                      className={`p-2.5 rounded-lg border text-xs ${
                        insight.type === "positive"
                          ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-300"
                          : insight.type === "negative"
                            ? "bg-red-500/5 border-red-500/20 text-red-300"
                            : "bg-amber-500/5 border-amber-500/20 text-amber-300"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {insight.type === "positive" ? (
                          <TrendingUp className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        ) : insight.type === "negative" ? (
                          <TrendingDown className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        ) : (
                          <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                        )}
                        <span>{insight.text}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Last updated */}
              <div className="flex items-center justify-center gap-2 pt-2 border-t border-border/30">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs text-muted-foreground">
                  Analysis updated 12 seconds ago
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes progress {
          0% {
            width: 0%;
          }
          50% {
            width: 70%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  )
}
