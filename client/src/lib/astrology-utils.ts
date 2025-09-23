import type { ZodiacSign } from "@shared/schema";

export const ZODIAC_SIGNS: ZodiacSign[] = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

export const ZODIAC_SYMBOLS: Record<ZodiacSign, string> = {
  aries: "♈",
  taurus: "♉", 
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓"
};

export const PLANET_SYMBOLS: Record<string, string> = {
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

export const ASPECT_SYMBOLS: Record<string, string> = {
  conjunction: "☌",
  opposition: "☍", 
  trine: "△",
  square: "□",
  sextile: "⚹",
  semisquare: "⚺",
  sesquiquadrate: "⚼",
  quincunx: "⚻"
};

export function formatDegreeMinute(decimal: number): string {
  const degrees = Math.floor(decimal);
  const minutes = Math.floor((decimal - degrees) * 60);
  return `${degrees}°${minutes.toString().padStart(2, '0')}'`;
}

export function getZodiacSymbol(sign: ZodiacSign): string {
  return ZODIAC_SYMBOLS[sign] || "?";
}

export function getPlanetSymbol(planetName: string): string {
  return PLANET_SYMBOLS[planetName] || "?";
}

export function getAspectSymbol(aspectType: string): string {
  return ASPECT_SYMBOLS[aspectType] || "○";
}

export function calculateAge(birthDate: string): number {
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  
  return age;
}

export function formatZodiacPosition(sign: ZodiacSign, degree: number): string {
  const formattedSign = sign.charAt(0).toUpperCase() + sign.slice(1);
  return `${formattedSign} ${formatDegreeMinute(degree)}`;
}

// ===== ADVICE ANALYSIS ENGINE =====

import { PlanetPosition, AspectData, HousePosition, Condition, AdviceRule, AdviceResult, AdviceItem } from "@shared/schema";

// Traditional planetary rulerships
const PLANETARY_RULERSHIPS: { [key: number]: string } = {
  1: "Mars",     // Aries
  2: "Venus",    // Taurus
  3: "Mercury",  // Gemini
  4: "Moon",     // Cancer
  5: "Sun",      // Leo
  6: "Mercury",  // Virgo
  7: "Venus",    // Libra
  8: "Mars",     // Scorpio (traditional ruler)
  9: "Jupiter",  // Sagittarius
  10: "Saturn",  // Capricorn
  11: "Saturn",  // Aquarius (traditional ruler)
  12: "Jupiter"  // Pisces (traditional ruler)
};

// Element mappings
const ELEMENT_SIGNS: { [key in "fire" | "earth" | "air" | "water"]: ZodiacSign[] } = {
  fire: ["aries", "leo", "sagittarius"],
  earth: ["taurus", "virgo", "capricorn"],
  air: ["gemini", "libra", "aquarius"],
  water: ["cancer", "scorpio", "pisces"]
};

// Harmonious vs challenging aspects
const HARMONIOUS_ASPECTS = ["trine", "sextile", "conjunction"];
const CHALLENGING_ASPECTS = ["square", "opposition"];

export interface ChartFeatures {
  planetByName: { [planetName: string]: PlanetPosition };
  planetsByHouse: { [houseNumber: number]: PlanetPosition[] };
  aspectsMatrix: { [planet1: string]: { [planet2: string]: AspectData } };
  housesSigns: { [houseNumber: number]: ZodiacSign };
  rulers: { [houseNumber: number]: string };
  retrogradeSet: Set<string>;
  elementCounts: { [element: string]: number };
  signCounts: { [sign: string]: number };
}

export function deriveFeatures(
  planets: PlanetPosition[], 
  aspects: AspectData[], 
  houses: HousePosition[]
): ChartFeatures {
  // Create planet lookup by name (normalize to Title Case)
  const planetByName: { [planetName: string]: PlanetPosition } = {};
  planets.forEach(planet => {
    const normalizedName = planet.name.charAt(0).toUpperCase() + planet.name.slice(1).toLowerCase();
    planetByName[normalizedName] = planet;
  });

  // Group planets by house
  const planetsByHouse: { [houseNumber: number]: PlanetPosition[] } = {};
  for (let i = 1; i <= 12; i++) {
    planetsByHouse[i] = [];
  }
  planets.forEach(planet => {
    planetsByHouse[planet.house].push(planet);
  });

  // Create aspects matrix (normalize planet names to Title Case)
  const aspectsMatrix: { [planet1: string]: { [planet2: string]: AspectData } } = {};
  aspects.forEach(aspect => {
    const planet1 = aspect.planet1.charAt(0).toUpperCase() + aspect.planet1.slice(1).toLowerCase();
    const planet2 = aspect.planet2.charAt(0).toUpperCase() + aspect.planet2.slice(1).toLowerCase();
    if (!aspectsMatrix[planet1]) aspectsMatrix[planet1] = {};
    if (!aspectsMatrix[planet2]) aspectsMatrix[planet2] = {};
    aspectsMatrix[planet1][planet2] = aspect;
    aspectsMatrix[planet2][planet1] = aspect;
  });

  // Map house signs
  const housesSigns: { [houseNumber: number]: ZodiacSign } = {};
  houses.forEach(house => {
    housesSigns[house.number] = house.zodiacSign;
  });

  // Calculate rulers (house sign -> ruling planet)
  const rulers: { [houseNumber: number]: string } = {};
  houses.forEach(house => {
    const signIndex = getSignIndex(house.zodiacSign) + 1;
    rulers[house.number] = PLANETARY_RULERSHIPS[signIndex] || "Mars";
  });

  // Find retrograde planets
  const retrogradeSet = new Set<string>();
  planets.forEach(planet => {
    if (planet.isRetrograde) {
      retrogradeSet.add(planet.name);
    }
  });

  // Count elements and signs
  const elementCounts = { fire: 0, earth: 0, air: 0, water: 0 };
  const signCounts: { [sign: string]: number } = {};
  
  planets.forEach(planet => {
    // Count sign
    signCounts[planet.zodiacSign] = (signCounts[planet.zodiacSign] || 0) + 1;
    
    // Count element
    for (const [element, signs] of Object.entries(ELEMENT_SIGNS)) {
      if (signs.includes(planet.zodiacSign)) {
        elementCounts[element as keyof typeof elementCounts]++;
        break;
      }
    }
  });

  return {
    planetByName,
    planetsByHouse,
    aspectsMatrix,
    housesSigns,
    rulers,
    retrogradeSet,
    elementCounts,
    signCounts
  };
}

function getSignIndex(sign: ZodiacSign): number {
  return ZODIAC_SIGNS.indexOf(sign);
}

export function evaluateCondition(condition: Condition, features: ChartFeatures): boolean {
  switch (condition.type) {
    case "placement":
      const normalizedPlanetName = condition.planet.charAt(0).toUpperCase() + condition.planet.slice(1).toLowerCase();
      const planet = features.planetByName[normalizedPlanetName];
      if (!planet) return false;
      
      if (condition.house && planet.house !== condition.house) return false;
      if (condition.sign && planet.zodiacSign !== condition.sign) return false;
      return true;

    case "aspect":
      const planet1 = condition.planet1.charAt(0).toUpperCase() + condition.planet1.slice(1).toLowerCase();
      const planet2 = condition.planet2.charAt(0).toUpperCase() + condition.planet2.slice(1).toLowerCase();
      const aspect = features.aspectsMatrix[planet1]?.[planet2];
      if (!aspect) return false;

      // Check aspect type
      if (condition.aspectType === "harmonious") {
        if (!HARMONIOUS_ASPECTS.includes(aspect.aspectType)) return false;
      } else if (condition.aspectType === "challenging") {
        if (!CHALLENGING_ASPECTS.includes(aspect.aspectType)) return false;
      } else if (aspect.aspectType !== condition.aspectType) {
        return false;
      }

      // Check orb if specified
      if (condition.maxOrb && aspect.orb > condition.maxOrb) return false;
      return true;

    case "houseEmphasis":
      const planetsInHouse = features.planetsByHouse[condition.house];
      return planetsInHouse.length >= condition.minPlanets;

    case "retrograde":
      const retroPlanetName = condition.planet.charAt(0).toUpperCase() + condition.planet.slice(1).toLowerCase();
      const isRetrograde = features.retrogradeSet.has(retroPlanetName);
      return isRetrograde === condition.isRetrograde;

    case "rulerPlacement":
      const ruler = features.rulers[condition.houseRuled];
      if (!ruler) return false;
      
      const rulerPlanet = features.planetByName[ruler];
      if (!rulerPlanet) return false;
      
      if (condition.rulerHouse && rulerPlanet.house !== condition.rulerHouse) return false;
      if (condition.rulerSign && rulerPlanet.zodiacSign !== condition.rulerSign) return false;
      return true;

    case "signEmphasis":
      const count = features.signCounts[condition.sign] || 0;
      return count >= condition.minPlanets;

    case "elementBalance":
      const totalPlanets = Object.values(features.elementCounts).reduce((a, b) => a + b, 0);
      const elementCount = features.elementCounts[condition.element] || 0;
      const percentage = totalPlanets > 0 ? (elementCount / totalPlanets) * 100 : 0;
      return percentage >= condition.minPercentage;

    default:
      return false;
  }
}

export function evaluateRule(rule: AdviceRule, features: ChartFeatures): { matches: boolean; evidence: string[] } {
  const evidence: string[] = [];
  
  for (const condition of rule.conditions) {
    if (!evaluateCondition(condition, features)) {
      return { matches: false, evidence: [] };
    }
    
    // Generate evidence string for this condition
    evidence.push(generateEvidenceString(condition, features));
  }
  
  return { matches: true, evidence };
}

function generateEvidenceString(condition: Condition, features: ChartFeatures): string {
  switch (condition.type) {
    case "placement":
      if (condition.house && condition.sign) {
        return `${condition.planet} in ${condition.house}${getOrdinalSuffix(condition.house)} house (${condition.sign})`;
      } else if (condition.house) {
        return `${condition.planet} in ${condition.house}${getOrdinalSuffix(condition.house)} house`;
      } else if (condition.sign) {
        return `${condition.planet} in ${condition.sign}`;
      }
      return `${condition.planet} placement`;

    case "aspect":
      const aspect = features.aspectsMatrix[condition.planet1]?.[condition.planet2];
      if (aspect) {
        return `${condition.planet1} ${aspect.aspectType} ${condition.planet2}`;
      }
      return `${condition.planet1}-${condition.planet2} aspect`;

    case "houseEmphasis":
      const count = features.planetsByHouse[condition.house].length;
      return `${count} planets in ${condition.house}${getOrdinalSuffix(condition.house)} house`;

    case "retrograde":
      return `${condition.planet} ${condition.isRetrograde ? "retrograde" : "direct"}`;

    case "rulerPlacement":
      const ruler = features.rulers[condition.houseRuled];
      return `${condition.houseRuled}${getOrdinalSuffix(condition.houseRuled)} house ruler (${ruler}) placement`;

    case "signEmphasis":
      const signCount = features.signCounts[condition.sign] || 0;
      return `${signCount} planets in ${condition.sign}`;

    case "elementBalance":
      const totalPlanets = Object.values(features.elementCounts).reduce((a, b) => a + b, 0);
      const elementCount = features.elementCounts[condition.element] || 0;
      const percentage = totalPlanets > 0 ? Math.round((elementCount / totalPlanets) * 100) : 0;
      return `${percentage}% ${condition.element} element`;

    default:
      return "Unknown condition";
  }
}

function getOrdinalSuffix(num: number): string {
  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;
  
  if (lastTwoDigits >= 11 && lastTwoDigits <= 13) {
    return "th";
  }
  
  switch (lastDigit) {
    case 1: return "st";
    case 2: return "nd";
    case 3: return "rd";
    default: return "th";
  }
}

export function generateAdvice(
  planets: PlanetPosition[],
  aspects: AspectData[],
  houses: HousePosition[],
  rules: AdviceRule[]
): AdviceResult[] {
  const features = deriveFeatures(planets, aspects, houses);
  const resultsByCategory: { [category: string]: AdviceResult } = {};

  // Initialize results for all categories
  const categories = ["finance", "partner", "career", "health"];
  categories.forEach(category => {
    resultsByCategory[category] = {
      category: category as any,
      score: 50, // Base score
      items: []
    };
  });

  // Evaluate each rule
  rules.forEach(rule => {
    const evaluation = evaluateRule(rule, features);
    
    if (evaluation.matches) {
      const item: AdviceItem = {
        advice: rule.advice,
        effect: rule.effect,
        weight: rule.weight,
        evidence: evaluation.evidence
      };
      
      resultsByCategory[rule.category].items.push(item);
    }
  });

  // Calculate scores for each category
  Object.values(resultsByCategory).forEach(result => {
    let totalWeight = 0;
    let weightedScore = 0;
    
    result.items.forEach(item => {
      totalWeight += item.weight;
      if (item.effect === "positive") {
        weightedScore += item.weight * 20; // Positive effects add points
      } else if (item.effect === "challenge") {
        weightedScore -= item.weight * 15; // Challenges subtract points
      } else {
        weightedScore += item.weight * 5; // Neutral effects add small points
      }
    });
    
    if (totalWeight > 0) {
      // Calculate final score (0-100 range)
      const baseScore = 50;
      const adjustment = Math.max(-50, Math.min(50, weightedScore / totalWeight));
      result.score = Math.round(baseScore + adjustment);
    }
    
    // Sort items by weight (most important first)
    result.items.sort((a, b) => b.weight - a.weight);
    
    // Limit to top 5 items per category
    result.items = result.items.slice(0, 5);
  });

  return Object.values(resultsByCategory);
}
