import { type LocationResult } from "@shared/schema";

// Mock geocoding service - in production, use a real service like OpenCageData or Google Geocoding API
const MOCK_LOCATIONS: LocationResult[] = [
  // United States
  {
    name: "New York, NY, USA",
    latitude: 40.7128,
    longitude: -74.0060,
    timezone: "America/New_York",
    country: "United States",
    admin1: "New York"
  },
  {
    name: "Los Angeles, CA, USA", 
    latitude: 34.0522,
    longitude: -118.2437,
    timezone: "America/Los_Angeles",
    country: "United States",
    admin1: "California"
  },
  {
    name: "Chicago, IL, USA",
    latitude: 41.8781,
    longitude: -87.6298,
    timezone: "America/Chicago",
    country: "United States",
    admin1: "Illinois"
  },
  {
    name: "Houston, TX, USA",
    latitude: 29.7604,
    longitude: -95.3698,
    timezone: "America/Chicago",
    country: "United States",
    admin1: "Texas"
  },
  {
    name: "Phoenix, AZ, USA",
    latitude: 33.4484,
    longitude: -112.0740,
    timezone: "America/Phoenix",
    country: "United States",
    admin1: "Arizona"
  },
  {
    name: "Philadelphia, PA, USA",
    latitude: 39.9526,
    longitude: -75.1652,
    timezone: "America/New_York",
    country: "United States",
    admin1: "Pennsylvania"
  },
  {
    name: "San Antonio, TX, USA",
    latitude: 29.4241,
    longitude: -98.4936,
    timezone: "America/Chicago",
    country: "United States",
    admin1: "Texas"
  },
  {
    name: "San Diego, CA, USA",
    latitude: 32.7157,
    longitude: -117.1611,
    timezone: "America/Los_Angeles",
    country: "United States",
    admin1: "California"
  },
  {
    name: "Dallas, TX, USA",
    latitude: 32.7767,
    longitude: -96.7970,
    timezone: "America/Chicago",
    country: "United States",
    admin1: "Texas"
  },
  {
    name: "San Jose, CA, USA",
    latitude: 37.3382,
    longitude: -121.8863,
    timezone: "America/Los_Angeles",
    country: "United States",
    admin1: "California"
  },

  // India - Major cities across states
  {
    name: "Mumbai, Maharashtra, India",
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },
  {
    name: "Delhi, Delhi, India",
    latitude: 28.7041,
    longitude: 77.1025,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Delhi"
  },
  {
    name: "Bangalore, Karnataka, India",
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Karnataka"
  },
  {
    name: "Hyderabad, Telangana, India",
    latitude: 17.3850,
    longitude: 78.4867,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Telangana"
  },
  {
    name: "Ahmedabad, Gujarat, India",
    latitude: 23.0225,
    longitude: 72.5714,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Gujarat"
  },
  {
    name: "Chennai, Tamil Nadu, India",
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Tamil Nadu"
  },
  {
    name: "Kolkata, West Bengal, India",
    latitude: 22.5726,
    longitude: 88.3639,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "West Bengal"
  },
  {
    name: "Surat, Gujarat, India",
    latitude: 21.1702,
    longitude: 72.8311,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Gujarat"
  },
  {
    name: "Pune, Maharashtra, India",
    latitude: 18.5204,
    longitude: 73.8567,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },
  {
    name: "Jaipur, Rajasthan, India",
    latitude: 26.9124,
    longitude: 75.7873,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Rajasthan"
  },
  {
    name: "Lucknow, Uttar Pradesh, India",
    latitude: 26.8467,
    longitude: 80.9462,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Kanpur, Uttar Pradesh, India",
    latitude: 26.4499,
    longitude: 80.3319,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Nagpur, Maharashtra, India",
    latitude: 21.1458,
    longitude: 79.0882,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },
  {
    name: "Indore, Madhya Pradesh, India",
    latitude: 22.7196,
    longitude: 75.8577,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Madhya Pradesh"
  },
  {
    name: "Thane, Maharashtra, India",
    latitude: 19.2183,
    longitude: 72.9781,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },
  {
    name: "Bhopal, Madhya Pradesh, India",
    latitude: 23.2599,
    longitude: 77.4126,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Madhya Pradesh"
  },
  {
    name: "Visakhapatnam, Andhra Pradesh, India",
    latitude: 17.6868,
    longitude: 83.2185,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Andhra Pradesh"
  },
  {
    name: "Pimpri-Chinchwad, Maharashtra, India",
    latitude: 18.6298,
    longitude: 73.7997,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },
  {
    name: "Patna, Bihar, India",
    latitude: 25.5941,
    longitude: 85.1376,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Bihar"
  },
  {
    name: "Ludhiana, Punjab, India",
    latitude: 30.9010,
    longitude: 75.8573,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Punjab"
  },
  {
    name: "Agra, Uttar Pradesh, India",
    latitude: 27.1767,
    longitude: 78.0081,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Nashik, Maharashtra, India",
    latitude: 19.9975,
    longitude: 73.7898,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },
  {
    name: "Vadodara, Gujarat, India",
    latitude: 22.3072,
    longitude: 73.1812,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Gujarat"
  },
  {
    name: "Ghaziabad, Uttar Pradesh, India",
    latitude: 28.6692,
    longitude: 77.4538,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Kalyan-Dombivli, Maharashtra, India",
    latitude: 19.2403,
    longitude: 73.1305,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },

  // UK
  {
    name: "London, England, UK",
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: "Europe/London",
    country: "United Kingdom",
    admin1: "England"
  },
  {
    name: "Birmingham, England, UK",
    latitude: 52.4862,
    longitude: -1.8904,
    timezone: "Europe/London",
    country: "United Kingdom",
    admin1: "England"
  },
  {
    name: "Manchester, England, UK",
    latitude: 53.4808,
    longitude: -2.2426,
    timezone: "Europe/London",
    country: "United Kingdom",
    admin1: "England"
  },
  {
    name: "Liverpool, England, UK",
    latitude: 53.4084,
    longitude: -2.9916,
    timezone: "Europe/London",
    country: "United Kingdom",
    admin1: "England"
  },
  {
    name: "Glasgow, Scotland, UK",
    latitude: 55.8642,
    longitude: -4.2518,
    timezone: "Europe/London",
    country: "United Kingdom",
    admin1: "Scotland"
  },
  {
    name: "Edinburgh, Scotland, UK",
    latitude: 55.9533,
    longitude: -3.1883,
    timezone: "Europe/London",
    country: "United Kingdom",
    admin1: "Scotland"
  },

  // France
  {
    name: "Paris, France",
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: "Europe/Paris",
    country: "France",
    admin1: "Île-de-France"
  },
  {
    name: "Marseille, France",
    latitude: 43.2965,
    longitude: 5.3698,
    timezone: "Europe/Paris",
    country: "France",
    admin1: "Provence-Alpes-Côte d'Azur"
  },
  {
    name: "Lyon, France",
    latitude: 45.7640,
    longitude: 4.8357,
    timezone: "Europe/Paris",
    country: "France",
    admin1: "Auvergne-Rhône-Alpes"
  },
  {
    name: "Toulouse, France",
    latitude: 43.6047,
    longitude: 1.4442,
    timezone: "Europe/Paris",
    country: "France",
    admin1: "Occitanie"
  },
  {
    name: "Nice, France",
    latitude: 43.7102,
    longitude: 7.2620,
    timezone: "Europe/Paris",
    country: "France",
    admin1: "Provence-Alpes-Côte d'Azur"
  },

  // Germany
  {
    name: "Berlin, Germany",
    latitude: 52.5200,
    longitude: 13.4050,
    timezone: "Europe/Berlin",
    country: "Germany",
    admin1: "Berlin"
  },
  {
    name: "Munich, Germany",
    latitude: 48.1351,
    longitude: 11.5820,
    timezone: "Europe/Berlin",
    country: "Germany",
    admin1: "Bavaria"
  },
  {
    name: "Hamburg, Germany",
    latitude: 53.5511,
    longitude: 9.9937,
    timezone: "Europe/Berlin",
    country: "Germany",
    admin1: "Hamburg"
  },
  {
    name: "Frankfurt, Germany",
    latitude: 50.1109,
    longitude: 8.6821,
    timezone: "Europe/Berlin",
    country: "Germany",
    admin1: "Hesse"
  },

  // Japan
  {
    name: "Tokyo, Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: "Asia/Tokyo",
    country: "Japan",
    admin1: "Tokyo"
  },
  {
    name: "Osaka, Japan",
    latitude: 34.6937,
    longitude: 135.5023,
    timezone: "Asia/Tokyo",
    country: "Japan",
    admin1: "Osaka"
  },
  {
    name: "Kyoto, Japan",
    latitude: 35.0116,
    longitude: 135.7681,
    timezone: "Asia/Tokyo",
    country: "Japan",
    admin1: "Kyoto"
  },
  {
    name: "Yokohama, Japan",
    latitude: 35.4437,
    longitude: 139.6380,
    timezone: "Asia/Tokyo",
    country: "Japan",
    admin1: "Kanagawa"
  },

  // Australia
  {
    name: "Sydney, NSW, Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    timezone: "Australia/Sydney",
    country: "Australia",
    admin1: "New South Wales"
  },
  {
    name: "Melbourne, VIC, Australia",
    latitude: -37.8136,
    longitude: 144.9631,
    timezone: "Australia/Melbourne",
    country: "Australia",
    admin1: "Victoria"
  },
  {
    name: "Brisbane, QLD, Australia",
    latitude: -27.4698,
    longitude: 153.0251,
    timezone: "Australia/Brisbane",
    country: "Australia",
    admin1: "Queensland"
  },
  {
    name: "Perth, WA, Australia",
    latitude: -31.9505,
    longitude: 115.8605,
    timezone: "Australia/Perth",
    country: "Australia",
    admin1: "Western Australia"
  },
  {
    name: "Adelaide, SA, Australia",
    latitude: -34.9285,
    longitude: 138.6007,
    timezone: "Australia/Adelaide",
    country: "Australia",
    admin1: "South Australia"
  },

  // Canada
  {
    name: "Toronto, ON, Canada",
    latitude: 43.6532,
    longitude: -79.3832,
    timezone: "America/Toronto",
    country: "Canada",
    admin1: "Ontario"
  },
  {
    name: "Montreal, QC, Canada",
    latitude: 45.5017,
    longitude: -73.5673,
    timezone: "America/Montreal",
    country: "Canada",
    admin1: "Quebec"
  },
  {
    name: "Vancouver, BC, Canada",
    latitude: 49.2827,
    longitude: -123.1207,
    timezone: "America/Vancouver",
    country: "Canada",
    admin1: "British Columbia"
  },
  {
    name: "Calgary, AB, Canada",
    latitude: 51.0447,
    longitude: -114.0719,
    timezone: "America/Edmonton",
    country: "Canada",
    admin1: "Alberta"
  },

  // China
  {
    name: "Beijing, China",
    latitude: 39.9042,
    longitude: 116.4074,
    timezone: "Asia/Shanghai",
    country: "China",
    admin1: "Beijing"
  },
  {
    name: "Shanghai, China",
    latitude: 31.2304,
    longitude: 121.4737,
    timezone: "Asia/Shanghai",
    country: "China",
    admin1: "Shanghai"
  },
  {
    name: "Guangzhou, China",
    latitude: 23.1291,
    longitude: 113.2644,
    timezone: "Asia/Shanghai",
    country: "China",
    admin1: "Guangdong"
  },
  {
    name: "Shenzhen, China",
    latitude: 22.5431,
    longitude: 114.0579,
    timezone: "Asia/Shanghai",
    country: "China",
    admin1: "Guangdong"
  }
];

export async function searchLocations(query: string): Promise<LocationResult[]> {
  // In production, use a real geocoding API
  // For now, filter mock data
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return [];
  }
  
  const results = MOCK_LOCATIONS.filter(location => 
    location.name.toLowerCase().includes(normalizedQuery) ||
    location.country.toLowerCase().includes(normalizedQuery) ||
    location.admin1?.toLowerCase().includes(normalizedQuery)
  );
  
  return results.slice(0, 10); // Limit to 10 results
}

export async function geocodeLocation(locationName: string): Promise<LocationResult | null> {
  // In production, use a real geocoding API
  const normalizedName = locationName.toLowerCase().trim();
  
  const result = MOCK_LOCATIONS.find(location => 
    location.name.toLowerCase() === normalizedName
  );
  
  return result || null;
}

// In production, you would implement this with a real geocoding service:
/*
export async function searchLocations(query: string): Promise<LocationResult[]> {
  const API_KEY = process.env.GEOCODING_API_KEY || process.env.OPENCAGE_API_KEY || "your-api-key";
  
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${API_KEY}&limit=10&no_annotations=1`
    );
    
    const data = await response.json();
    
    return data.results.map((result: any) => ({
      name: result.formatted,
      latitude: result.geometry.lat,
      longitude: result.geometry.lng,
      timezone: result.annotations?.timezone?.name || "UTC",
      country: result.components.country || "",
      admin1: result.components.state || result.components.province || ""
    }));
  } catch (error) {
    console.error("Geocoding error:", error);
    return [];
  }
}
*/
