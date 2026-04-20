export type InstructorStatus = "pending" | "approved" | "rejected";

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: "trainee" | "instructor" | "admin";
  joinedDate: string;
  isActive: boolean;
}

export interface DashboardStat {
  icon: any; 
  label: string;
  value: string | number;
  color: string; 
}

export interface SystemSettings {
  platformName: string;
  commissionPercentage: number;
  minPrice: number;
  maxPrice: number;
  autoVerifyInstructors: boolean;
  allowPublicRegistration: boolean;
  emailNotificationsEnabled: boolean;
}

export interface AdminInstructorView {
  id: string;
  name: string;
  avatarUrl?: string;
  location: string;
  carModel: string;
  status: InstructorStatus;
  email: string;
  nationalId?: string;
  licenseNumber?: string;
}

export interface AdminStatsResponse {
  totalUsers: number;
  verifiedInstructors: number;
  pendingInstructors: number;
  weeklyBookings: number;
}