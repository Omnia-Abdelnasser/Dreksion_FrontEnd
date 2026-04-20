import { Clock, MapPin, User, Loader2, CalendarX } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/shared/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";

// Internal feature imports
import { getStudentBookings } from "../services/student-services";
import { StudentBooking } from "../types/student-types";

/**
 * Helper to determine badge styling based on session status
 */
const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'border-yellow-200 bg-yellow-50 text-yellow-600';
    case 'confirmed': return 'border-green-200 bg-green-50 text-green-600';
    case 'completed': return 'border-blue-200 bg-blue-50 text-blue-600';
    case 'cancelled': return 'border-red-200 bg-red-50 text-red-600';
    default: return 'border-border bg-muted text-muted-foreground';
  }
};

/**
 * Helper to translate status keys to Arabic UI labels
 */
const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'قيد الانتظار';
    case 'confirmed': return 'مؤكدة';
    case 'completed': return 'مكتملة';
    case 'cancelled': return 'ملغاة';
    default: return status;
  }
};

/**
 * Main Sessions Page Component
 */
export function SessionsPage() {
  // Fetch all student bookings using TanStack Query
  const { data: bookings = [], isLoading } = useQuery<StudentBooking[]>({
    queryKey: ['student-bookings-all'],
    queryFn: () => getStudentBookings(),
  });

  // Global loading state
  if (isLoading) return (
    <div className="flex h-[400px] items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-primary" />
    </div>
  );

  // Categorize sessions into upcoming and past
  const upcoming = bookings.filter((s) => s.status === "pending" || s.status === "confirmed");
  const past = bookings.filter((s) => s.status === "completed" || s.status === "cancelled");

  return (
    <div className="space-y-6" dir="rtl">
      {/* Page Header - Arabic Content */}
      <div className="flex flex-col gap-1 text-right">
        <h1 className="text-3xl font-black italic tracking-tight text-foreground uppercase">جلساتي التدريبية</h1>
        <p className="font-bold text-muted-foreground italic">تابع مواعيدك وتقدمك مع مدربي دِركسيون</p>
      </div>

      {/* Navigation Tabs - Arabic Content */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="bg-muted/50 p-1 rounded-xl w-full sm:w-auto flex justify-start">
          <TabsTrigger value="upcoming" className="rounded-lg px-8 font-black transition-all data-[state=active]:bg-primary data-[state=active]:text-white">
            الجلسات القادمة ({upcoming.length})
          </TabsTrigger>
          <TabsTrigger value="past" className="rounded-lg px-8 font-black transition-all data-[state=active]:bg-primary data-[state=active]:text-white">
            سجل الحصص ({past.length})
          </TabsTrigger>
        </TabsList>

        {/* Upcoming Content */}
        <TabsContent value="upcoming" className="mt-6 space-y-4 outline-none">
          {upcoming.length > 0 ? (
            upcoming.map((s) => <SessionCard key={s.id} s={s} />)
          ) : (
            <EmptyState message="لا توجد حصص قادمة مجدولة حالياً" />
          )}
        </TabsContent>

        {/* Past Content */}
        <TabsContent value="past" className="mt-6 space-y-4 outline-none">
          {past.length > 0 ? (
            past.map((s) => <SessionCard key={s.id} s={s} />)
          ) : (
            <EmptyState message="سجل الحصص الخاص بك فارغ حالياً" />
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * Individual Session Card Component
 */
function SessionCard({ s }: { s: StudentBooking }) {
  const dateObj = new Date(s.bookingDate);
  
  return (
    <div className="group flex flex-wrap items-center gap-4 rounded-[1.5rem] border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 active:scale-[0.98]">
      
      {/* Date Indicator Icon */}
      <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/30 group-hover:rotate-3 transition-transform">
        <span className="text-2xl font-black leading-none">{dateObj.getDate()}</span>
        <span className="text-[10px] font-bold uppercase mt-1">
          {dateObj.toLocaleDateString('ar-EG', { month: 'short' })}
        </span>
      </div>

      {/* Session Details - Arabic Content */}
      <div className="flex-1 min-w-[200px]">
        <div className="flex items-center gap-2 font-black text-xl text-foreground italic">
          <User className="h-5 w-5 text-primary" /> 
          {s.instructorName || "مدرب دِركسيون"}
        </div>
        
        <div className="mt-2 flex flex-wrap gap-3 font-bold text-muted-foreground">
          <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-lg text-xs">
            <Clock className="h-4 w-4 text-primary" /> {s.startTime}
          </div>
          <div className="flex items-center gap-1.5 bg-muted/50 px-3 py-1 rounded-lg text-xs">
            <MapPin className="h-4 w-4 text-primary" /> {s.meetingPoint || "يتم تحديده لاحقاً"}
          </div>
        </div>
      </div>

      {/* Dynamic Status Badge */}
      <div className="flex items-center gap-4 mr-auto">
        <Badge className={`rounded-xl px-5 py-2 font-black border-2 transition-colors ${getStatusColor(s.status)}`}>
          {getStatusLabel(s.status)}
        </Badge>
      </div>
    </div>
  );
}

/**
 * Reusable Empty State UI
 */
function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-20 text-center border-2 border-dashed rounded-[2.5rem] bg-muted/5 flex flex-col items-center justify-center gap-4">
      <div className="bg-muted p-4 rounded-full">
        <CalendarX className="h-12 w-12 text-muted-foreground/40" />
      </div>
      <p className="font-black text-muted-foreground text-lg italic">{message}</p>
    </div>
  );
}