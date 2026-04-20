/**
 * Basic statistics for the student's progress
 */
export interface StudentStats {
  upcomingSessionsCount: number;
  completedSessionsCount: number;
  progressPercentage: number;
  currentLevel: number;
}

/**
 * Individual skill within a learning level
 */
export interface StudentSkill {
  id: string;
  name: string;
  completed: boolean;
}

/**
 * Learning level containing multiple skills
 */
export interface StudentLevel {
  id: string;
  name: string;
  skills: StudentSkill[];
}

/**
 * Base data for the student used across the dashboard
 */
export interface StudentDashboardData {
  firstName: string;
  lastName: string; // Added to fix the property missing error
  stats: StudentStats;
  levels: StudentLevel[];
}

/**
 * Data structure for student bookings
 */
export interface StudentBooking {
  id: string;
  instructorName: string;
  bookingDate: string;
  startTime: string;
  meetingPoint: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
}

/**
 * Payload for updating profile information
 */
export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  location?: {
    address: string;
    city: string;
  };
  profileImage?: File | string; // Supports both direct file upload and URL
}

/**
 * Full profile data extending the dashboard base
 */
export interface StudentProfileData extends StudentDashboardData {
  email: string;
  phone: string;
  profileImage?: string;
  nationalId?: string;
  joinDate?: string; // Helpful for showing "Member since X"
}

/**
 * Individual skill within a learning level
 */
export interface StudentSkill {
  id: string;
  name: string;
  completed: boolean;
}

/**
 * Learning level containing multiple skills
 */
export interface StudentLevel {
  id: string;
  name: string;
  skills: StudentSkill[];
}

/**
 * Basic statistics for the student's progress
 */
export interface StudentStats {
  upcomingSessionsCount: number;
  completedSessionsCount: number;
  progressPercentage: number;
  currentLevel: number;
}

/**
 * Full dashboard data structure
 */
export interface StudentDashboardData {
  firstName: string;
  lastName: string;
  stats: StudentStats;
  levels: StudentLevel[];
}

/**
 * Booking record for the sessions list
 */
export interface StudentBooking {
  id: string;
  instructorName: string;
  bookingDate: string;
  startTime: string;
  meetingPoint: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no_show';
}