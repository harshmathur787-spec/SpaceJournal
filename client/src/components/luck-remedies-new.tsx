import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Sun, Moon, ArrowUp, Gift, Lightbulb } from "lucide-react";
import type { NatalChart } from "@shared/schema";

interface LuckRemediesProps {
  chart: NatalChart;
}

// Sign elements mapping
const signElements: Record<string, string> = {
  aries: "Fire", leo: "Fire", sagittarius: "Fire",
  taurus: "Earth", virgo: "Earth", capricorn: "Earth",
  gemini: "Air", libra: "Air", aquarius: "Air",
  cancer: "Water", scorpio: "Water", pisces: "Water"
};

// Multi-layered personalized remedies based on sun, moon, ascendant
function getUniqueRemedies(sun: string, moon: string, asc: string) {
  const sunRemedies: Record<string, string> = {
    aries: "Wear red on Tuesdays, do 5 minutes of energizing exercise each morning, donate jaggery.",
    taurus: "Keep a silver coin in your wallet; chant a gratitude mantra each evening.",
    gemini: "Read or speak positively for 10 minutes daily; wear light green to invite communication luck.",
    cancer: "Light a small lamp each Monday and spend time with family to invite emotional support.",
    leo: "Wear gold/yellow for confidence; practice a short sun salutation each morning.",
    virgo: "Keep a tidy workspace; donate pulses on Saturdays for steady growth.",
    libra: "Light incense in the evening and practice small acts of kindness to attract balance.",
    scorpio: "Offer red flowers on Tuesdays and practice breathwork to transform negative energy.",
    sagittarius: "Donate yellow lentils on Thursdays; plan a short trip to refresh perspective.",
    capricorn: "Help someone in need weekly; wake up before sunrise and set one long-term goal.",
    aquarius: "Volunteer once a week; keep a small blue cloth or item in your wallet for inspiration.",
    pisces: "Practice compassion exercises; keep a small bowl of clean water near your bed."
  };

  const moonRemedies: Record<string, string> = {
    aries: "Daily short meditation to calm the mind; cool foods in the evening.",
    taurus: "Place a rose quartz or warm light near your bedside for emotional harmony.",
    gemini: "Write your thoughts each night; practice listening exercises to strengthen calm.",
    cancer: "Drink warm milk before sleep and keep a small photo of loved ones for comfort.",
    leo: "Practice grounding breathing for 5 minutes each evening; spend time in nature.",
    virgo: "Avoid late-night screens; perform a short cleaning ritual before bed.",
    libra: "Use pleasant scents in your room and keep soft lighting to soothe emotions.",
    scorpio: "Saltwater bath or foot soak once a week to release heavy emotions.",
    sagittarius: "Keep a gratitude journal and read a short inspiring quote every morning.",
    capricorn: "Take short walks after meals to balance mood and encourage discipline.",
    aquarius: "Listen to calming instrumental music before bed; limit stimulating media.",
    pisces: "Use sandalwood or jasmine scent and practice gentle visualization before sleep."
  };

  const ascRemedies: Record<string, string> = {
    aries: "Start your day with 15 minutes of physical activity; set small bold goals.",
    taurus: "Place a money plant in the southeast of your living space; manage finances mindfully.",
    gemini: "Carry a small notebook and pen for ideas; wear turquoise or green to boost communication.",
    cancer: "Maintain a cozy home corner for relaxation; keep a moonstone crystal for soothing energy.",
    leo: "Speak affirmations aloud; maintain a visible goal board in gold or yellow tones.",
    virgo: "Organize your tasks every morning; keep a tidy workspace and a small herbal tea ritual.",
    libra: "Wear a pleasant perfume and make time for relationships; balance work and rest.",
    scorpio: "Practice introspective journaling; keep a red thread or cloth as a symbolic protector.",
    sagittarius: "Plan a monthly short outing; keep an inspirational travel item in your bag.",
    capricorn: "Create a morning routine with clear steps; help someone every weekend.",
    aquarius: "Join a community activity monthly; keep notes of new ideas and follow one each month.",
    pisces: "Maintain a small altar or calm corner; dedicate time weekly to creative practice."
  };


  const elementRemedies: Record<string, string> = {
    Fire: "Balance fire with calming practices: cool foods, evening walks, and calming breathwork.",
    Earth: "Add flexibility: gentle stretching, donate grains, and avoid stubborn routines.",
    Air: "Ground yourself: walk barefoot, eat grounding meals, and reduce overstimulation.",
    Water: "Create structure: set small daily routines, light a lamp each morning, and practice discipline."
  };

  const luckTips = [
    "Light a lamp every morning with intention for 7 days.",
    "Donate food to someone in need and mentally wish them well.",
    "Chant 'Om' 21 times every morning for mental clarity.",
    "Keep a small plant and water it daily while thinking of your goals.",
    "Smile deliberately for 2 minutes each morning to attract positivity.",
    "Write one small goal each day and cross it out when done."
  ];

  const sunRem = sunRemedies[sun.toLowerCase()] || "";
  const moonRem = moonRemedies[moon.toLowerCase()] || "";
  const ascRem = ascRemedies[asc.toLowerCase()] || "";
  const element = elementRemedies[signElements[moon.toLowerCase()]] || elementRemedies["Fire"];
  const bonus = luckTips[Math.floor(Math.random() * luckTips.length)];

  return { sun: sunRem, moon: moonRem, asc: ascRem, element: element, bonus: bonus };
}

export default function LuckRemedies({ chart }: LuckRemediesProps) {
  // Extract the core signs from the chart
  const planets = Array.isArray(chart.planetaryData) ? chart.planetaryData : [];
  const houses = Array.isArray(chart.housesData) ? chart.housesData : [];
  
  const sun = planets.find((p: any) => p.name === "sun");
  const moon = planets.find((p: any) => p.name === "moon");
  const ascendant = houses.length > 0 ? houses[0] : null;

  if (!sun || !moon || !ascendant) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold gradient-text mb-2">Luck Enhancement & Remedies</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your personalized remedies...
          </p>
        </div>
      </div>
    );
  }

  const remedies = getUniqueRemedies(sun.zodiacSign, moon.zodiacSign, ascendant.zodiacSign);

  return (
    <div className="space-y-6" data-testid="luck-remedies-section">
      <div className="text-center">
        <h2 className="text-2xl font-bold gradient-text mb-2">Luck Enhancement & Remedies</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Personalized remedies based on your Sun in {sun.zodiacSign.charAt(0).toUpperCase() + sun.zodiacSign.slice(1)}, 
          Moon in {moon.zodiacSign.charAt(0).toUpperCase() + moon.zodiacSign.slice(1)}, 
          and {ascendant.zodiacSign.charAt(0).toUpperCase() + ascendant.zodiacSign.slice(1)} Rising
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {/* Sun Remedy */}
        <Card className="border-orange-200 dark:border-orange-800 hover:shadow-md transition-shadow" data-testid="remedy-sun">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Sun className="h-6 w-6 text-orange-600" />
              <CardTitle className="text-lg">Sun in {sun.zodiacSign.charAt(0).toUpperCase() + sun.zodiacSign.slice(1)} Remedy</CardTitle>
            </div>
            <CardDescription className="text-base">
              Enhance your core vitality and self-expression
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge variant="secondary" className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200">
                Solar Power
              </Badge>
              <p className="text-sm text-gray-700 dark:text-gray-300">{remedies.sun}</p>
            </div>
          </CardContent>
        </Card>

        {/* Moon Remedy */}
        <Card className="border-blue-200 dark:border-blue-800 hover:shadow-md transition-shadow" data-testid="remedy-moon">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Moon className="h-6 w-6 text-blue-600" />
              <CardTitle className="text-lg">Moon in {moon.zodiacSign.charAt(0).toUpperCase() + moon.zodiacSign.slice(1)} Remedy</CardTitle>
            </div>
            <CardDescription className="text-base">
              Balance your emotions and inner peace
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                Lunar Harmony
              </Badge>
              <p className="text-sm text-gray-700 dark:text-gray-300">{remedies.moon}</p>
            </div>
          </CardContent>
        </Card>

        {/* Ascendant Remedy */}
        <Card className="border-green-200 dark:border-green-800 hover:shadow-md transition-shadow" data-testid="remedy-ascendant">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <ArrowUp className="h-6 w-6 text-green-600" />
              <CardTitle className="text-lg">{ascendant.zodiacSign.charAt(0).toUpperCase() + ascendant.zodiacSign.slice(1)} Rising Remedy</CardTitle>
            </div>
            <CardDescription className="text-base">
              Strengthen your outer personality and life approach
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                Rising Power
              </Badge>
              <p className="text-sm text-gray-700 dark:text-gray-300">{remedies.asc}</p>
            </div>
          </CardContent>
        </Card>

        {/* Element Balance */}
        <Card className="border-purple-200 dark:border-purple-800 hover:shadow-md transition-shadow" data-testid="remedy-element">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <CardTitle className="text-lg">Elemental Balance</CardTitle>
            </div>
            <CardDescription className="text-base">
              Balance your moon's {signElements[moon.zodiacSign.toLowerCase()] || "Fire"} element energy
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                {signElements[moon.zodiacSign.toLowerCase()] || "Fire"} Balance
              </Badge>
              <p className="text-sm text-gray-700 dark:text-gray-300">{remedies.element}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bonus Luck Tip */}
      <Card className="border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20" data-testid="remedy-bonus">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <Gift className="h-6 w-6 text-yellow-600" />
            <CardTitle className="text-lg">Daily Luck Enhancer</CardTitle>
          </div>
          <CardDescription className="text-base">
            A special practice to boost your overall fortune
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Badge variant="secondary" className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
              Bonus Tip
            </Badge>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">{remedies.bonus}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}