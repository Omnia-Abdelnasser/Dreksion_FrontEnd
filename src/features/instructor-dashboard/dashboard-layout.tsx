import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from "./components/dashboard-sidebar";
import { DashboardHeader } from "./components/dashboard-header";
interface DashboardLayoutProps {
  children?: React.ReactNode; 
  role?: "instructor" | "student" | "admin";
}
export function DashboardLayout({ children, role }: DashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-secondary/30" dir="rtl">
      <DashboardSidebar role={role} />

      <div className="flex flex-1 flex-col">
        <DashboardHeader />
        <main className="flex-1 p-4 md:p-8"> 
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
}