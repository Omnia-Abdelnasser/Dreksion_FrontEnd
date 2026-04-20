// admin-components.ts
/**
 * This file acts as a central export point for all admin-related components.
 * It allows for cleaner imports in the main router or other features.
 */
// 1. Export the main Dashboard Overview
export { AdminDashboardIndex } from './dashboard-admin-index';
// 2. Export the Instructors Management/Review page
export { InstructorsReview } from './dashboard-admin-instructors';
// 3. Export the User Management page
export { AdminUsers } from './dashboard-admin-users';
// 4. Export the System Settings page
export { AdminSettings } from './dashboard-admin-settings';