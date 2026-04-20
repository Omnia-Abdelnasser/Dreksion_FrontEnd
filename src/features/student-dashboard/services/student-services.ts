import { api } from "@/shared/lib/api";
import { 
  StudentDashboardData, 
  StudentBooking, 
  UpdateProfilePayload, 
  StudentProfileData 
} from "../types/student-types";

/**
 * Fetch main dashboard data (Profile summary + Stats + Levels)
 * Used in the main dashboard index page
 */
export const getStudentDashboardData = async (): Promise<StudentDashboardData> => {
  try {
    const res = await api.get('/users/profile');
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch student dashboard data:", error);
    // Returns a safe fallback object to prevent UI crashes if the API fails
    return {
      firstName: "Student",
      lastName: "",
      stats: { 
        upcomingSessionsCount: 0, 
        completedSessionsCount: 0, 
        progressPercentage: 0, 
        currentLevel: 1 
      },
      levels: []
    };
  }
};

/**
 * Fetch all bookings (sessions) for the student
 * Used in both the dashboard summary and the detailed sessions page
 */
export const getStudentBookings = async (): Promise<StudentBooking[]> => {
  try {
    const res = await api.get('/users/bookings');
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch student bookings:", error);
    return []; // Return empty array to keep UI mapping safe
  }
};

/**
 * Fetch full profile details including sensitive info (email, phone, etc.)
 */
export const getStudentProfile = async (): Promise<StudentProfileData> => {
  try {
    const res = await api.get('/users/profile');
    return res.data.data;
  } catch (error) {
    console.error("Profile API Error:", error);
    throw error; // Rethrow to allow React Query's onError to handle it
  }
};

/**
 * Update student profile text information (FirstName, LastName, Phone, etc.)
 */
export const updateStudentProfile = async (payload: UpdateProfilePayload) => {
  try {
    const res = await api.put('/users/profile', payload);
    return res.data;
  } catch (error) {
    console.error("Update Profile Error:", error);
    throw error;
  }
};

/**
 * Upload and update student profile image using Multipart Form Data
 */
export const uploadProfileImage = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    const res = await api.put('/users/profile', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error("Upload Image Error:", error);
    throw error;
  }
};