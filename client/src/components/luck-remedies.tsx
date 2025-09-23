import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Gift, Star, Sun, Moon } from "lucide-react";
import { PlanetPosition, AspectData, HousePosition } from "@shared/schema";

interface LuckRemediesProps {
  planets: PlanetPosition[];
  aspects: AspectData[];
  houses: HousePosition[];
}

interface Remedy {
  title: string;
  description: string;
  practices: string[];
  icon: any;
  color: string;
}

export default function LuckRemedies({ planets, aspects, houses }: LuckRemediesProps) {
  const remedies = useMemo(() => {
    const remedyList: Remedy[] = [];
    
    // Analyze planetary positions for specific remedies
    planets.forEach(planet => {
      const planetName = planet.name.charAt(0).toUpperCase() + planet.name.slice(1);
      const sign = planet.zodiacSign;
      const house = planet.house;
      
      // Jupiter remedies for luck and wisdom
      if (planet.name === "jupiter") {
        if (sign === "sagittarius" || sign === "cancer") {
          remedyList.push({
            title: `${planetName} Blessings`,
            description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} brings natural luck and expansion.`,
            practices: [
              "Wear yellow or gold clothing on Thursdays",
              "Donate to educational causes or temples",
              "Practice gratitude daily and help those in need",
              "Study sacred texts or pursue higher learning"
            ],
            icon: Gift,
            color: "text-yellow-600"
          });
        } else if (house === 9 || house === 11) {
          remedyList.push({
            title: `${planetName} Fortune Enhancement`,
            description: `Your ${planetName} in the ${house}th house brings opportunities for growth.`,
            practices: [
              "Light a yellow candle on Thursdays",
              "Feed birds or animals regularly",
              "Practice generosity and charitable giving",
              "Meditate on expansion and abundance"
            ],
            icon: Star,
            color: "text-yellow-600"
          });
        }
      }
      
      // Venus remedies for harmony and attraction
      if (planet.name === "venus") {
        if (house === 2 || house === 7 || house === 11) {
          remedyList.push({
            title: `${planetName} Harmony Ritual`,
            description: `Your ${planetName} in the ${house}th house enhances attraction and relationships.`,
            practices: [
              "Wear white or light pink on Fridays",
              "Surround yourself with beautiful flowers",
              "Practice acts of kindness and beauty",
              "Listen to harmonious music daily"
            ],
            icon: Sparkles,
            color: "text-pink-600"
          });
        }
      }
      
      // Sun remedies for confidence and leadership
      if (planet.name === "sun") {
        if (house === 1 || house === 9 || house === 10) {
          remedyList.push({
            title: `${planetName} Power Activation`,
            description: `Your ${planetName} in the ${house}th house brings leadership and authority.`,
            practices: [
              "Face the rising sun and practice gratitude",
              "Wear red, orange, or copper colors on Sundays",
              "Practice confidence-building exercises",
              "Light a lamp or candle during sunset"
            ],
            icon: Sun,
            color: "text-orange-600"
          });
        }
      }
      
      // Moon remedies for intuition and emotional balance
      if (planet.name === "moon") {
        if (house === 4 || house === 8 || sign === "cancer") {
          remedyList.push({
            title: `${planetName} Intuition Enhancement`,
            description: `Your ${planetName} placement enhances intuition and emotional depth.`,
            practices: [
              "Practice moon gazing on full moon nights",
              "Wear white or silver on Mondays",
              "Keep fresh water near your bed",
              "Practice meditation with moonstone"
            ],
            icon: Moon,
            color: "text-blue-600"
          });
        }
      }
      
      // Mars remedies for energy and courage
      if (planet.name === "mars") {
        if (sign === "aries" || house === 1 || house === 6) {
          remedyList.push({
            title: `${planetName} Energy Boost`,
            description: `Your ${planetName} placement brings courage and vitality.`,
            practices: [
              "Exercise regularly, especially on Tuesdays",
              "Wear red coral or red clothing",
              "Practice martial arts or physical activities",
              "Donate red items to those in need"
            ],
            icon: Sparkles,
            color: "text-red-600"
          });
        }
      }
    });
    
    // General remedies based on element emphasis
    const elementCounts = { fire: 0, earth: 0, air: 0, water: 0 };
    planets.forEach(planet => {
      const sign = planet.zodiacSign;
      if (['aries', 'leo', 'sagittarius'].includes(sign)) elementCounts.fire++;
      else if (['taurus', 'virgo', 'capricorn'].includes(sign)) elementCounts.earth++;
      else if (['gemini', 'libra', 'aquarius'].includes(sign)) elementCounts.air++;
      else if (['cancer', 'scorpio', 'pisces'].includes(sign)) elementCounts.water++;
    });
    
    const totalPlanets = Object.values(elementCounts).reduce((a, b) => a + b, 0);
    const dominantElement = Object.entries(elementCounts).reduce((a, b) => 
      elementCounts[a[0] as keyof typeof elementCounts] > elementCounts[b[0] as keyof typeof elementCounts] ? a : b)[0];
    
    if (totalPlanets > 0 && elementCounts[dominantElement as keyof typeof elementCounts] / totalPlanets >= 0.4) {
      if (dominantElement === "fire") {
        remedyList.push({
          title: "Fire Element Amplification",
          description: "Your strong fire element brings leadership and manifestation power.",
          practices: [
            "Light candles during prayers or meditation",
            "Wear red, orange, or bright colors",
            "Take quick action on your ideas",
            "Practice sun salutations at dawn"
          ],
          icon: Sun,
          color: "text-red-600"
        });
      } else if (dominantElement === "earth") {
        remedyList.push({
          title: "Earth Element Grounding",
          description: "Your strong earth element brings stability and practical wisdom.",
          practices: [
            "Spend time in nature and gardens",
            "Wear brown, green, or earth tones",
            "Practice grounding meditation barefoot",
            "Work with crystals and stones"
          ],
          icon: Gift,
          color: "text-green-600"
        });
      } else if (dominantElement === "air") {
        remedyList.push({
          title: "Air Element Communication",
          description: "Your strong air element enhances communication and intellect.",
          practices: [
            "Practice deep breathing exercises",
            "Wear light blue or white colors",
            "Keep learning new skills daily",
            "Use aromatherapy and incense"
          ],
          icon: Star,
          color: "text-blue-600"
        });
      } else if (dominantElement === "water") {
        remedyList.push({
          title: "Water Element Intuition",
          description: "Your strong water element brings deep intuition and healing.",
          practices: [
            "Take ritual baths with sea salt",
            "Wear blue, silver, or flowing fabrics",
            "Practice water meditation",
            "Keep fresh flowers near water"
          ],
          icon: Moon,
          color: "text-blue-600"
        });
      }
    }
    
    // If no specific remedies found, add general luck remedies
    if (remedyList.length === 0) {
      remedyList.push({
        title: "Universal Luck Enhancement",
        description: "General remedies to enhance fortune and positive energy.",
        practices: [
          "Practice gratitude daily for 5 minutes",
          "Keep your living space clean and organized", 
          "Help others without expecting anything in return",
          "Wear gemstones that resonate with your birth date"
        ],
        icon: Sparkles,
        color: "text-purple-600"
      });
    }
    
    return remedyList.slice(0, 4); // Limit to 4 remedies for better UI
  }, [planets, aspects, houses]);

  return (
    <section data-testid="luck-remedies-section">
      <Card className="gradient-border">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-serif bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Luck Enhancement & Remedies
            <Sparkles className="w-6 h-6 text-purple-600" />
          </CardTitle>
          <CardDescription className="text-base">
            Personalized remedies to enhance your fortune and positive energy based on your birth chart
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" data-testid="remedies-grid">
            {remedies.map((remedy, index) => {
              const IconComponent = remedy.icon;
              return (
                <div 
                  key={index}
                  className="bg-gradient-to-br from-muted/30 to-muted/10 rounded-lg p-6 border border-muted/50 hover:border-purple-300 transition-all"
                  data-testid={`remedy-card-${index}`}
                >
                  <div className="flex items-center mb-4">
                    <IconComponent className={`w-6 h-6 mr-3 ${remedy.color}`} />
                    <h3 className="font-semibold text-lg">{remedy.title}</h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {remedy.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm mb-2 flex items-center">
                      <Badge variant="outline" className="mr-2">Practices</Badge>
                    </h4>
                    <ul className="space-y-2">
                      {remedy.practices.map((practice, practiceIndex) => (
                        <li 
                          key={practiceIndex}
                          className="text-sm flex items-start"
                          data-testid={`practice-${index}-${practiceIndex}`}
                        >
                          <span className="text-purple-600 mr-2">•</span>
                          <span className="text-muted-foreground">{practice}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-8 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
            <p className="text-sm text-center text-muted-foreground leading-relaxed">
              <strong>Note:</strong> These remedies are based on traditional astrological wisdom. Practice them with faith and consistency for best results. 
              Remember that your actions and mindset are the most powerful tools for creating positive change in your life.
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}