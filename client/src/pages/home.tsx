import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import BirthForm from "@/components/birth-form";
import ChartWheel from "@/components/chart-wheel";
import PlanetaryPositions from "@/components/planetary-positions";
import HousesDisplay from "@/components/houses-display";
import AspectsDisplay from "@/components/aspects-display";
import Interpretations from "@/components/interpretations";
import ChartSummary from "@/components/chart-summary";
import { Button } from "@/components/ui/button";
import { Star, BookOpen, Share2, Menu } from "lucide-react";
import type { NatalChart } from "@shared/schema";

function QuickOverview({ planetaryData, housesData }: { planetaryData: any, housesData: any }) {
  const planets = planetaryData as any[];
  const houses = housesData as any[];
  const sun = planets.find((p: any) => p.name === "sun");
  const moon = planets.find((p: any) => p.name === "moon");
  const ascendant = houses && houses[0];

  return (
    <>
      {/* Sun Sign */}
      {sun && (
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <span className="flex items-center">
            <span className="text-amber-400 mr-2">☉</span>
            Sun Sign
          </span>
          <span className="font-medium text-primary capitalize">
            {sun.zodiacSign}
          </span>
        </div>
      )}
      
      {/* Moon Sign */}
      {moon && (
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <span className="flex items-center">
            <span className="text-blue-300 mr-2">☽</span>
            Moon Sign
          </span>
          <span className="font-medium text-accent capitalize">
            {moon.zodiacSign}
          </span>
        </div>
      )}
      
      {/* Rising Sign */}
      {ascendant && (
        <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
          <span className="flex items-center">
            <span className="text-green-400 mr-2">↑</span>
            Rising Sign
          </span>
          <span className="font-medium text-primary capitalize">
            {ascendant.zodiacSign}
          </span>
        </div>
      )}
    </>
  );
}

export default function Home() {
  const [selectedChart, setSelectedChart] = useState<NatalChart | null>(null);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Star className="w-4 h-4 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-serif font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Celestial Chart
              </h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                <Menu className="w-4 h-4 mr-2" />
                Charts
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                <BookOpen className="w-4 h-4 mr-2" />
                Learn
              </button>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Panel - Birth Information */}
          <div className="xl:col-span-1 space-y-6">
            <BirthForm onChartCalculated={setSelectedChart} />
            
            {selectedChart && (
              <div className="gradient-border">
                <div className="p-6">
                  <h3 className="text-lg font-serif font-semibold mb-4 flex items-center">
                    <Star className="w-5 h-5 text-accent mr-3" />
                    Quick Overview
                  </h3>
                  <div className="space-y-3">
                    {selectedChart.planetaryData && Array.isArray(selectedChart.planetaryData) ? (
                      <QuickOverview 
                        planetaryData={selectedChart.planetaryData}
                        housesData={selectedChart.housesData}
                      />
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Center Panel - Natal Chart Wheel */}
          <div className="xl:col-span-1">
            <ChartWheel chart={selectedChart} />
          </div>

          {/* Right Panel - Detailed Information */}
          <div className="xl:col-span-1 space-y-6">
            {selectedChart && (
              <>
                <PlanetaryPositions chart={selectedChart} />
                <HousesDisplay chart={selectedChart} />
                <AspectsDisplay chart={selectedChart} />
              </>
            )}
          </div>
        </div>

        {/* Chart Summary Section */}
        {selectedChart && (
          <section className="mt-12">
            <ChartSummary chart={selectedChart} />
          </section>
        )}

        {/* Detailed Interpretations Section */}
        {selectedChart && (
          <section className="mt-12">
            <Interpretations chart={selectedChart} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 text-center text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-sm">
            © 2024 Celestial Chart. Calculations based on astronomical algorithms for accuracy.
          </p>
          <p className="text-xs mt-2 opacity-75">
            For entertainment purposes. Not intended as professional astrological advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
