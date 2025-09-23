/* natalCalc.js - approximate natal calculations (computeNatal) */
function mod(a, n){ return ((a % n) + n) % n; }
function toRad(d){ return d * Math.PI/180; }
function toDeg(r){ return r * 180/Math.PI; }
function fix360(d){ return mod(d,360); }
function julianDayFromDate(year, month, day, hourUTC){
  if(month <= 2){ year -= 1; month += 12; }
  const A = Math.floor(year/100);
  const B = 2 - A + Math.floor(A/4);
  const dayFrac = hourUTC / 24.0;
  const JD = Math.floor(365.25*(year + 4716))
           + Math.floor(30.6001*(month + 1))
           + day + dayFrac + B - 1524.5;
  return JD;
}
function sunEclipticLongitude(jd){
  const T = (jd - 2451545.0)/36525.0;
  const M = fix360(357.52911 + 35999.05029*T - 0.0001537*T*T);
  const L0 = fix360(280.46646 + 36000.76983*T + 0.0003032*T*T);
  const C = (1.914602 - 0.004817*T - 0.000014*T*T)*Math.sin(toRad(M))
          + (0.019993 - 0.000101*T)*Math.sin(toRad(2*M))
          + 0.000289*Math.sin(toRad(3*M));
  const trueLong = L0 + C;
  return fix360(trueLong);
}
function moonEclipticLongitude(jd){
  const T = (jd - 2451545.0)/36525.0;
  const D = fix360(297.8501921 + 445267.1114034*T - 0.0018819*T*T + T*T*T/545868 - T*T*T*T/113065000);
  const M = fix360(357.5291092 + 35999.0502909*T - 0.0001536*T*T + T*T*T/24490000);
  const Mprime = fix360(134.9633964 + 477198.8675055*T + 0.0087414*T*T + T*T*T/69699 - T*T*T*T/14712000);
  const Lprime = fix360(218.3164477 + 481267.88123421*T - 0.0015786*T*T + T*T*T/538841 - T*T*T*T/65194000);
  const lonCorrections = 
    6.289 * Math.sin(toRad(Mprime)) +
    1.274 * Math.sin(toRad(2*D - Mprime)) +
    0.658 * Math.sin(toRad(2*D)) +
    0.214 * Math.sin(toRad(2*Mprime)) -
    0.186 * Math.sin(toRad(M)) -
    0.059 * Math.sin(toRad(2*D - 2*Mprime)) -
    0.057 * Math.sin(toRad(2*D - M - Mprime)) +
    0.053 * Math.sin(toRad(2*D + Mprime)) +
    0.046 * Math.sin(toRad(2*D - M)) +
    0.041 * Math.sin(toRad(M - Mprime));
  const trueMoonLong = Lprime + lonCorrections;
  return fix360(trueMoonLong);
}
function meanObliquity(jd){
  const T = (jd - 2451545.0)/36525.0;
  const seconds = 21.448 - T*(46.8150 + T*(0.00059 - T*(0.001813)));
  const eps0 = 23.0 + (26.0 + (seconds/60.0))/60.0;
  return eps0;
}
function greenwichSiderealTime(jd){
  const T = (jd - 2451545.0)/36525.0;
  let GMST = 280.46061837 + 360.98564736629*(jd - 2451545.0) 
             + 0.000387933*T*T - T*T*T/38710000;
  return fix360(GMST);
}
function localSiderealTime(jd, lonEastDeg){
  return fix360(greenwichSiderealTime(jd) + lonEastDeg);
}
function ascendant(jd, latDeg, lonEastDeg){
  const eps = meanObliquity(jd);
  const LST = localSiderealTime(jd, lonEastDeg);
  const lst = toRad(LST);
  const lat = toRad(latDeg);
  const num = Math.sin(lst)*Math.cos(eps) - Math.tan(lat)*Math.sin(eps);
  const den = Math.cos(lst);
  const ascRad = Math.atan2(num, den);
  let ascDeg = fix360(toDeg(ascRad));
  if(ascDeg < 0) ascDeg += 360;
  return ascDeg;
}
const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
function degToZodiac(deg){
  const d = fix360(deg);
  const signIndex = Math.floor(d / 30);
  const degInSign = d - signIndex*30;
  return { sign: signs[signIndex], deg: degInSign, fullDeg: d };
}
function computeNatal(year, month, day, hour, minute, tzOffsetHours, lat, lon){
  const localDecimalHour = hour + minute/60.0;
  const utcHour = localDecimalHour - tzOffsetHours;
  const jd = julianDayFromDate(year, month, day, utcHour);
  const sunLon = sunEclipticLongitude(jd);
  const moonLon = moonEclipticLongitude(jd);
  const ascLon = ascendant(jd, lat, lon);
  return {
    jd: jd,
    sun: { eclDeg: sunLon, zodiac: degToZodiac(sunLon) },
    moon: { eclDeg: moonLon, zodiac: degToZodiac(moonLon) },
    ascendant: { eclDeg: ascLon, zodiac: degToZodiac(ascLon) },
    notes: "Approximate positions. For higher precision use Swiss Ephemeris."
  };
}
