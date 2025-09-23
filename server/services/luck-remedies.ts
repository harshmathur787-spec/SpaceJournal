import { PlanetPosition, AspectData, HousePosition, LuckRemedy } from "@shared/schema";

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

export function generateLuckRemedies(
  planets: PlanetPosition[], 
  aspects: AspectData[], 
  houses: HousePosition[]
): LuckRemedy[] {
  const remedies: LuckRemedy[] = [];
  
  // Analyze planetary positions for specific remedies
  planets.forEach(planet => {
    const planetName = planet.name.charAt(0).toUpperCase() + planet.name.slice(1);
    const sign = planet.zodiacSign;
    const house = planet.house;
    
    // Jupiter remedies for luck and wisdom
    if (planet.name === "jupiter") {
      if (sign === "sagittarius" || sign === "cancer" || sign === "pisces") {
        remedies.push({
          title: `${planetName} Blessings`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings natural luck and expansion through this auspicious placement.`,
          practices: [
            `Wear yellow or gold on Thursdays to honor your ${sign} Jupiter`,
            "Donate to educational causes or temples",
            "Practice gratitude daily and help those in need",
            `Focus on ${getOrdinal(house)} house opportunities for growth`
          ],
          iconType: "gift",
          color: "text-yellow-600"
        });
      } else if (house === 9 || house === 11 || house === 1 || house === 5) {
        remedies.push({
          title: `${planetName} Fortune Enhancement`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings opportunities for growth and luck through this specific placement.`,
          practices: [
            `Light a yellow candle on Thursdays for your ${sign} Jupiter`,
            "Feed birds or animals regularly",
            "Practice generosity and charitable giving",
            `Focus on ${getOrdinal(house)} house themes for abundance`
          ],
          iconType: "star",
          color: "text-yellow-600"
        });
      } else {
        // General Jupiter remedy for any other placement
        remedies.push({
          title: `${planetName} Wisdom Activation`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings opportunities for growth through wisdom and learning.`,
          practices: [
            "Read inspiring books on Thursdays",
            "Practice acts of kindness and generosity",
            "Wear yellow accessories or clothing",
            "Study philosophy or spiritual teachings"
          ],
          iconType: "star",
          color: "text-yellow-600"
        });
      }
    }

    // Venus remedies for love, beauty, and prosperity
    if (planet.name === "venus") {
      if (sign === "taurus" || sign === "libra" || sign === "pisces") {
        remedies.push({
          title: `${planetName} Harmony Boost`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings natural charm and the ability to attract love and abundance through this harmonious placement.`,
          practices: [
            `Enjoy art and beauty on Fridays to honor your ${sign} Venus`,
            "Practice gratitude for all the beauty in your life",
            "Wear soft colors like pink, white, or pastels",
            `Cultivate ${getOrdinal(house)} house themes with love and appreciation`
          ],
          iconType: "star",
          color: "text-pink-600"
        });
      } else if (house === 2 || house === 7 || house === 5 || house === 11) {
        remedies.push({
          title: `${planetName} Attraction Power`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings opportunities to attract love, money, and beautiful experiences through this beneficial placement.`,
          practices: [
            `Surround yourself with beauty on Fridays, honoring your ${sign} Venus`,
            "Practice loving-kindness towards yourself and others",
            "Use rose quartz or wear jewelry on Fridays",
            `Focus on enhancing ${getOrdinal(house)} house areas with beauty`
          ],
          iconType: "gift",
          color: "text-pink-600"
        });
      } else {
        // General Venus remedy for any other placement
        remedies.push({
          title: `${planetName} Love & Prosperity`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings opportunities for love, beauty, and material prosperity.`,
          practices: [
            "Appreciate beauty in your daily life",
            "Practice loving-kindness meditation",
            "Wear pleasant fragrances on Fridays",
            "Create harmony in your living space"
          ],
          iconType: "gift",
          color: "text-pink-600"
        });
      }
    }

    // Sun remedies for confidence and leadership
    if (planet.name === "sun") {
      if (sign === "leo" || sign === "aries" || sign === "sagittarius") {
        remedies.push({
          title: `${planetName} Leadership Activation`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings natural leadership and authority unique to this powerful placement.`,
          practices: [
            `Spend time in sunlight every Sunday to honor your ${sign} Sun`,
            "Practice confident posture and assertive communication",
            "Wear gold, orange, or bright colors on Sundays",
            `Take leadership roles in ${getOrdinal(house)} house matters`
          ],
          iconType: "sun",
          color: "text-orange-600"
        });
      } else if (house === 1 || house === 10 || house === 5 || house === 9) {
        remedies.push({
          title: `${planetName} Authority Enhancement`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings leadership and authority unique to this placement.`,
          practices: [
            `Face the rising sun and practice gratitude, honoring your ${sign} Sun`,
            "Wear red, orange, or copper colors on Sundays",
            "Practice confidence-building exercises",
            "Light a lamp or candle during sunset"
          ],
          iconType: "sparkles",
          color: "text-orange-600"
        });
      } else {
        // General Sun remedy for any other placement  
        remedies.push({
          title: `${planetName} Vitality Boost`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings life force energy and personal power unique to this placement.`,
          practices: [
            `Spend time in sunlight daily to honor your ${sign} Sun`,
            "Wear warm colors on Sundays",
            `Practice positive affirmations about your ${getOrdinal(house)} house themes`,
            "Engage in activities that boost confidence"
          ],
          iconType: "sun",
          color: "text-orange-600"
        });
      }
    }

    // Moon remedies for emotional balance and intuition
    if (planet.name === "moon") {
      if (sign === "cancer" || sign === "pisces" || sign === "taurus") {
        remedies.push({
          title: `${planetName} Intuitive Wisdom`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings deep emotional wisdom and powerful intuition through this natural placement.`,
          practices: [
            `Connect with lunar cycles on Mondays, honoring your ${sign} Moon`,
            "Practice meditation near water or with water sounds",
            "Keep a dream journal for intuitive insights",
            `Trust your emotional wisdom about ${getOrdinal(house)} house matters`
          ],
          iconType: "moon",
          color: "text-blue-600"
        });
      } else if (house === 4 || house === 8 || house === 12 || house === 1) {
        remedies.push({
          title: `${planetName} Emotional Healing`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings deep emotional insights and healing abilities through this sensitive placement.`,
          practices: [
            `Practice moon gazing on Mondays, connecting with your ${sign} Moon energy`,
            "Use silver jewelry or white gemstones",
            "Engage in nurturing activities for yourself and others",
            `Honor your emotional needs in ${getOrdinal(house)} house areas`
          ],
          iconType: "sparkles",
          color: "text-blue-600"
        });
      } else {
        // General Moon remedy for any other placement
        remedies.push({
          title: `${planetName} Inner Peace`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings emotional wisdom and intuitive insights specific to this combination.`,
          practices: [
            `Practice mindfulness meditation on Mondays, focusing on your ${sign} Moon energy`,
            "Honor your emotional rhythms",
            "Wear calming colors like white or blue",
            `Work with ${getOrdinal(house)} house themes in your emotional healing`
          ],
          iconType: "moon",
          color: "text-blue-600"
        });
      }
    }

    // Mars remedies for energy and action
    if (planet.name === "mars") {
      if (sign === "aries" || sign === "scorpio" || sign === "capricorn") {
        remedies.push({
          title: `${planetName} Power Activation`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings powerful energy and determination through this strong placement.`,
          practices: [
            `Engage in physical exercise on Tuesdays to honor your ${sign} Mars`,
            "Practice martial arts or competitive sports",
            "Wear red coral or red clothing on Tuesdays", 
            `Channel your warrior energy into ${getOrdinal(house)} house goals`
          ],
          iconType: "sparkles",
          color: "text-red-600"
        });
      } else if (house === 1 || house === 3 || house === 6 || house === 10) {
        remedies.push({
          title: `${planetName} Energy Boost`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings dynamic energy and courage for achievement in this active placement.`,
          practices: [
            `Practice assertiveness training, channeling your ${sign} Mars`,
            "Engage in regular physical activity on Tuesdays",
            "Use iron objects or wear red accessories",
            `Take initiative in ${getOrdinal(house)} house activities`
          ],
          iconType: "gift",
          color: "text-red-600"
        });
      } else {
        // General Mars remedy for any other placement
        remedies.push({
          title: `${planetName} Action Power`,
          description: `Your ${planetName} in ${sign.charAt(0).toUpperCase() + sign.slice(1)} in the ${getOrdinal(house)} house brings dynamic energy and the courage to take action in unique ways.`,
          practices: [
            `Channel your ${sign} Mars energy into productive activities`,
            "Practice physical exercise on Tuesdays",
            "Wear red accessories for confidence",
            `Take decisive action on ${getOrdinal(house)} house matters`
          ],
          iconType: "sparkles",
          color: "text-red-600"
        });
      }
    }
  });

  // Ensure we have at least a few remedies, if none generated, add general ones
  if (remedies.length === 0) {
    // Find the most significant planets for general remedies
    const sunPlanet = planets.find(p => p.name === "sun");
    if (sunPlanet) {
      remedies.push({
        title: "Solar Energy Enhancement",
        description: `Your Sun in ${sunPlanet.zodiacSign.charAt(0).toUpperCase() + sunPlanet.zodiacSign.slice(1)} in the ${getOrdinal(sunPlanet.house)} house can be strengthened for greater vitality and confidence.`,
        practices: [
          "Face the sunrise each morning",
          "Wear warm colors on Sundays",
          "Practice gratitude daily",
          "Engage in leadership activities"
        ],
        iconType: "sun",
        color: "text-orange-600"
      });
    }
  }

  // Limit to top 3-4 remedies for readability
  return remedies.slice(0, 4);
}