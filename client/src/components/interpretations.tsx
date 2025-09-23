import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Moon, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import type { NatalChart, PlanetPosition } from "@shared/schema";
import interpretations from "../../../server/data/interpretations.json";

interface InterpretationsProps {
  chart: NatalChart;
}

export default function Interpretations({ chart }: InterpretationsProps) {
  const [showComplete, setShowComplete] = useState(false);
  const planets = chart.planetaryData as PlanetPosition[] | null;
  
  if (!planets || !Array.isArray(planets)) {
    return null;
  }

  const sun = planets.find(p => p.name === "sun");
  const moon = planets.find(p => p.name === "moon");
  const houses = chart.housesData as any[] | null;
  const ascendant = houses?.[0]; // First house cusp is the ascendant

  // Generate personalized summary
  const getPersonalizedSummary = () => {
    if (!sun || !moon || !ascendant) return "Complete chart data not available";
    
    const sunSign = sun.zodiacSign;
    const moonSign = moon.zodiacSign;
    const risingSign = ascendant.zodiacSign;
    
    // Count elements for personality insights
    const elementCounts: Record<string, number> = { fire: 0, earth: 0, air: 0, water: 0 };
    planets.forEach(planet => {
      const sign = planet.zodiacSign;
      if (['aries', 'leo', 'sagittarius'].includes(sign)) elementCounts.fire++;
      else if (['taurus', 'virgo', 'capricorn'].includes(sign)) elementCounts.earth++;
      else if (['gemini', 'libra', 'aquarius'].includes(sign)) elementCounts.air++;
      else if (['cancer', 'scorpio', 'pisces'].includes(sign)) elementCounts.water++;
    });
    
    const dominantElement = Object.entries(elementCounts).reduce((a, b) => 
      elementCounts[a[0]] > elementCounts[b[0]] ? a : b)[0];
    
    const elementDescriptions: Record<string, string> = {
      fire: "passionate and dynamic",
      earth: "practical and grounded", 
      air: "intellectual and communicative",
      water: "intuitive and emotional"
    };
    
    const sunTraits: Record<string, string> = {
      aries: 'pioneering spirit', taurus: 'steady determination', gemini: 'curious adaptability',
      cancer: 'nurturing sensitivity', leo: 'creative confidence', virgo: 'practical perfectionism',
      libra: 'harmonious balance', scorpio: 'intense transformation', sagittarius: 'adventurous wisdom',
      capricorn: 'ambitious structure', aquarius: 'innovative independence', pisces: 'compassionate intuition'
    };
    
    const moonTraits: Record<string, string> = {
      aries: 'fiery spontaneity', taurus: 'comfort-seeking stability', gemini: 'mental curiosity',
      cancer: 'deep emotional connection', leo: 'dramatic warmth', virgo: 'analytical care',
      libra: 'relationship harmony', scorpio: 'psychological depth', sagittarius: 'philosophical optimism',
      capricorn: 'responsible seriousness', aquarius: 'humanitarian detachment', pisces: 'empathetic flow'
    };
    
    const risingTraits: Record<string, string> = {
      aries: 'bold, energetic', taurus: 'calm, reliable', gemini: 'quick, versatile',
      cancer: 'protective, caring', leo: 'confident, magnetic', virgo: 'helpful, precise',
      libra: 'charming, diplomatic', scorpio: 'intense, mysterious', sagittarius: 'optimistic, adventurous',
      capricorn: 'serious, ambitious', aquarius: 'unique, innovative', pisces: 'gentle, intuitive'
    };
    
    return `You are a ${sunSign} Sun with ${moonSign} Moon and ${risingSign} rising, creating a unique blend of energies. Your ${sunSign} Sun drives your core identity with ${sunTraits[sunSign] || 'unique traits'}, while your ${moonSign} Moon shapes your emotional nature with ${moonTraits[moonSign] || 'distinct qualities'}. Your ${risingSign} rising shows the world your ${risingTraits[risingSign] || 'special characteristics'} nature. With a strong ${dominantElement} influence, you approach life in a ${elementDescriptions[dominantElement] || 'balanced'} way.`;
  };

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
          
          {/* Personalized Summary */}
          <div className="mb-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-6 border border-primary/20" data-testid="personalized-summary">
            <h3 className="text-lg font-semibold mb-4 text-center">Your Personalized Astrological Summary</h3>
            <p className="text-muted-foreground leading-relaxed text-center italic">
              {getPersonalizedSummary()}
            </p>
          </div>
          
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
            {planets.slice(2, showComplete ? planets.length : 5).map((planet) => (
              <div 
                key={planet.name}
                className="bg-muted/30 rounded-lg p-6 hover:bg-muted/40 transition-colors"
                data-testid={`${planet.name}-interpretation`}
              >
                <div className="flex items-center mb-4">
                  <span className="text-2xl mr-3">{planet.symbol}</span>
                  <div>
                    <h3 className="font-semibold capitalize">{planet.name} in {planet.zodiacSign}</h3>
                    <p className="text-sm text-muted-foreground">House {planet.house}{planet.isRetrograde ? " ℞" : ""}</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Your {planet.name} in {planet.zodiacSign} brings unique energy to your personality and life path.
                  {planet.isRetrograde && " This planet appears to move backward, adding introspective energy."}
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
              onClick={() => setShowComplete(!showComplete)}
              className="px-6 py-3 bg-gradient-to-r from-secondary to-accent text-secondary-foreground hover:shadow-lg hover:shadow-accent/25 transition-all"
              data-testid="button-complete-interpretation"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              {showComplete ? "Show Less" : "Read Complete Interpretation"}
              {showComplete ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
