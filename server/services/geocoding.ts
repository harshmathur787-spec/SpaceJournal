import { type LocationResult } from "@shared/schema";

// Mock geocoding service - in production, use a real service like OpenCageData or Google Geocoding API
const MOCK_LOCATIONS: LocationResult[] = [
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
    name: "London, England, UK",
    latitude: 51.5074,
    longitude: -0.1278,
    timezone: "Europe/London",
    country: "United Kingdom",
    admin1: "England"
  },
  {
    name: "Paris, France",
    latitude: 48.8566,
    longitude: 2.3522,
    timezone: "Europe/Paris",
    country: "France",
    admin1: "Île-de-France"
  },
  {
    name: "Tokyo, Japan",
    latitude: 35.6762,
    longitude: 139.6503,
    timezone: "Asia/Tokyo",
    country: "Japan",
    admin1: "Tokyo"
  },
  {
    name: "Sydney, NSW, Australia",
    latitude: -33.8688,
    longitude: 151.2093,
    timezone: "Australia/Sydney",
    country: "Australia",
    admin1: "New South Wales"
  },
  {
    name: "Mumbai, Maharashtra, India",
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
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
