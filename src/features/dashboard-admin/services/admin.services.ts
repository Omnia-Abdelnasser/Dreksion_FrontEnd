import { api } from "@/shared/lib/api";
import { 
  AdminUser, 
  AdminInstructorView, 
  AdminStatsResponse,
  SystemSettings 
} from "../types/admin.types";

/**
 * 1. DASHBOARD & ANALYTICS
 */

// Fetch main dashboard stats
export const getAdminStats = async (): Promise<AdminStatsResponse> => {
  const res = await api.get('/admin/stats');
  return res.data.data;
};

// Fetch registration trends (Optional/Future use)
export const getRegistrationAnalytics = async () => {
  const res = await api.get('/admin/analytics/registrations');
  return res.data.data;
};


/**
 * 2. USER MANAGEMENT
 */

// Fetch all users with optional search
export const getAllUsers = async (search?: string): Promise<AdminUser[]> => {
  const url = search ? `/admin/users?search=${search}` : '/admin/users';
  const res = await api.get(url);
  return res.data.data;
};

// Toggle user account status (Activate/Deactivate)
export const toggleUserStatus = async (userId: string, isActive: boolean) => {
  const res = await api.patch(`/admin/users/${userId}/status`, { isActive });
  return res.data;
};


/**
 * 3. INSTRUCTOR VERIFICATION & PRICING
 */

// Fetch users waiting for verification
export const getPendingInstructors = async (): Promise<AdminInstructorView[]> => {
  const res = await api.get('/admin/verifications');
  return res.data.results; 
};

// Approve or Reject verification request
export const updateInstructorStatus = async (userId: string, status: 'approved' | 'rejected') => {
  const res = await api.post('/admin/approve-verification', { userId, status });
  return res.data;
};

// Set custom pricing limits for specific instructor
export const setInstructorPricing = async (instructorId: string, minPrice: number, maxPrice: number) => {
  const res = await api.post('/admin/set-instructor-pricing', { instructorId, minPrice, maxPrice });
  return res.data;
};


/**
 * 4. EDUCATIONAL CONTENT (LMS)
 */

// Fetch all levels with their skills
export const getAllLevels = async () => {
  const res = await api.get('/admin/levels');
  return res.data.data;
};

// Create a new educational level
export const createLevel = async (levelData: { levelNumber: number; title: string; description?: string }) => {
  const res = await api.post('/admin/levels', levelData);
  return res.data.data;
};

// Update existing level
export const updateLevel = async (levelId: string, data: any) => {
  const res = await api.put(`/admin/levels/${levelId}`, data);
  return res.data.data;
};

// Delete level (and its skills)
export const deleteLevel = async (levelId: string) => {
  const res = await api.delete(`/admin/levels/${levelId}`);
  return res.data;
};

// Add skill to a specific level
export const addSkillToLevel = async (levelId: string, skillData: any) => {
  const res = await api.post(`/admin/levels/${levelId}/skills`, skillData);
  return res.data.data;
};


/**
 * 5. SYSTEM CONFIGURATION
 */

// Get global platform settings
export const getSystemSettings = async (): Promise<SystemSettings> => {
  const res = await api.get('/admin/settings');
  return res.data.data;
};

// Update platform settings
export const updateSystemSettings = async (settings: Partial<SystemSettings>) => {
  const res = await api.patch('/admin/settings', settings);
  return res.data.data;
};