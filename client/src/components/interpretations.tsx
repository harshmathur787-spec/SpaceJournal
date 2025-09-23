import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BookOpen, Star, Moon, ArrowUp, ChevronDown, ChevronUp } from "lucide-react";
import type { NatalChart, PlanetPosition } from "@shared/schema";
import interpretations from "../../../server/data/interpretations.json";

// Helper function to get ordinal suffix
function getOrdinal(num: number): string {
  if (num >= 11 && num <= 13) return `${num}th`;
  switch (num % 10) {
    case 1: return `${num}st`;
    case 2: return `${num}nd`;
    case 3: return `${num}rd`;
    default: return `${num}th`;
  }
}

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

  // Generate real personalized summary with specific planetary insights
  const getPersonalizedSummary = () => {
    if (!planets || planets.length === 0) return "Chart data not available";
    
    let insights: string[] = [];
    
    // Analyze specific planetary positions
    planets.forEach(planet => {
      const planetName = planet.name.charAt(0).toUpperCase() + planet.name.slice(1);
      const sign = planet.zodiacSign.charAt(0).toUpperCase() + planet.zodiacSign.slice(1);
      const house = planet.house;
      
      // Generate specific insights based on planet-house combinations
      if (planet.name === "sun") {
        if (house === 1) insights.push(`Your ${planetName} in ${sign} in the 1st house makes you naturally confident and leadership-oriented, but you may come across as too strong to others.`);
        else if (house === 10) insights.push(`Your ${planetName} in ${sign} in the 10th house gives you natural authority and career success, but you may struggle with work-life balance.`);
        else if (house === 7) insights.push(`Your ${planetName} in ${sign} in the 7th house means you define yourself through relationships, but may lose your identity in partnerships.`);
        else if (house === 12) insights.push(`Your ${planetName} in ${sign} in the 12th house makes you highly intuitive and spiritual, but you may struggle with self-confidence.`);
        else insights.push(`Your ${planetName} in ${sign} in the ${getOrdinal(house)} house influences your core identity in unique ways.`);
      }
      
      if (planet.name === "moon") {
        if (house === 4) insights.push(`Your ${planetName} in ${sign} in the 4th house makes you deeply emotional and family-oriented, but you may be overly sensitive to criticism.`);
        else if (house === 8) insights.push(`Your ${planetName} in ${sign} in the 8th house gives you powerful intuition and emotional depth, but you may struggle with trust issues.`);
        else if (house === 11) insights.push(`Your ${planetName} in ${sign} in the 11th house makes you excellent with groups and friendships, but you may neglect intimate relationships.`);
        else insights.push(`Your ${planetName} in ${sign} in the ${getOrdinal(house)} house shapes your emotional patterns and needs.`);
      }
      
      if (planet.name === "mars") {
        if (house === 1) insights.push(`Your ${planetName} in ${sign} in the 1st house makes you a natural fighter with high energy, but you may be too aggressive or impatient.`);
        else if (house === 3) insights.push(`Your ${planetName} in ${sign} in the 3rd house gives you mental strength and communication power, but you may be argumentative or restless.`);
        else if (house === 6) insights.push(`Your ${planetName} in ${sign} in the 6th house makes you hardworking and disciplined, but you may be overly critical or stressed about details.`);
        else if (house === 12) insights.push(`Your ${planetName} in ${sign} in the 12th house gives you hidden strength and spiritual warrior qualities, but you may suppress your anger unhealthily.`);
        else insights.push(`Your ${planetName} in ${sign} in the ${getOrdinal(house)} house influences how you take action and assert yourself.`);
      }
      
      if (planet.name === "venus") {
        if (house === 2) insights.push(`Your ${planetName} in ${sign} in the 2nd house gives you natural ability to attract money and luxury, but you may overspend or be materialistic.`);
        else if (house === 7) insights.push(`Your ${planetName} in ${sign} in the 7th house makes you charming and attractive to partners, but you may become too dependent on relationships.`);
        else if (house === 5) insights.push(`Your ${planetName} in ${sign} in the 5th house gives you artistic talents and romantic nature, but you may be overly dramatic in love.`);
        else insights.push(`Your ${planetName} in ${sign} in the ${getOrdinal(house)} house influences your values and relationship style.`);
      }
      
      if (planet.name === "mercury") {
        if (house === 3) insights.push(`Your ${planetName} in ${sign} in the 3rd house makes you an excellent communicator and quick thinker, but you may talk too much or spread gossip.`);
        else if (house === 9) insights.push(`Your ${planetName} in ${sign} in the 9th house gives you wisdom and teaching abilities, but you may be preachy or dogmatic.`);
        else if (house === 1) insights.push(`Your ${planetName} in ${sign} in the 1st house makes you intelligent and articulate, but you may overthink or appear nervous.`);
        else insights.push(`Your ${planetName} in ${sign} in the ${getOrdinal(house)} house shapes how you think and communicate.`);
      }
      
      if (planet.name === "jupiter") {
        if (house === 9) insights.push(`Your ${planetName} in ${sign} in the 9th house brings natural wisdom and good fortune through higher learning, but you may be overconfident or judgmental.`);
        else if (house === 2) insights.push(`Your ${planetName} in ${sign} in the 2nd house attracts wealth and abundance, but you may become greedy or overindulgent.`);
        else if (house === 11) insights.push(`Your ${planetName} in ${sign} in the 11th house brings luck through friendships and networks, but you may have unrealistic expectations.`);
        else insights.push(`Your ${planetName} in ${sign} in the ${getOrdinal(house)} house brings expansion and opportunities to that life area.`);
      }
      
      if (planet.name === "saturn") {
        if (house === 10) insights.push(`Your ${planetName} in ${sign} in the 10th house demands hard work for career success but brings lasting achievement and respect.`);
        else if (house === 7) insights.push(`Your ${planetName} in ${sign} in the 7th house may delay marriage but brings mature, stable partnerships when ready.`);
        else if (house === 1) insights.push(`Your ${planetName} in ${sign} in the 1st house makes you serious and responsible but may cause self-doubt or appearing too stern.`);
        else insights.push(`Your ${planetName} in ${sign} in the ${getOrdinal(house)} house teaches important life lessons through challenges in that area.`);
      }
    });
    
    // Take the most significant insights (limit to 3-4 for readability)
    return insights.slice(0, 3).join(" ");
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
