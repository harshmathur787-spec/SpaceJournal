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

  // India - Comprehensive cities across all states and union territories
  
  // Delhi (National Capital Territory)
  {
    name: "Delhi, Delhi, India",
    latitude: 28.7041,
    longitude: 77.1025,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Delhi"
  },
  {
    name: "New Delhi, Delhi, India",
    latitude: 28.6139,
    longitude: 77.2090,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Delhi"
  },
  {
    name: "Gurgaon, Haryana, India",
    latitude: 28.4595,
    longitude: 77.0266,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Haryana"
  },
  {
    name: "Noida, Uttar Pradesh, India",
    latitude: 28.5355,
    longitude: 77.3910,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Faridabad, Haryana, India",
    latitude: 28.4089,
    longitude: 77.3178,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Haryana"
  },

  // Maharashtra
  {
    name: "Mumbai, Maharashtra, India",
    latitude: 19.0760,
    longitude: 72.8777,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
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
    name: "Nagpur, Maharashtra, India",
    latitude: 21.1458,
    longitude: 79.0882,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
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
    name: "Nashik, Maharashtra, India",
    latitude: 19.9975,
    longitude: 73.7898,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },
  {
    name: "Kalyan-Dombivli, Maharashtra, India",
    latitude: 19.2403,
    longitude: 73.1305,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
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
    name: "Aurangabad, Maharashtra, India",
    latitude: 19.8762,
    longitude: 75.3433,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },
  {
    name: "Solapur, Maharashtra, India",
    latitude: 17.6599,
    longitude: 75.9064,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },
  {
    name: "Kolhapur, Maharashtra, India",
    latitude: 16.7050,
    longitude: 74.2433,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Maharashtra"
  },

  // Karnataka
  {
    name: "Bangalore, Karnataka, India",
    latitude: 12.9716,
    longitude: 77.5946,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Karnataka"
  },
  {
    name: "Mysore, Karnataka, India",
    latitude: 12.2958,
    longitude: 76.6394,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Karnataka"
  },
  {
    name: "Mangalore, Karnataka, India",
    latitude: 12.9141,
    longitude: 74.8560,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Karnataka"
  },
  {
    name: "Hubli-Dharwad, Karnataka, India",
    latitude: 15.3647,
    longitude: 75.1240,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Karnataka"
  },
  {
    name: "Belgaum, Karnataka, India",
    latitude: 15.8497,
    longitude: 74.4977,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Karnataka"
  },
  {
    name: "Gulbarga, Karnataka, India",
    latitude: 17.3297,
    longitude: 76.8343,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Karnataka"
  },

  // Tamil Nadu
  {
    name: "Chennai, Tamil Nadu, India",
    latitude: 13.0827,
    longitude: 80.2707,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Tamil Nadu"
  },
  {
    name: "Coimbatore, Tamil Nadu, India",
    latitude: 11.0168,
    longitude: 76.9558,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Tamil Nadu"
  },
  {
    name: "Madurai, Tamil Nadu, India",
    latitude: 9.9252,
    longitude: 78.1198,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Tamil Nadu"
  },
  {
    name: "Tiruchirappalli, Tamil Nadu, India",
    latitude: 10.7905,
    longitude: 78.7047,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Tamil Nadu"
  },
  {
    name: "Salem, Tamil Nadu, India",
    latitude: 11.6643,
    longitude: 78.1460,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Tamil Nadu"
  },
  {
    name: "Tirunelveli, Tamil Nadu, India",
    latitude: 8.7139,
    longitude: 77.7567,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Tamil Nadu"
  },
  {
    name: "Vellore, Tamil Nadu, India",
    latitude: 12.9165,
    longitude: 79.1325,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Tamil Nadu"
  },

  // Gujarat
  {
    name: "Ahmedabad, Gujarat, India",
    latitude: 23.0225,
    longitude: 72.5714,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Gujarat"
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
    name: "Vadodara, Gujarat, India",
    latitude: 22.3072,
    longitude: 73.1812,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Gujarat"
  },
  {
    name: "Rajkot, Gujarat, India",
    latitude: 22.3039,
    longitude: 70.8022,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Gujarat"
  },
  {
    name: "Bhavnagar, Gujarat, India",
    latitude: 21.7645,
    longitude: 72.1519,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Gujarat"
  },
  {
    name: "Jamnagar, Gujarat, India",
    latitude: 22.4707,
    longitude: 70.0577,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Gujarat"
  },

  // Uttar Pradesh
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
    name: "Ghaziabad, Uttar Pradesh, India",
    latitude: 28.6692,
    longitude: 77.4538,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
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
    name: "Meerut, Uttar Pradesh, India",
    latitude: 28.9845,
    longitude: 77.7064,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Varanasi, Uttar Pradesh, India",
    latitude: 25.3176,
    longitude: 82.9739,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Allahabad, Uttar Pradesh, India",
    latitude: 25.4358,
    longitude: 81.8463,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Bareilly, Uttar Pradesh, India",
    latitude: 28.3670,
    longitude: 79.4304,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Aligarh, Uttar Pradesh, India",
    latitude: 27.8974,
    longitude: 78.0880,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },
  {
    name: "Moradabad, Uttar Pradesh, India",
    latitude: 28.8386,
    longitude: 78.7733,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttar Pradesh"
  },

  // West Bengal
  {
    name: "Kolkata, West Bengal, India",
    latitude: 22.5726,
    longitude: 88.3639,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "West Bengal"
  },
  {
    name: "Howrah, West Bengal, India",
    latitude: 22.5958,
    longitude: 88.2636,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "West Bengal"
  },
  {
    name: "Durgapur, West Bengal, India",
    latitude: 23.5204,
    longitude: 87.3119,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "West Bengal"
  },
  {
    name: "Asansol, West Bengal, India",
    latitude: 23.6739,
    longitude: 86.9524,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "West Bengal"
  },
  {
    name: "Siliguri, West Bengal, India",
    latitude: 26.7271,
    longitude: 88.3953,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "West Bengal"
  },

  // Rajasthan
  {
    name: "Jaipur, Rajasthan, India",
    latitude: 26.9124,
    longitude: 75.7873,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Rajasthan"
  },
  {
    name: "Jodhpur, Rajasthan, India",
    latitude: 26.2389,
    longitude: 73.0243,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Rajasthan"
  },
  {
    name: "Udaipur, Rajasthan, India",
    latitude: 24.5854,
    longitude: 73.7125,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Rajasthan"
  },
  {
    name: "Kota, Rajasthan, India",
    latitude: 25.2138,
    longitude: 75.8648,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Rajasthan"
  },
  {
    name: "Bikaner, Rajasthan, India",
    latitude: 28.0229,
    longitude: 73.3119,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Rajasthan"
  },
  {
    name: "Ajmer, Rajasthan, India",
    latitude: 26.4499,
    longitude: 74.6399,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Rajasthan"
  },

  // Madhya Pradesh
  {
    name: "Bhopal, Madhya Pradesh, India",
    latitude: 23.2599,
    longitude: 77.4126,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Madhya Pradesh"
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
    name: "Gwalior, Madhya Pradesh, India",
    latitude: 26.2183,
    longitude: 78.1828,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Madhya Pradesh"
  },
  {
    name: "Jabalpur, Madhya Pradesh, India",
    latitude: 23.1815,
    longitude: 79.9864,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Madhya Pradesh"
  },
  {
    name: "Ujjain, Madhya Pradesh, India",
    latitude: 23.1765,
    longitude: 75.7885,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Madhya Pradesh"
  },

  // Telangana
  {
    name: "Hyderabad, Telangana, India",
    latitude: 17.3850,
    longitude: 78.4867,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Telangana"
  },
  {
    name: "Warangal, Telangana, India",
    latitude: 17.9689,
    longitude: 79.5941,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Telangana"
  },
  {
    name: "Nizamabad, Telangana, India",
    latitude: 18.6725,
    longitude: 78.0941,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Telangana"
  },

  // Andhra Pradesh
  {
    name: "Visakhapatnam, Andhra Pradesh, India",
    latitude: 17.6868,
    longitude: 83.2185,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Andhra Pradesh"
  },
  {
    name: "Vijayawada, Andhra Pradesh, India",
    latitude: 16.5062,
    longitude: 80.6480,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Andhra Pradesh"
  },
  {
    name: "Guntur, Andhra Pradesh, India",
    latitude: 16.3067,
    longitude: 80.4365,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Andhra Pradesh"
  },
  {
    name: "Tirupati, Andhra Pradesh, India",
    latitude: 13.6288,
    longitude: 79.4192,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Andhra Pradesh"
  },
  {
    name: "Kakinada, Andhra Pradesh, India",
    latitude: 16.9891,
    longitude: 82.2475,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Andhra Pradesh"
  },

  // Punjab
  {
    name: "Ludhiana, Punjab, India",
    latitude: 30.9010,
    longitude: 75.8573,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Punjab"
  },
  {
    name: "Amritsar, Punjab, India",
    latitude: 31.6340,
    longitude: 74.8723,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Punjab"
  },
  {
    name: "Jalandhar, Punjab, India",
    latitude: 31.3260,
    longitude: 75.5762,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Punjab"
  },
  {
    name: "Patiala, Punjab, India",
    latitude: 30.3398,
    longitude: 76.3869,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Punjab"
  },
  {
    name: "Bathinda, Punjab, India",
    latitude: 30.2110,
    longitude: 74.9455,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Punjab"
  },

  // Haryana
  {
    name: "Chandigarh, Chandigarh, India",
    latitude: 30.7333,
    longitude: 76.7794,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Chandigarh"
  },
  {
    name: "Panipat, Haryana, India",
    latitude: 29.3909,
    longitude: 76.9635,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Haryana"
  },
  {
    name: "Ambala, Haryana, India",
    latitude: 30.3782,
    longitude: 76.7767,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Haryana"
  },
  {
    name: "Yamunanagar, Haryana, India",
    latitude: 30.1290,
    longitude: 77.2674,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Haryana"
  },
  {
    name: "Rohtak, Haryana, India",
    latitude: 28.8955,
    longitude: 76.6066,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Haryana"
  },

  // Bihar
  {
    name: "Patna, Bihar, India",
    latitude: 25.5941,
    longitude: 85.1376,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Bihar"
  },
  {
    name: "Gaya, Bihar, India",
    latitude: 24.7914,
    longitude: 85.0002,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Bihar"
  },
  {
    name: "Bhagalpur, Bihar, India",
    latitude: 25.2425,
    longitude: 86.9842,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Bihar"
  },
  {
    name: "Muzaffarpur, Bihar, India",
    latitude: 26.1209,
    longitude: 85.3647,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Bihar"
  },
  {
    name: "Purnia, Bihar, India",
    latitude: 25.7781,
    longitude: 87.4753,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Bihar"
  },

  // Odisha (Orissa)
  {
    name: "Bhubaneswar, Odisha, India",
    latitude: 20.2961,
    longitude: 85.8245,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Odisha"
  },
  {
    name: "Cuttack, Odisha, India",
    latitude: 20.4625,
    longitude: 85.8828,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Odisha"
  },
  {
    name: "Rourkela, Odisha, India",
    latitude: 22.2604,
    longitude: 84.8536,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Odisha"
  },
  {
    name: "Berhampur, Odisha, India",
    latitude: 19.3149,
    longitude: 84.7941,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Odisha"
  },

  // Jharkhand
  {
    name: "Ranchi, Jharkhand, India",
    latitude: 23.3441,
    longitude: 85.3096,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Jharkhand"
  },
  {
    name: "Jamshedpur, Jharkhand, India",
    latitude: 22.8046,
    longitude: 86.2029,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Jharkhand"
  },
  {
    name: "Dhanbad, Jharkhand, India",
    latitude: 23.7957,
    longitude: 86.4304,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Jharkhand"
  },
  {
    name: "Bokaro, Jharkhand, India",
    latitude: 23.6693,
    longitude: 86.1511,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Jharkhand"
  },

  // Chhattisgarh
  {
    name: "Raipur, Chhattisgarh, India",
    latitude: 21.2514,
    longitude: 81.6296,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Chhattisgarh"
  },
  {
    name: "Bhilai, Chhattisgarh, India",
    latitude: 21.1938,
    longitude: 81.3509,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Chhattisgarh"
  },
  {
    name: "Bilaspur, Chhattisgarh, India",
    latitude: 22.0797,
    longitude: 82.1409,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Chhattisgarh"
  },
  {
    name: "Korba, Chhattisgarh, India",
    latitude: 22.3595,
    longitude: 82.7501,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Chhattisgarh"
  },

  // Kerala
  {
    name: "Thiruvananthapuram, Kerala, India",
    latitude: 8.5241,
    longitude: 76.9366,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Kerala"
  },
  {
    name: "Kochi, Kerala, India",
    latitude: 9.9312,
    longitude: 76.2673,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Kerala"
  },
  {
    name: "Calicut, Kerala, India",
    latitude: 11.2588,
    longitude: 75.7804,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Kerala"
  },
  {
    name: "Thrissur, Kerala, India",
    latitude: 10.5276,
    longitude: 76.2144,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Kerala"
  },
  {
    name: "Kollam, Kerala, India",
    latitude: 8.8932,
    longitude: 76.6141,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Kerala"
  },

  // Assam
  {
    name: "Guwahati, Assam, India",
    latitude: 26.1445,
    longitude: 91.7362,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Assam"
  },
  {
    name: "Silchar, Assam, India",
    latitude: 24.8333,
    longitude: 92.7789,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Assam"
  },
  {
    name: "Dibrugarh, Assam, India",
    latitude: 27.4728,
    longitude: 94.9120,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Assam"
  },
  {
    name: "Jorhat, Assam, India",
    latitude: 26.7509,
    longitude: 94.2037,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Assam"
  },

  // Himachal Pradesh
  {
    name: "Shimla, Himachal Pradesh, India",
    latitude: 31.1048,
    longitude: 77.1734,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Himachal Pradesh"
  },
  {
    name: "Dharamshala, Himachal Pradesh, India",
    latitude: 32.2190,
    longitude: 76.3234,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Himachal Pradesh"
  },
  {
    name: "Kullu, Himachal Pradesh, India",
    latitude: 31.9578,
    longitude: 77.1101,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Himachal Pradesh"
  },
  {
    name: "Manali, Himachal Pradesh, India",
    latitude: 32.2396,
    longitude: 77.1887,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Himachal Pradesh"
  },

  // Uttarakhand
  {
    name: "Dehradun, Uttarakhand, India",
    latitude: 30.3165,
    longitude: 78.0322,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttarakhand"
  },
  {
    name: "Haridwar, Uttarakhand, India",
    latitude: 29.9457,
    longitude: 78.1642,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttarakhand"
  },
  {
    name: "Nainital, Uttarakhand, India",
    latitude: 29.3803,
    longitude: 79.4636,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttarakhand"
  },
  {
    name: "Rishikesh, Uttarakhand, India",
    latitude: 30.0869,
    longitude: 78.2676,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Uttarakhand"
  },

  // Jammu and Kashmir
  {
    name: "Srinagar, Jammu and Kashmir, India",
    latitude: 34.0837,
    longitude: 74.7973,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Jammu and Kashmir"
  },
  {
    name: "Jammu, Jammu and Kashmir, India",
    latitude: 32.7266,
    longitude: 74.8570,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Jammu and Kashmir"
  },
  {
    name: "Leh, Ladakh, India",
    latitude: 34.1526,
    longitude: 77.5771,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Ladakh"
  },

  // Goa
  {
    name: "Panaji, Goa, India",
    latitude: 15.4909,
    longitude: 73.8278,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Goa"
  },
  {
    name: "Margao, Goa, India",
    latitude: 15.2700,
    longitude: 73.9500,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Goa"
  },
  {
    name: "Vasco da Gama, Goa, India",
    latitude: 15.3958,
    longitude: 73.8313,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Goa"
  },

  // Union Territories
  {
    name: "Puducherry, Puducherry, India",
    latitude: 11.9416,
    longitude: 79.8083,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Puducherry"
  },
  {
    name: "Port Blair, Andaman and Nicobar Islands, India",
    latitude: 11.6234,
    longitude: 92.7265,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Andaman and Nicobar Islands"
  },
  {
    name: "Kavaratti, Lakshadweep, India",
    latitude: 10.5669,
    longitude: 72.6420,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Lakshadweep"
  },
  {
    name: "Daman, Daman and Diu, India",
    latitude: 20.4283,
    longitude: 72.8397,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Daman and Diu"
  },
  {
    name: "Silvassa, Dadra and Nagar Haveli, India",
    latitude: 20.2738,
    longitude: 73.0260,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Dadra and Nagar Haveli"
  },

  // Northeast States
  {
    name: "Shillong, Meghalaya, India",
    latitude: 25.5788,
    longitude: 91.8933,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Meghalaya"
  },
  {
    name: "Imphal, Manipur, India",
    latitude: 24.8170,
    longitude: 93.9368,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Manipur"
  },
  {
    name: "Agartala, Tripura, India",
    latitude: 23.8315,
    longitude: 91.2868,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Tripura"
  },
  {
    name: "Aizawl, Mizoram, India",
    latitude: 23.7367,
    longitude: 92.7173,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Mizoram"
  },
  {
    name: "Kohima, Nagaland, India",
    latitude: 25.6751,
    longitude: 94.1086,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Nagaland"
  },
  {
    name: "Itanagar, Arunachal Pradesh, India",
    latitude: 27.0844,
    longitude: 93.6053,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Arunachal Pradesh"
  },
  {
    name: "Gangtok, Sikkim, India",
    latitude: 27.3389,
    longitude: 88.6065,
    timezone: "Asia/Kolkata",
    country: "India",
    admin1: "Sikkim"
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
