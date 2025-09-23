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
