"use client"

import { Sparkles, ArrowRight, Radio } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-16 px-6">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute top-40 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]" />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(oklch(0.75 0.18 195 / 0.5) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.75 0.18 195 / 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Status Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass border border-primary/20">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-medium text-primary uppercase tracking-wider">System Online</span>
            </div>
            <div className="w-px h-4 bg-border" />
            <span className="text-xs text-muted-foreground">Last sync: 2 seconds ago</span>
          </div>
        </div>

        {/* Main Heading */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-balance">
            <span className="text-foreground">National Election</span>
            <br />
            <span className="text-primary relative">
              Intelligence Overview
              <Sparkles className="absolute -top-2 -right-8 w-6 h-6 text-primary/60 animate-pulse" />
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed text-pretty">
            Real-time political forecasting powered by AI-driven event analysis and sentiment monitoring across all 36 states and the FCT.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-12 text-base font-medium glow-border"
          >
            <span>Access Dashboard</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-border/50 hover:bg-secondary px-8 h-12 text-base font-medium"
          >
            View Analytics Report
          </Button>
        </div>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-8">
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground">36+</div>
            <div className="text-sm text-muted-foreground">States Monitored</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">2.4M</div>
            <div className="text-sm text-muted-foreground">Data Points Daily</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-foreground">99.2%</div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </div>
          <div className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-emerald-400">Real-time</div>
            <div className="text-sm text-muted-foreground">Analysis Processing</div>
          </div>
        </div>
      </div>
    </section>
  )
}
