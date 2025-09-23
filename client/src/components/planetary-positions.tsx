import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Globe } from "lucide-react";
import type { NatalChart, PlanetPosition } from "@shared/schema";

interface PlanetaryPositionsProps {
  chart: NatalChart;
}

const PLANET_COLORS: Record<string, string> = {
  sun: "text-amber-400",
  moon: "text-blue-300",
  mercury: "text-yellow-400",
  venus: "text-pink-400",
  mars: "text-red-400",
  jupiter: "text-purple-400",
  saturn: "text-orange-400",
  uranus: "text-cyan-400",
  neptune: "text-blue-500",
  pluto: "text-red-600"
};

const PLANET_SYMBOLS: Record<string, string> = {
  sun: "☉",
  moon: "☽",
  mercury: "☿",
  venus: "♀",
  mars: "♂",
  jupiter: "♃",
  saturn: "♄",
  uranus: "♅",
  neptune: "♆",
  pluto: "♇"
};

export default function PlanetaryPositions({ chart }: PlanetaryPositionsProps) {
  const [showAll, setShowAll] = useState(false);
  
  const planets = chart.planetaryData as PlanetPosition[] | null;
  
  if (!planets || !Array.isArray(planets)) {
    return (
      <div className="gradient-border">
        <div className="p-6">
          <h3 className="text-lg font-serif font-semibold mb-4 flex items-center">
            <Globe className="w-5 h-5 text-primary mr-3" />
            Planetary Positions
          </h3>
          <p className="text-muted-foreground">No planetary data available</p>
        </div>
      </div>
    );
  }

  const displayedPlanets = showAll ? planets : planets.slice(0, 5);

  return (
    <div className="gradient-border" data-testid="planetary-positions">
      <div className="p-6">
        <h3 className="text-lg font-serif font-semibold mb-4 flex items-center">
          <Globe className="w-5 h-5 text-primary mr-3" />
          Planetary Positions
        </h3>
        
        <div className="space-y-3">
          {displayedPlanets.map((planet) => (
            <div
              key={planet.name}
              className="flex items-center justify-between p-3 hover:bg-muted/30 rounded-lg cursor-pointer transition-colors group"
              data-testid={`planet-position-${planet.name}`}
            >
              <div className="flex items-center">
                <span className={`mr-3 group-hover:scale-110 transition-transform ${PLANET_COLORS[planet.name] || "text-white"}`}>
                  {PLANET_SYMBOLS[planet.name] || planet.symbol}
                </span>
                <span className="font-medium capitalize">{planet.name}</span>
                {planet.isRetrograde && (
                  <span className="ml-2 text-xs text-orange-400 font-medium">℞</span>
                )}
              </div>
              <div className="text-right text-sm">
                <div className="text-primary font-medium capitalize">
                  {planet.zodiacSign} {Math.floor(planet.zodiacDegree)}°{Math.floor((planet.zodiacDegree % 1) * 60)}'
                </div>
                <div className="text-muted-foreground">House {planet.house}</div>
              </div>
            </div>
          ))}
        </div>

        {planets.length > 5 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-toggle-planets"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                View All Planets <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
