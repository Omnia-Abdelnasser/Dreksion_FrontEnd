import { Link } from "react-router-dom"; // Based on your AppRoute.tsx usage
import { Calendar, Clock, MapPin, TrendingUp, Star, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Progress } from "@/shared/components/ui/progress";

// Clean Service Imports
import { getStudentDashboardData, getStudentBookings } from "../services/student-services";

/**
 * Helper to get badge styling based on status
 */
const getStatusStyles = (status: string) => {
  const map: Record<string, { label: string; className: string }> = {
    pending: { label: "قيد الانتظار", className: "border-yellow-200 bg-yellow-50 text-yellow-600" },
    confirmed: { label: "مؤكدة", className: "border-green-200 bg-green-50 text-green-600" },
    completed: { label: "مكتملة", className: "border-blue-200 bg-blue-50 text-blue-600" },
    cancelled: { label: "ملغاة", className: "border-red-200 bg-red-50 text-red-600" },
  };
  return map[status] || { label: status, className: "bg-muted" };
};

export function StudentDashboardIndex() {
  const { data: profile, isLoading: isProfileLoading } = useQuery({
    queryKey: ['student-dashboard-data'],
    queryFn: getStudentDashboardData,
  });

  const { data: bookings = [], isLoading: isBookingsLoading } = useQuery({
    queryKey: ['student-bookings-summary'],
    queryFn: getStudentBookings,
  });

  if (isProfileLoading || isBookingsLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="animate-spin h-10 w-10 text-primary" />
      </div>
    );
  }

  const stats = profile?.stats;
  const upcoming = bookings.filter(b => b.status === 'pending' || b.status === 'confirmed').slice(0, 3);

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header */}
      <div className="text-right">
        <h1 className="text-3xl font-black italic text-foreground tracking-tight">
          مرحباً، {profile?.firstName || 'يا بطل'} 
        </h1>
        <p className="font-bold text-muted-foreground italic">رحلتك نحو الاحتراف تبدأ من هنا.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Calendar, label: "الحصص القادمة", value: stats?.upcomingSessionsCount, color: "text-primary bg-primary/10" },
          { icon: Clock, label: "الحصص المكتملة", value: stats?.completedSessionsCount, color: "text-green-600 bg-green-500/10" },
          { icon: TrendingUp, label: "نسبة التقدم", value: `${stats?.progressPercentage}%`, color: "text-blue-600 bg-blue-500/10" },
          { icon: Star, label: "المستوى الحالي", value: stats?.currentLevel, color: "text-yellow-600 bg-yellow-500/10" },
        ].map((stat, i) => (
          <div key={i} className="rounded-3xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-all">
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-2xl ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-black italic">{stat.value || 0}</div>
            <div className="text-xs font-bold text-muted-foreground uppercase">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Sessions */}
        <div className="lg:col-span-2 rounded-[2rem] border border-border bg-card p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-black italic">أحدث الحصص</h2>
            <Button asChild variant="ghost" size="sm" className="font-bold text-primary">
              <Link to="sessions">عرض الكل</Link>
            </Button>
          </div>

          <div className="space-y-4">
            {upcoming.length > 0 ? (
              upcoming.map((s) => {
                const styles = getStatusStyles(s.status);
                return (
                  <div key={s.id} className="flex items-center justify-between rounded-2xl border border-border bg-muted/20 p-5 hover:bg-muted/30 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-primary flex flex-col items-center justify-center text-white font-black">
                        <span className="text-[10px] uppercase italic">{new Date(s.bookingDate).toLocaleDateString('ar-EG', {month: 'short'})}</span>
                        <span className="text-lg leading-none">{new Date(s.bookingDate).getDate()}</span>
                      </div>
                      <div>
                        <div className="font-black text-lg">{s.instructorName}</div>
                        <div className="flex items-center gap-3 text-xs font-bold text-muted-foreground mt-1">
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {s.startTime}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {s.meetingPoint}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`rounded-lg font-black ${styles.className}`}>{styles.label}</Badge>
                  </div>
                );
              })
            ) : (
              <div className="py-12 text-center border-2 border-dashed rounded-3xl text-muted-foreground font-bold italic">
                لا توجد حصص قادمة حالياً
              </div>
            )}
          </div>
        </div>

        {/* Level & Progress */}
        <div className="rounded-[2rem] border border-border bg-card p-6 shadow-sm flex flex-col">
          <h2 className="mb-6 text-xl font-black italic border-b pb-4">تقدمك التعليمي</h2>
          <div className="mb-6 text-center bg-primary/5 py-8 rounded-3xl border border-primary/10">
            <div className="text-6xl font-black text-primary">{stats?.progressPercentage}%</div>
            <p className="text-xs font-bold text-muted-foreground mt-2 italic">إجمالي المهارات المكتسبة</p>
          </div>
          <Progress value={stats?.progressPercentage} className="h-3 mb-6" />
          
          <div className="space-y-3 flex-1">
            {profile?.levels?.map((l) => {
              const completedCount = l.skills.filter(sk => sk.completed).length;
              return (
                <div key={l.id} className="flex items-center justify-between p-4 rounded-2xl bg-muted/30 font-bold text-sm">
                  <span>المستوى {l.id}: {l.name}</span>
                  <Badge variant="outline" className="bg-card font-black text-[10px]">
                    {completedCount}/{l.skills.length}
                  </Badge>
                </div>
              );
            })}
          </div>
          <Button asChild variant="outline" className="mt-6 w-full rounded-2xl font-black border-primary/20 text-primary">
            <Link to="progress">تفاصيل المنهج</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}