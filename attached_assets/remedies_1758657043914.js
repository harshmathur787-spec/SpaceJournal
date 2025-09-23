/* remedies.js - multi-layered personalized remedies based on sun, moon, ascendant */
function getUniqueRemedies(sun, moon, asc) {
  sun = sun || 'Aries'; moon = moon || 'Aries'; asc = asc || 'Aries';
  const sunRemedies = {
    Aries: "Wear red on Tuesdays, do 5 minutes of energizing exercise each morning, donate jaggery.",
    Taurus: "Keep a silver coin in your wallet; chant a gratitude mantra each evening.",
    Gemini: "Read or speak positively for 10 minutes daily; wear light green to invite communication luck.",
    Cancer: "Light a small lamp each Monday and spend time with family to invite emotional support.",
    Leo: "Wear gold/yellow for confidence; practice a short sun salutation each morning.",
    Virgo: "Keep a tidy workspace; donate pulses on Saturdays for steady growth.",
    Libra: "Light incense in the evening and practice small acts of kindness to attract balance.",
    Scorpio: "Offer red flowers on Tuesdays and practice breathwork to transform negative energy.",
    Sagittarius: "Donate yellow lentils on Thursdays; plan a short trip to refresh perspective.",
    Capricorn: "Help someone in need weekly; wake up before sunrise and set one long-term goal.",
    Aquarius: "Volunteer once a week; keep a small blue cloth or item in your wallet for inspiration.",
    Pisces: "Practice compassion exercises; keep a small bowl of clean water near your bed."
  };

  const moonRemedies = {
    Aries: "Daily short meditation to calm the mind; cool foods in the evening.",
    Taurus: "Place a rose quartz or warm light near your bedside for emotional harmony.",
    Gemini: "Write your thoughts each night; practice listening exercises to strengthen calm.",
    Cancer: "Drink warm milk before sleep and keep a small photo of loved ones for comfort.",
    Leo: "Practice grounding breathing for 5 minutes each evening; spend time in nature.",
    Virgo: "Avoid late-night screens; perform a short cleaning ritual before bed.",
    Libra: "Use pleasant scents in your room and keep soft lighting to soothe emotions.",
    Scorpio: "Saltwater bath or foot soak once a week to release heavy emotions.",
    Sagittarius: "Keep a gratitude journal and read a short inspiring quote every morning.",
    Capricorn: "Take short walks after meals to balance mood and encourage discipline.",
    Aquarius: "Listen to calming instrumental music before bed; limit stimulating media.",
    Pisces: "Use sandalwood or jasmine scent and practice gentle visualization before sleep."
  };

  const ascRemedies = {
    Aries: "Start your day with 15 minutes of physical activity; set small bold goals.",
    Taurus: "Place a money plant in the southeast of your living space; manage finances mindfully.",
    Gemini: "Carry a small notebook and pen for ideas; wear turquoise or green to boost communication.",
    Cancer: "Maintain a cozy home corner for relaxation; keep a moonstone crystal for soothing energy.",
    Leo: "Speak affirmations aloud; maintain a visible goal board in gold or yellow tones.",
    Virgo: "Organize your tasks every morning; keep a tidy workspace and a small herbal tea ritual.",
    Libra: "Wear a pleasant perfume and make time for relationships; balance work and rest.",
    Scorpio: "Practice introspective journaling; keep a red thread or cloth as a symbolic protector.",
    Sagittarius: "Plan a monthly short outing; keep an inspirational travel item in your bag.",
    Capricorn: "Create a morning routine with clear steps; help someone every weekend.",
    Aquarius: "Join a community activity monthly; keep notes of new ideas and follow one each month.",
    Pisces: "Maintain a small altar or calm corner; dedicate time weekly to creative practice."
  };

  const signElements = {
    Aries: "Fire", Leo: "Fire", Sagittarius: "Fire",
    Taurus: "Earth", Virgo: "Earth", Capricorn: "Earth",
    Gemini: "Air", Libra: "Air", Aquarius: "Air",
    Cancer: "Water", Scorpio: "Water", Pisces: "Water"
  };

  const elementRemedies = {
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

  const sunRem = sunRemedies[sun] || "";
  const moonRem = moonRemedies[moon] || "";
  const ascRem = ascRemedies[asc] || "";
  const element = elementRemedies[signElements[moon]] || "";
  const bonus = luckTips[Math.floor(Math.random() * luckTips.length)];

  return { sun: sunRem, moon: moonRem, asc: ascRem, element: element, bonus: bonus };
}
