import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { MetricCards } from "@/components/metric-cards"
import { ElectionForecast } from "@/components/election-forecast"
import { LiveIntelligenceFeed } from "@/components/live-intelligence-feed"
import { ExplainableAI } from "@/components/explainable-ai"
import { SystemArchitecture } from "@/components/system-architecture"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <section className="px-6 pb-8">
          <div className="max-w-[1600px] mx-auto">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-foreground">Key Intelligence Metrics</h2>
                <p className="text-sm text-muted-foreground">Real-time analytics updated every 30 seconds</p>
              </div>
              <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All systems operational</span>
              </div>
            </div>
            
            {/* Metric Cards */}
            <MetricCards />
          </div>
        </section>

        {/* Election Forecast Engine */}
        <ElectionForecast />

        {/* Live Intelligence Feed */}
        <LiveIntelligenceFeed />

        {/* Explainable AI Section */}
        <ExplainableAI />

        {/* System Architecture */}
        <SystemArchitecture />
      </main>
    </div>
  )
}
