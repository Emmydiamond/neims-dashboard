"use client"

import { useState, useEffect } from "react"
import {
  Newspaper,
  Twitter,
  TrendingUp,
  FileText,
  Rss,
  AlertTriangle,
  Users,
  Shield,
  DollarSign,
  Brain,
  BarChart3,
  Activity,
  Target,
  Zap,
  LineChart,
  Radio,
  Map,
  Lightbulb,
  ChevronRight,
  Cpu,
  Database,
  Network,
  Sparkles,
} from "lucide-react"

const dataSourceItems = [
  { icon: Newspaper, label: "News Websites", color: "cyan" },
  { icon: Twitter, label: "Social Media", color: "blue" },
  { icon: TrendingUp, label: "Economic Data", color: "emerald" },
  { icon: FileText, label: "Gov Reports", color: "amber" },
  { icon: Rss, label: "Political Blogs", color: "violet" },
]

const eventDetectionItems = [
  { icon: AlertTriangle, label: "Political Events" },
  { icon: Users, label: "Protest Detection" },
  { icon: DollarSign, label: "Economic Signals" },
  { icon: Shield, label: "Security Incidents" },
]

const sentimentItems = [
  { icon: Brain, label: "Public Mood" },
  { icon: Map, label: "Regional Sentiment" },
  { icon: Users, label: "Youth Engagement" },
  { icon: Activity, label: "Political Tone" },
]

const forecastItems = [
  { icon: Target, label: "Probability Calc" },
  { icon: BarChart3, label: "Historical Compare" },
  { icon: Network, label: "Coalition Weight" },
  { icon: Zap, label: "Volatility Score" },
  { icon: Sparkles, label: "Confidence Score" },
]

const visualizationItems = [
  { icon: LineChart, label: "Probability Charts" },
  { icon: Radio, label: "Live Feed" },
  { icon: Map, label: "Nigeria Heatmap" },
  { icon: Lightbulb, label: "Explainable AI" },
]

function DataFlowArrow({ delay = 0 }: { delay?: number }) {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center px-2">
      <div className="relative h-full flex items-center">
        {/* Vertical connector line */}
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent" />
        
        {/* Animated data packets */}
        <div 
          className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          style={{
            animation: `flowDown 2s ease-in-out infinite`,
            animationDelay: `${delay}ms`,
          }}
        />
      </div>
      <ChevronRight className="w-5 h-5 text-cyan-400 rotate-90 mt-1" />
    </div>
  )
}

function HorizontalFlowArrow({ delay = 0 }: { delay?: number }) {
  return (
    <div className="hidden xl:flex items-center justify-center px-4">
      <div className="relative flex items-center">
        {/* Horizontal connector line */}
        <div className="h-px w-12 bg-gradient-to-r from-cyan-500/30 via-cyan-500/60 to-cyan-500/30" />
        
        {/* Glowing center */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400/50"
          style={{
            animation: `pulse 2s ease-in-out infinite`,
            animationDelay: `${delay}ms`,
          }}
        />
        
        {/* Animated data packet */}
        <div 
          className="absolute w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          style={{
            animation: `flowRight 1.5s ease-in-out infinite`,
            animationDelay: `${delay}ms`,
          }}
        />
      </div>
      <ChevronRight className="w-5 h-5 text-cyan-400 ml-1" />
    </div>
  )
}

interface LayerCardProps {
  title: string
  icon: React.ElementType
  items: Array<{ icon: React.ElementType; label: string; color?: string }>
  gradient: string
  delay: number
}

function LayerCard({ title, icon: Icon, items, gradient, delay }: LayerCardProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div
      className={`
        relative flex-1 min-w-[200px] max-w-[280px]
        bg-slate-900/60 backdrop-blur-xl
        border border-slate-700/50 rounded-xl
        overflow-hidden transition-all duration-700
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
    >
      {/* Top gradient bar */}
      <div className={`h-1 w-full bg-gradient-to-r ${gradient}`} />

      {/* Scanning line animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent"
          style={{
            animation: "scanVertical 3s ease-in-out infinite",
            animationDelay: `${delay}ms`,
          }}
        />
      </div>

      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${gradient} bg-opacity-20`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 uppercase tracking-wider">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Items */}
      <div className="p-3 space-y-2">
        {items.map((item, idx) => (
          <div
            key={item.label}
            className="flex items-center gap-2.5 p-2 rounded-lg bg-slate-800/40 hover:bg-slate-800/60 transition-colors group"
            style={{
              animationDelay: `${delay + idx * 100}ms`,
            }}
          >
            <div className={`
              p-1.5 rounded-md 
              ${item.color === "cyan" ? "bg-cyan-500/20 text-cyan-400" :
                item.color === "blue" ? "bg-blue-500/20 text-blue-400" :
                item.color === "emerald" ? "bg-emerald-500/20 text-emerald-400" :
                item.color === "amber" ? "bg-amber-500/20 text-amber-400" :
                item.color === "violet" ? "bg-violet-500/20 text-violet-400" :
                "bg-slate-700/50 text-slate-400"}
              group-hover:scale-110 transition-transform
            `}>
              <item.icon className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs text-slate-300">{item.label}</span>
            
            {/* Activity indicator */}
            <div className="ml-auto flex items-center gap-1">
              <div 
                className="w-1 h-1 rounded-full bg-cyan-400"
                style={{
                  animation: "pulse 1.5s ease-in-out infinite",
                  animationDelay: `${idx * 200}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom data flow indicator */}
      <div className="px-4 pb-3">
        <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
            style={{
              animation: "dataFlow 2s ease-in-out infinite",
              animationDelay: `${delay}ms`,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export function SystemArchitecture() {
  const [dataPackets, setDataPackets] = useState<number[]>([])

  useEffect(() => {
    // Generate random data packets periodically
    const interval = setInterval(() => {
      setDataPackets((prev) => {
        const newPackets = [...prev, Date.now()]
        return newPackets.slice(-5) // Keep only last 5 packets
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="px-6 py-16 relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* Animated background orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-cyan-400 font-medium">Technical Infrastructure</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            AI System Architecture Overview
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            How NEIMS transforms raw political data into election probability forecasts in real time.
          </p>

          {/* Live System Active Badge */}
          <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            <span className="text-sm font-medium text-emerald-400 uppercase tracking-wider">
              Live System Active
            </span>
          </div>
        </div>

        {/* Architecture Flow - Horizontal on XL screens */}
        <div className="hidden xl:flex items-stretch justify-center gap-0">
          <LayerCard
            title="Data Sources"
            icon={Database}
            items={dataSourceItems}
            gradient="from-cyan-500 to-blue-500"
            delay={0}
          />
          <HorizontalFlowArrow delay={200} />
          <LayerCard
            title="Event Detection"
            icon={AlertTriangle}
            items={eventDetectionItems}
            gradient="from-amber-500 to-orange-500"
            delay={200}
          />
          <HorizontalFlowArrow delay={400} />
          <LayerCard
            title="Sentiment Analysis"
            icon={Brain}
            items={sentimentItems}
            gradient="from-violet-500 to-purple-500"
            delay={400}
          />
          <HorizontalFlowArrow delay={600} />
          <LayerCard
            title="Forecast Model"
            icon={Target}
            items={forecastItems}
            gradient="from-emerald-500 to-teal-500"
            delay={600}
          />
          <HorizontalFlowArrow delay={800} />
          <LayerCard
            title="Visualization"
            icon={BarChart3}
            items={visualizationItems}
            gradient="from-pink-500 to-rose-500"
            delay={800}
          />
        </div>

        {/* Architecture Flow - Vertical on smaller screens */}
        <div className="xl:hidden flex flex-col items-center gap-0">
          <LayerCard
            title="Data Sources"
            icon={Database}
            items={dataSourceItems}
            gradient="from-cyan-500 to-blue-500"
            delay={0}
          />
          <DataFlowArrow delay={200} />
          <LayerCard
            title="Event Detection"
            icon={AlertTriangle}
            items={eventDetectionItems}
            gradient="from-amber-500 to-orange-500"
            delay={200}
          />
          <DataFlowArrow delay={400} />
          <LayerCard
            title="Sentiment Analysis"
            icon={Brain}
            items={sentimentItems}
            gradient="from-violet-500 to-purple-500"
            delay={400}
          />
          <DataFlowArrow delay={600} />
          <LayerCard
            title="Forecast Model"
            icon={Target}
            items={forecastItems}
            gradient="from-emerald-500 to-teal-500"
            delay={600}
          />
          <DataFlowArrow delay={800} />
          <LayerCard
            title="Visualization"
            icon={BarChart3}
            items={visualizationItems}
            gradient="from-pink-500 to-rose-500"
            delay={800}
          />
        </div>

        {/* Data Flow Statistics */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Data Points/Hour", value: "2.4M+", icon: Database },
            { label: "Events Detected/Day", value: "15,000+", icon: AlertTriangle },
            { label: "Sentiment Analyses/Min", value: "840", icon: Brain },
            { label: "Model Updates/Hour", value: "120", icon: Target },
          ].map((stat, idx) => (
            <div
              key={stat.label}
              className="relative p-4 rounded-xl bg-slate-900/40 backdrop-blur border border-slate-700/50 overflow-hidden group hover:border-cyan-500/30 transition-colors"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative flex items-center gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10">
                  <stat.icon className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Processing Pipeline Visualization */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/40 backdrop-blur border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-medium text-foreground">Real-Time Processing Pipeline</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Processing 847 events/second</span>
            </div>
          </div>

          {/* Pipeline progress bars */}
          <div className="space-y-2">
            {[
              { stage: "Ingestion", progress: 98, color: "cyan" },
              { stage: "Processing", progress: 94, color: "blue" },
              { stage: "Analysis", progress: 91, color: "violet" },
              { stage: "Forecasting", progress: 87, color: "emerald" },
            ].map((pipeline, idx) => (
              <div key={pipeline.stage} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-20">{pipeline.stage}</span>
                <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      pipeline.color === "cyan" ? "bg-cyan-500" :
                      pipeline.color === "blue" ? "bg-blue-500" :
                      pipeline.color === "violet" ? "bg-violet-500" :
                      "bg-emerald-500"
                    }`}
                    style={{
                      width: `${pipeline.progress}%`,
                      animation: "pipelineFlow 3s ease-in-out infinite",
                      animationDelay: `${idx * 200}ms`,
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-foreground w-10">{pipeline.progress}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes scanVertical {
          0%, 100% { top: 0%; opacity: 0; }
          50% { top: 100%; opacity: 1; }
        }
        @keyframes dataFlow {
          0% { width: 0%; margin-left: 0; }
          50% { width: 100%; margin-left: 0; }
          100% { width: 0%; margin-left: 100%; }
        }
        @keyframes flowRight {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        @keyframes flowDown {
          0% { top: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes pipelineFlow {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
