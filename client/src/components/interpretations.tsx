import { Button } from "@/components/ui/button";
import { BookOpen, Star, Moon, ArrowUp } from "lucide-react";
import type { NatalChart, PlanetPosition } from "@shared/schema";
import interpretations from "../../../server/data/interpretations.json";

interface InterpretationsProps {
  chart: NatalChart;
}

export default function Interpretations({ chart }: InterpretationsProps) {
  const planets = chart.planetaryData as PlanetPosition[] | null;
  
  if (!planets || !Array.isArray(planets)) {
    return null;
  }

  const sun = planets.find(p => p.name === "sun");
  const moon = planets.find(p => p.name === "moon");
  const houses = chart.housesData as any[] | null;
  const ascendant = houses?.[0]; // First house cusp is the ascendant

  const getSunInterpretation = () => {
    if (!sun) return "Sun position not available";
    return interpretations.planets.sun[sun.zodiacSign as keyof typeof interpretations.planets.sun] || 
           "Interpretation not available for this sign";
  };

  const getMoonInterpretation = () => {
    if (!moon) return "Moon position not available";
    return interpretations.planets.moon[moon.zodiacSign as keyof typeof interpretations.planets.moon] || 
           "Interpretation not available for this sign";
  };

  const getAscendantInterpretation = () => {
    if (!ascendant) return "Rising sign not available";
    return `With ${ascendant.zodiacSign} rising, you project ${ascendant.zodiacSign} energy to the world.`;
  };

  const getHouseInterpretation = (houseNumber: number) => {
    return interpretations.houses[houseNumber.toString() as keyof typeof interpretations.houses] || 
           "House interpretation not available";
  };

  return (
    <section data-testid="interpretations">
      <div className="gradient-border">
        <div className="p-8">
          <h2 className="text-2xl font-serif font-semibold mb-6 text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Detailed Astrological Interpretation
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Sun Sign Interpretation */}
            {sun && (
              <div className="bg-muted/30 rounded-lg p-6 hover:bg-muted/40 transition-colors" data-testid="sun-interpretation">
                <div className="flex items-center mb-4">
                  <Star className="w-6 h-6 text-amber-400 mr-3" />
                  <div>
                    <h3 className="font-semibold capitalize">Sun in {sun.zodiacSign}</h3>
                    <p className="text-sm text-muted-foreground">House {sun.house}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {getSunInterpretation()}
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  {getHouseInterpretation(sun.house)}
                </div>
              </div>
            )}

            {/* Moon Sign Interpretation */}
            {moon && (
              <div className="bg-muted/30 rounded-lg p-6 hover:bg-muted/40 transition-colors" data-testid="moon-interpretation">
                <div className="flex items-center mb-4">
                  <Moon className="w-6 h-6 text-blue-300 mr-3" />
                  <div>
                    <h3 className="font-semibold capitalize">Moon in {moon.zodiacSign}</h3>
                    <p className="text-sm text-muted-foreground">House {moon.house}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {getMoonInterpretation()}
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  {getHouseInterpretation(moon.house)}
                </div>
              </div>
            )}

            {/* Rising Sign Interpretation */}
            {ascendant && (
              <div className="bg-muted/30 rounded-lg p-6 hover:bg-muted/40 transition-colors" data-testid="ascendant-interpretation">
                <div className="flex items-center mb-4">
                  <ArrowUp className="w-6 h-6 text-green-400 mr-3" />
                  <div>
                    <h3 className="font-semibold capitalize">{ascendant.zodiacSign} Rising</h3>
                    <p className="text-sm text-muted-foreground">1st House</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {getAscendantInterpretation()}
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  {getHouseInterpretation(1)}
                </div>
              </div>
            )}

            {/* Additional Planetary Interpretations */}
            {planets.slice(2, 5).map((planet) => (
              <div 
                key={planet.name}
                className="bg-muted/30 rounded-lg p-6 hover:bg-muted/40 transition-colors"
                data-testid={`${planet.name}-interpretation`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{planet.symbol}</span>
                  <div>
                    <h3 className="font-semibold capitalize">{planet.name} in {planet.zodiacSign}</h3>
                    <p className="text-sm text-muted-foreground">House {planet.house}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Your {planet.name} in {planet.zodiacSign} brings unique energy to your personality and life path.
                </p>
                <div className="mt-3 text-xs text-muted-foreground">
                  {getHouseInterpretation(planet.house)}
                </div>
              </div>
            ))}
          </div>

          {/* Expand Button */}
          <div className="text-center mt-6">
            <Button 
              className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-secondary-foreground hover:shadow-lg hover:shadow-accent/25 transition-all"
              data-testid="button-complete-interpretation"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Read Complete Interpretation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
