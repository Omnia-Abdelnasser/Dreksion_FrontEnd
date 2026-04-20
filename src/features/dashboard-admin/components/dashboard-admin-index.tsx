import { Users, ShieldCheck, Clock, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; // Import useQuery
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { mockInstructors } from "@/shared/lib/mock-data";
import { DashboardStat, AdminInstructorView } from "@/features/dashboard-admin/types/admin.types";
import { getAdminStats } from "../services/admin.services"; // Import the service

export function AdminDashboardIndex() {
  
  // 1. Fetch Dynamic Stats from Node.js
  const { data: serverStats, isLoading: statsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: getAdminStats,
    // Optional: Refresh data every 5 minutes
    staleTime: 1000 * 60 * 5, 
  });

  // Filtering pending requests (This could also be fetched from API later)
  const pendingRequests = mockInstructors.filter(
    (instructor: any) => instructor.status === "pending"
  ) as unknown as AdminInstructorView[];

  // 2. Map labels to server data
  const stats: DashboardStat[] = [
    { 
      icon: Users, 
      label: "إجمالي المستخدمين", 
      // Using optional chaining and localizing the number
      value: serverStats?.totalUsers?.toLocaleString('ar-EG') || "٠", 
      color: "text-blue-600 bg-blue-50" 
    },
    { 
      icon: ShieldCheck, 
      label: "مدربون معتمدون", 
      value: serverStats?.verifiedInstructors?.toLocaleString('ar-EG') || "٠", 
      color: "text-green-600 bg-green-50" 
    },
    { 
      icon: Clock, 
      label: "طلبات معلقة", 
      // This is dynamic based on our filtered array
      value: pendingRequests.length.toLocaleString('ar-EG'), 
      color: "text-orange-600 bg-orange-50" 
    },
    { 
      icon: TrendingUp, 
      label: "حجوزات الأسبوع", 
      value: serverStats?.weeklyBookings?.toLocaleString('ar-EG') || "٠", 
      color: "text-purple-600 bg-purple-50" 
    },
  ];

  return (
    <div className="space-y-8 p-1" dir="rtl">
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-foreground tracking-tight">نظرة عامة</h1>
        <p className="text-sm font-bold text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-xl">
          {new Date().toLocaleDateString('ar-EG', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </p>
      </div>

      {/* Statistics Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={i} className={`rounded-3xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 ${statsLoading ? 'animate-pulse' : ''}`}>
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
            {/* Show skeleton loader if loading */}
            <div className="text-3xl font-black text-foreground">
              {statsLoading ? "..." : stat.value}
            </div>
            <div className="text-sm font-bold text-muted-foreground mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Pending Instructor Requests Section */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-foreground">طلبات الانضمام الجديدة</h2>
            <p className="text-sm font-bold text-muted-foreground mt-1">مراجعة بيانات المدربين الجدد للقبول أو الرفض في المنصة</p>
          </div>
          <Button asChild variant="outline" className="rounded-xl font-bold border-primary/20 hover:bg-primary/5 hover:text-primary transition-all">
            <Link to="/dashboard/admin/instructors">عرض الكل</Link>
          </Button>
        </div>

        {pendingRequests.length === 0 ? (
          <div className="py-12 text-center border-2 border-dashed border-muted rounded-3xl">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
               <ShieldCheck className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-sm font-bold text-muted-foreground">لا توجد طلبات انضمام معلقة حالياً</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingRequests.map((instructor) => (
              <div key={instructor.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-border bg-muted/30 p-5 hover:bg-muted/50 transition-colors">
                <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
                  <AvatarImage src={instructor.avatarUrl} />
                  <AvatarFallback className="font-bold bg-primary/10 text-primary">
                    {instructor.name?.[0]}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-[200px]">
                  <div className="font-black text-foreground text-lg">{instructor.name}</div>
                  <div className="text-sm font-bold text-muted-foreground mt-0.5">
                    {instructor.location} • {instructor.carModel}
                  </div>
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <Button size="sm" className="flex-1 sm:flex-none rounded-xl font-bold px-6 bg-green-600 hover:bg-green-700 shadow-sm transition-transform active:scale-95">
                    قبول
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 sm:flex-none rounded-xl font-bold px-6 text-red-600 border-red-200 hover:bg-red-50 transition-transform active:scale-95">
                    رفض
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}