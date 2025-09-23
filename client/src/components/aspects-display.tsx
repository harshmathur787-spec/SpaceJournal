import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GitBranch } from "lucide-react";
import type { NatalChart, AspectData } from "@shared/schema";

interface AspectsDisplayProps {
  chart: NatalChart;
}

const ASPECT_COLORS: Record<string, string> = {
  conjunction: "text-yellow-400",
  opposition: "text-red-400",
  trine: "text-green-400", 
  square: "text-orange-400",
  sextile: "text-blue-400",
  semisquare: "text-orange-300",
  sesquiquadrate: "text-orange-300",
  quincunx: "text-purple-400"
};

const ASPECT_SYMBOLS: Record<string, string> = {
  conjunction: "☌",
  opposition: "☍",
  trine: "△",
  square: "□",
  sextile: "⚹",
  semisquare: "⚺",
  sesquiquadrate: "⚼",
  quincunx: "⚻"
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

export default function AspectsDisplay({ chart }: AspectsDisplayProps) {
  const [showAll, setShowAll] = useState(false);
  
  const aspects = chart.aspectsData as AspectData[] | null;
  
  if (!aspects || !Array.isArray(aspects)) {
    return (
      <div className="gradient-border">
        <div className="p-6">
          <h3 className="text-lg font-serif font-semibold mb-4 flex items-center">
            <GitBranch className="w-5 h-5 text-primary mr-3" />
            Major Aspects
          </h3>
          <p className="text-muted-foreground">No aspect data available</p>
        </div>
      </div>
    );
  }

  const displayedAspects = showAll ? aspects : aspects.slice(0, 6);

  return (
    <div className="gradient-border" data-testid="aspects-display">
      <div className="p-6">
        <h3 className="text-lg font-serif font-semibold mb-4 flex items-center">
          <GitBranch className="w-5 h-5 text-primary mr-3" />
          Major Aspects
        </h3>
        
        <div className="space-y-3">
          {displayedAspects.map((aspect, index) => (
            <div
              key={`${aspect.planet1}-${aspect.planet2}-${aspect.aspectType}`}
              className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
              data-testid={`aspect-${index}`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-amber-400">
                  {PLANET_SYMBOLS[aspect.planet1] || aspect.planet1}
                </span>
                <span className={`text-xs ${ASPECT_COLORS[aspect.aspectType] || "text-muted-foreground"}`}>
                  {ASPECT_SYMBOLS[aspect.aspectType] || "○"}
                </span>
                <span className="text-blue-300">
                  {PLANET_SYMBOLS[aspect.planet2] || aspect.planet2}
                </span>
              </div>
              <div className="text-right text-sm">
                <div className={`font-medium capitalize ${ASPECT_COLORS[aspect.aspectType] || "text-foreground"}`}>
                  {aspect.aspectType}
                </div>
                <div className="text-xs text-muted-foreground">
                  Orb: {aspect.orb.toFixed(1)}°
                  {aspect.isApplying && " (applying)"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {aspects.length > 6 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-toggle-aspects"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                View All Aspects <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
