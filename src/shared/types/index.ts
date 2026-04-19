// 1. Definition of the Interfaces
export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type UserRole = 'Student' | 'Instructor' | 'Admin';

export interface Instructor {
  id: string;
  name: string;
  avatarUrl: string | null;
  rating: number;
  reviewsCount: number;
  hourlyRate: number;      // Price in EGP per hour
  location?: string;       // City or District
  carType: string;         // Car model or type
  experienceYears?: number; 
  isVerified: boolean;
  // Added for map and detail functionality
  lat?: number;
  lng?: number;
  bio?: string;
  distanceKm?: number;
}

export interface StudentProgress {
  currentLevel: number; 
  completedSkills: string[];
  totalSessions: number;
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
    hourlyRate: 200,
    location: "October City",
    carType: "Manual (Toyota Corolla)",
    experienceYears: 5,
    lat: 30.0444,
    lng: 31.2357,
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
    hourlyRate: 150,
    location: "Sheikh Zayed",
    carType: "Automatic (Hyundai Elantra)",
    experienceYears: 3,
    lat: 30.0131, 
    lng: 30.9876,
    distanceKm: 5.8,
    bio: "Specialized in parking skills and driving in heavy traffic."
  }
];

export const instructors = mockInstructors;

// 3. Student Progress Mock Data
export const mockStudentProgress: StudentProgress = {
  currentLevel: 2,
  completedSkills: ["Starting Engine", "Basic Steering", "Signals"],
  totalSessions: 12
};

// 4. Student Levels (for UI display)
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

// 5. Student Sessions Data
export const studentSessions = [
  {
    id: 1,
    instructorName: "Taha Mohamed",
    date: "2026/04/20",
    time: "10:00 AM",
    location: "October City",
    status: "Upcoming" as BookingStatus
  }
];