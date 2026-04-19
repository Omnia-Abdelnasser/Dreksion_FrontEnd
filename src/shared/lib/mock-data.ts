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
  carType: string;
  experienceYears: number;
  hourlyRate: number;
  bio?: string;
}

// 2. Mock Instructors Data
export const mockInstructors: Instructor[] = [
  {
    id: "1",
    name: "طه محمد",
    avatarUrl: "https://github.com/shadcn.png",
    isVerified: true,
    rating: 4.8,
    reviewsCount: 120,
    lat: 30.0444,
    lng: 31.2357,
    location: "أكتوبر",
    carType: "toyota",
    experienceYears: 5,
    hourlyRate: 200,
    bio: "مدرب محترف بخبرة كبيرة في تعليم القيادة للمبتدئين."
  },
  {
    id: "2",
    name: "كابتن أحمد علي",
    avatarUrl: "https://github.com/shadcn.png",
    isVerified: false,
    rating: 4.5,
    reviewsCount: 85,
    lat: 30.0131, 
    lng: 30.9876,
    location: "الشيخ زايد",
    carType: "hyundai",
    experienceYears: 3,
    hourlyRate: 150,
    bio: "متخصص في تعليم مهارات الركن والقيادة في الزحام."
  }
];

// Alias for ease of use
export const instructors = mockInstructors;

// Labels for UI Translation
export const carTypeLabel: Record<string, string> = {
  toyota: "تويوتا",
  hyundai: "هيونداي",
  manual: "مانيوال",
  automatic: "أوتوماتيك"
};

// 3. Student Progress Data
export const studentLevels = [
  {
    id: 1,
    title: "أساسيات القيادة",
    progress: 100,
    skills: [{ name: "تشغيل المحرك", done: true }]
  },
  {
    id: 2,
    title: "المهارات المتقدمة",
    progress: 45,
    skills: [{ name: "الركن الموازي", done: true }]
  }
];

// 4. Student Sessions Data
export const studentSessions = [
  {
    id: 1,
    instructorName: "طه محمد",
    date: "٢٠٢٦/٠٤/٢٠",
    time: "١٠:٠٠ ص",
    location: "أكتوبر",
    status: "قادمة"
  }
];