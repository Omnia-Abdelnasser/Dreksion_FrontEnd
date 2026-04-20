import { api } from "@/shared/lib/api";
import { 
  InstructorProfileData, 
  InstructorReviewsResponse, 
  Session, 
  Student 
} from "../types/instructor-types";

// 1. Fetch Instructor Dashboard Stats (Path updated based on Doc)
export const getInstructorDashboardData = async () => {
  try {
    const res = await api.get('/instructors/me/stats');
    return res.data.data;
  } catch (error) {
    console.error("Dashboard API failed:", error);
    return {
      stats: { todaySessionsCount: 0, totalStudents: 0, averageRating: 5.0, monthlyEarnings: 0, accountStatus: 'approved' },
      pendingBookings: [],
      todaySessions: []
    };
  }
};

// 2. Fetch Instructor Reviews (Assuming /reviews endpoint)
export const getInstructorReviews = async (): Promise<InstructorReviewsResponse> => {
  try {
    const res = await api.get('/instructors/me/reviews'); // Standard practice based on your patterns
    return res.data.data;
  } catch (error) {
    return { reviews: [], averageRating: 0, totalReviews: 0, ratingDistribution: [] };
  }
};

// 3. Fetch Current Profile (Path updated to /instructors/me)
export const getInstructorProfile = async (): Promise<InstructorProfileData> => {
  try {
    const res = await api.get('/instructors/me');
    return res.data.data;
  } catch (error) {
    return {} as InstructorProfileData;
  }
};

// 4. Update Profile (Method updated to PUT as per Doc)
export const updateInstructorProfile = async (data: any) => {
  const res = await api.put('/instructors/me', data);
  return res.data.data;
};

// 5. Update Booking Status (Path updated to /bookings/:id/status)
export const updateBookingStatus = async (bookingId: string, status: string) => {
  const res = await api.patch(`/bookings/${bookingId}/status`, { status });
  return res.data;
};

// 6. Fetch All Bookings (Path updated to /bookings)
export const getAllBookings = async (): Promise<Session[]> => {
  try {
    const res = await api.get('/bookings');
    return res.data.data;
  } catch (error) {
    return [];
  }
};

// 7. Fetch Instructor Availability (Assuming /me/availability)
export const getAvailability = async (): Promise<string[]> => {
  try {
    const res = await api.get('/instructors/me/availability');
    return res.data.data;
  } catch (error) {
    return [];
  }
};

// 8. Update Availability
export const updateAvailability = async (availability: string[]) => {
  const res = await api.post('/instructors/me/availability', { availability });
  return res.data;
};

// 9. Fetch Single Instructor by ID (Public Route)
export const getInstructorById = async (id: string) => {
  const res = await api.get(`/instructors/${id}`);
  return res.data.data;
};

// 10. Create New Booking (Path updated to /bookings)
export const createBooking = async (bookingData: any) => {
  const res = await api.post('/bookings', bookingData);
  return res.data;
};

// 11. Fetch All My Students (Path updated to /instructors/me/students)
export const getInstructorStudents = async (): Promise<Student[]> => {
  try {
    const res = await api.get('/instructors/me/students');
    return res.data.data;
  } catch (error) {
    return [];
  }
};

// 12. Update Student Skill (LMS Tracking)
export const updateStudentSkill = async (studentId: string, skillId: string, completed: boolean) => {
  const res = await api.patch(`/instructors/me/students/${studentId}/skills`, { skillId, completed });
  return res.data;
};