export interface Review {
  id: string;
  studentName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface RatingDistribution {
  star: number;
  count: number;
}

export interface InstructorReviewsResponse {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  ratingDistribution: RatingDistribution[];
}

export interface InstructorProfileData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "male" | "female";
  location: string;
  nationalId: string;
  licenseNumber: string;
  avatarUrl?: string;
  joinedDate: string;
  isVerified: boolean;
  details: {
    bio?: string;
    carModel?: string;
    transmission?: "automatic" | "manual";
    pricePerHour?: number;
    sessionDuration?: string;
  };
}

export interface InstructorStats {
  todaySessionsCount: number;
  totalStudents: number;
  averageRating: number;
  monthlyEarnings: number;
  accountStatus: 'pending' | 'approved' | 'rejected';
}

// Merged Session interface to include all possible fields
export interface Session {
  id: string;
  studentName: string;
  date: string;
  time: string;
  location: string;
  price: number; // Keep price as mandatory or optional with ?
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export interface StudentSkill {
  id: string;
  name: string;
  completed: boolean;
}

export interface StudentLevel {
  id: string;
  name: string;
  skills: StudentSkill[];
}

export interface Student {
  id: string;
  name: string;
  sessions: number;
  currentLevel: number;
  progress: number;
  levels: StudentLevel[];
}