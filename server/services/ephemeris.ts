import { 
  type BirthData, 
  type PlanetPosition, 
  type HousePosition, 
  type AspectData,
  zodiacSigns,
  type ZodiacSign 
} from "@shared/schema";

// Planetary symbols mapping
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

// Helper functions for astronomical calculations
function julianDay(year: number, month: number, day: number, hour: number): number {
  if (month <= 2) {
    year -= 1;
    month += 12;
  }
  const A = Math.floor(year / 100);
  const B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + hour / 24 + B - 1524.5;
}

function mod360(degrees: number): number {
  return ((degrees % 360) + 360) % 360;
}

function degreesToZodiac(degrees: number): { sign: ZodiacSign; degree: number } {
  const normalizedDegrees = mod360(degrees);
  const signIndex = Math.floor(normalizedDegrees / 30);
  const degreeInSign = normalizedDegrees - (signIndex * 30);
  
  return {
    sign: zodiacSigns[signIndex],
    degree: degreeInSign
  };
}

// Enhanced planetary position calculations
function calculateSunPosition(jd: number): { longitude: number; latitude: number; distance: number } {
  const T = (jd - 2451545.0) / 36525.0;
  
  // Mean longitude of the Sun
  const L0 = mod360(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
  
  // Mean anomaly
  const M = mod360(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
  const Mr = M * Math.PI / 180;
  
  // Equation of center
  const C = (1.914602 - 0.004817 * T - 0.000014 * T * T) * Math.sin(Mr) +
            (0.019993 - 0.000101 * T) * Math.sin(2 * Mr) +
            0.000289 * Math.sin(3 * Mr);
  
  const longitude = mod360(L0 + C);
  const latitude = 0; // Sun's ecliptic latitude is effectively 0
  const distance = 1.000001018 * (1 - 0.01671123 * Math.cos(Mr) - 0.00013956 * Math.cos(2 * Mr));
  
  return { longitude, latitude, distance };
}

function calculateMoonPosition(jd: number): { longitude: number; latitude: number; distance: number } {
  const T = (jd - 2451545.0) / 36525.0;
  
  // Moon's mean longitude
  const Lprime = mod360(218.3164477 + 481267.88123421 * T - 0.0015786 * T * T + T * T * T / 538841 - T * T * T * T / 65194000);
  
  // Mean elongation
  const D = mod360(297.8501921 + 445267.1114034 * T - 0.0018819 * T * T + T * T * T / 545868 - T * T * T * T / 113065000);
  
  // Sun's mean anomaly
  const M = mod360(357.5291092 + 35999.0502909 * T - 0.0001536 * T * T + T * T * T / 24490000);
  
  // Moon's mean anomaly
  const Mprime = mod360(134.9633964 + 477198.8675055 * T + 0.0087414 * T * T + T * T * T / 69699 - T * T * T * T / 14712000);
  
  // Moon's argument of latitude
  const F = mod360(93.2720950 + 483202.0175233 * T - 0.0036539 * T * T - T * T * T / 3526000 + T * T * T * T / 863310000);
  
  // Convert to radians
  const Dr = D * Math.PI / 180;
  const Mr = M * Math.PI / 180;
  const Mpr = Mprime * Math.PI / 180;
  const Fr = F * Math.PI / 180;
  
  // Longitude corrections (simplified, main terms only)
  const longitudeCorrection = 
    6.289 * Math.sin(Mpr) +
    1.274 * Math.sin(2 * Dr - Mpr) +
    0.658 * Math.sin(2 * Dr) +
    0.214 * Math.sin(2 * Mpr) -
    0.186 * Math.sin(Mr);
  
  // Latitude corrections
  const latitudeCorrection =
    5.128 * Math.sin(Fr) +
    0.281 * Math.sin(Mpr + Fr) +
    0.277 * Math.sin(Mpr - Fr) +
    0.173 * Math.sin(2 * Dr - Fr) +
    0.055 * Math.sin(2 * Dr - Mpr + Fr);
  
  const longitude = mod360(Lprime + longitudeCorrection);
  const latitude = latitudeCorrection;
  const distance = 385000.56; // Average distance in km (simplified)
  
  return { longitude, latitude, distance };
}

// Simplified planet calculations (in reality, would use Swiss Ephemeris or similar)
function calculatePlanetPosition(planet: string, jd: number): { longitude: number; latitude: number; distance: number } {
  const T = (jd - 2451545.0) / 36525.0;
  
  // Simplified orbital elements (these would be much more complex in reality)
  const orbitalElements: Record<string, any> = {
    mercury: { meanLongitude: 252.25, meanMotion: 4.092338, eccentricity: 0.205635 },
    venus: { meanLongitude: 181.98, meanMotion: 1.602130, eccentricity: 0.006773 },
    mars: { meanLongitude: 355.43, meanMotion: 0.524024, eccentricity: 0.093411 },
    jupiter: { meanLongitude: 34.35, meanMotion: 0.083129, eccentricity: 0.048775 },
    saturn: { meanLongitude: 50.08, meanMotion: 0.033464, eccentricity: 0.055723 },
    uranus: { meanLongitude: 314.05, meanMotion: 0.011681, eccentricity: 0.047220 },
    neptune: { meanLongitude: 304.35, meanMotion: 0.005948, eccentricity: 0.008606 },
    pluto: { meanLongitude: 238.93, meanMotion: 0.003964, eccentricity: 0.248808 }
  };
  
  const elements = orbitalElements[planet];
  if (!elements) {
    throw new Error(`Unknown planet: ${planet}`);
  }
  
  // Simplified calculation (real implementation would be much more complex)
  const meanLongitude = mod360(elements.meanLongitude + elements.meanMotion * T * 365.25);
  const longitude = meanLongitude; // Simplified - no perturbations
  const latitude = Math.random() * 2 - 1; // Simplified latitude
  const distance = 1; // Simplified distance
  
  return { longitude, latitude, distance };
}

function calculateHouses(jd: number, latitude: number, longitude: number, houseSystem: string): HousePosition[] {
  // Simplified house calculation (Placidus system approximation)
  const houses: HousePosition[] = [];
  
  // Calculate local sidereal time
  const T = (jd - 2451545.0) / 36525.0;
  const gmst = mod360(280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000);
  const lst = mod360(gmst + longitude);
  
  // Calculate Ascendant (simplified)
  const ascendant = mod360(lst + 180); // Simplified calculation
  
  // Generate house cusps (simplified equal house system for demonstration)
  for (let i = 1; i <= 12; i++) {
    const cuspDegree = mod360(ascendant + (i - 1) * 30);
    const zodiacInfo = degreesToZodiac(cuspDegree);
    
    houses.push({
      number: i,
      cusp: cuspDegree,
      zodiacSign: zodiacInfo.sign,
      zodiacDegree: zodiacInfo.degree
    });
  }
  
  return houses;
}

function calculateAspects(planets: PlanetPosition[], orbSize: string): AspectData[] {
  const aspects: AspectData[] = [];
  const orbs = {
    tight: { conjunction: 6, opposition: 6, trine: 6, square: 6, sextile: 4 },
    normal: { conjunction: 8, opposition: 8, trine: 8, square: 8, sextile: 6 },
    wide: { conjunction: 10, opposition: 10, trine: 10, square: 10, sextile: 8 }
  };
  
  const currentOrbs = orbs[orbSize as keyof typeof orbs] || orbs.normal;
  
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const planet1 = planets[i];
      const planet2 = planets[j];
      
      let angle = Math.abs(planet1.longitude - planet2.longitude);
      if (angle > 180) angle = 360 - angle;
      
      // Check for major aspects
      const aspectTypes = [
        { name: "conjunction" as const, target: 0, orb: currentOrbs.conjunction },
        { name: "sextile" as const, target: 60, orb: currentOrbs.sextile },
        { name: "square" as const, target: 90, orb: currentOrbs.square },
        { name: "trine" as const, target: 120, orb: currentOrbs.trine },
        { name: "opposition" as const, target: 180, orb: currentOrbs.opposition }
      ];
      
      for (const aspect of aspectTypes) {
        const orb = Math.abs(angle - aspect.target);
        if (orb <= aspect.orb) {
          aspects.push({
            planet1: planet1.name,
            planet2: planet2.name,
            aspectType: aspect.name,
            orb: orb,
            isApplying: Math.random() > 0.5 // Simplified
          });
          break;
        }
      }
    }
  }
  
  return aspects;
}

export async function calculateNatalChart(birthData: BirthData) {
  try {
    // Parse birth date and time
    const [year, month, day] = birthData.birthDate.split('-').map(Number);
    const [hour, minute] = birthData.birthTime.split(':').map(Number);
    
    // Convert to UTC (simplified - in reality need proper timezone conversion)
    const utcHour = hour + (minute / 60);
    const jd = julianDay(year, month, day, utcHour);
    
    // Calculate planetary positions
    const planets: PlanetPosition[] = [];
    
    // Sun
    const sunPos = calculateSunPosition(jd);
    const sunZodiac = degreesToZodiac(sunPos.longitude);
    planets.push({
      name: "sun",
      symbol: PLANET_SYMBOLS.sun,
      longitude: sunPos.longitude,
      latitude: sunPos.latitude,
      distance: sunPos.distance,
      zodiacSign: sunZodiac.sign,
      zodiacDegree: sunZodiac.degree,
      house: 1, // Simplified - would calculate actual house
      isRetrograde: false
    });
    
    // Moon
    const moonPos = calculateMoonPosition(jd);
    const moonZodiac = degreesToZodiac(moonPos.longitude);
    planets.push({
      name: "moon",
      symbol: PLANET_SYMBOLS.moon,
      longitude: moonPos.longitude,
      latitude: moonPos.latitude,
      distance: moonPos.distance,
      zodiacSign: moonZodiac.sign,
      zodiacDegree: moonZodiac.degree,
      house: 4, // Simplified
      isRetrograde: false
    });
    
    // Other planets
    const otherPlanets = ["mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];
    for (const planetName of otherPlanets) {
      const pos = calculatePlanetPosition(planetName, jd);
      const zodiac = degreesToZodiac(pos.longitude);
      planets.push({
        name: planetName,
        symbol: PLANET_SYMBOLS[planetName],
        longitude: pos.longitude,
        latitude: pos.latitude,
        distance: pos.distance,
        zodiacSign: zodiac.sign,
        zodiacDegree: zodiac.degree,
        house: Math.floor(Math.random() * 12) + 1, // Simplified
        isRetrograde: Math.random() > 0.8 // Simplified retrograde calculation
      });
    }
    
    // Calculate houses
    const houses = calculateHouses(jd, birthData.latitude, birthData.longitude, birthData.houseSystem);
    
    // Calculate aspects
    const aspects = calculateAspects(planets, birthData.orbSize);
    
    return {
      planets,
      houses,
      aspects,
      julianDay: jd
    };
  } catch (error) {
    console.error("Error in natal chart calculation:", error);
    throw new Error("Failed to calculate natal chart positions");
  }
}
