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
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type UserRole = 'Student' | 'Instructor' | 'Admin';

export interface StudentProgress {
  currentLevel: number; 
  completedSkills: string[];
  totalSessions: number;
}