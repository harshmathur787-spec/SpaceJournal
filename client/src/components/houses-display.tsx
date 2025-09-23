import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Home } from "lucide-react";
import type { NatalChart, HousePosition } from "@shared/schema";

interface HousesDisplayProps {
  chart: NatalChart;
}

export default function HousesDisplay({ chart }: HousesDisplayProps) {
  const [showAll, setShowAll] = useState(false);
  
  const houses = chart.housesData as HousePosition[] | null;
  
  if (!houses || !Array.isArray(houses)) {
    return (
      <div className="gradient-border">
        <div className="p-6">
          <h3 className="text-lg font-serif font-semibold mb-4 flex items-center">
            <Home className="w-5 h-5 text-accent mr-3" />
            Houses
          </h3>
          <p className="text-muted-foreground">No house data available</p>
        </div>
      </div>
    );
  }

  const displayedHouses = showAll ? houses : houses.slice(0, 6);

  const getOrdinal = (num: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const v = num % 100;
    return num + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
  };

  return (
    <div className="gradient-border" data-testid="houses-display">
      <div className="p-6">
        <h3 className="text-lg font-serif font-semibold mb-4 flex items-center">
          <Home className="w-5 h-5 text-accent mr-3" />
          Houses
        </h3>
        
        <div className="space-y-2">
          {displayedHouses.map((house) => (
            <div
              key={house.number}
              className="flex items-center justify-between p-2 hover:bg-muted/30 rounded cursor-pointer transition-colors"
              data-testid={`house-${house.number}`}
            >
              <span className="text-sm font-medium">
                {getOrdinal(house.number)} House
              </span>
              <span className="text-xs text-muted-foreground capitalize">
                {house.zodiacSign} {Math.floor(house.zodiacDegree)}°{Math.floor((house.zodiacDegree % 1) * 60)}'
              </span>
            </div>
          ))}
        </div>

        {houses.length > 6 && (
          <Button
            variant="ghost"
            onClick={() => setShowAll(!showAll)}
            className="w-full mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="button-toggle-houses"
          >
            {showAll ? (
              <>
                Show Less <ChevronUp className="ml-1 w-4 h-4" />
              </>
            ) : (
              <>
                View All Houses <ChevronDown className="ml-1 w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
