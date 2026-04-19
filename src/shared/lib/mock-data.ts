// 1. Definition of the Instructor Interface
export interface Instructor {
  id: string;
  name: string;
  avatarUrl: string;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  lat: number; // Latitude for maps
  lng: number; // Longitude for maps
  location: string;
  carType: "automatic" | "manual"; // Gearbox type
  carModel: string; // Specific car info (e.g., Toyota Corolla)
  experienceYears: number;
  hourlyRate: number;
  distanceKm?: number; // Distance from user
  bio?: string;
}

// 2. Mock Instructors Data
export const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "Taha Mohamed",
    avatarUrl: "https://github.com/shadcn.png",
    isVerified: true,
    rating: 4.8,
    reviewsCount: 120,
    lat: 30.0444,
    lng: 31.2357,
    location: "October City",
    carType: "manual",
    carModel: "Toyota Corolla 2022",
    experienceYears: 5,
    hourlyRate: 200,
    distanceKm: 2.5,
    bio: "Professional instructor with extensive experience teaching beginners."
  },
  {
    id: "2",
    name: "Captain Ahmed Ali",
    avatarUrl: "https://github.com/shadcn.png",
    isVerified: false,
    rating: 4.5,
    reviewsCount: 85,
    lat: 30.0131, 
    lng: 30.9876,
    location: "Sheikh Zayed",
    carType: "automatic",
    carModel: "Hyundai Elantra 2023",
    experienceYears: 3,
    hourlyRate: 150,
    distanceKm: 5.8,
    bio: "Specialized in parking skills and driving in heavy traffic."
  }
];

// Alias for ease of use
export const instructors = mockInstructors;

// Labels for UI Translation
export const carTypeLabel: Record<string, string> = {
  manual: "Manual",
  automatic: "Automatic"
};

// 3. Student Progress Data
export const studentLevels = [
  {
    id: 1,
    title: "Driving Basics",
    progress: 100,
    skills: [{ name: "Starting Engine", done: true }]
  },
  {
    id: 2,
    title: "Advanced Skills",
    progress: 45,
    skills: [{ name: "Parallel Parking", done: true }]
  }
];

// 4. Student Sessions Data
export const studentSessions = [
  {
    id: 1,
    instructorName: "Taha Mohamed",
    date: "2026/04/20",
    time: "10:00 AM",
    location: "October City",
    status: "Upcoming"
  }
];