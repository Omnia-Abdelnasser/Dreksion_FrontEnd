import { CheckCircle2, X, Clock, Calendar, MapPin, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { toast } from "sonner";
import { getAllBookings, updateBookingStatus } from "../services/instructor-services";
import { Session } from "../types/instructor-types";

// Helper functions for UI mapping
const statusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'border-yellow-200 bg-yellow-50 text-yellow-600';
    case 'confirmed': return 'border-green-200 bg-green-50 text-green-600';
    case 'cancelled': return 'border-red-200 bg-red-50 text-red-600';
    case 'completed': return 'border-blue-200 bg-blue-50 text-blue-600';
    default: return 'border-gray-200 bg-gray-50 text-gray-600';
  }
};

const statusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'قيد الانتظار';
    case 'confirmed': return 'مؤكدة';
    case 'cancelled': return 'ملغاة';
    case 'completed': return 'مكتملة';
    default: return status;
  }
};

export function BookingsView() {
  const queryClient = useQueryClient();

  // 1. Fetch real bookings from Backend
  const { data: allSessions = [], isLoading } = useQuery<Session[]>({
    queryKey: ['instructor-all-bookings'],
    queryFn: getAllBookings,
  });

  // 2. Action Mutation (Approve/Reject)
  const { mutate: handleStatusChange, isPending: isUpdating } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'confirmed' | 'cancelled' }) => 
      updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-all-bookings'] });
      queryClient.invalidateQueries({ queryKey: ['instructor-dashboard'] });
      toast.success("Updated successfully");
    },
    onError: () => toast.error("Operation failed")
  });

  const pending = allSessions.filter((s) => s.status === "pending");

  if (isLoading) return (
    <div className="flex h-[400px] items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">طلبات الحجز</h1>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="bg-muted/50 p-1">
          <TabsTrigger value="pending" className="rounded-lg px-6 font-bold">
            قيد الانتظار ({pending.length})
          </TabsTrigger>
          <TabsTrigger value="all" className="rounded-lg px-6 font-bold">
            الكل ({allSessions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="mt-6 space-y-4">
          {pending.length > 0 ? (
            pending.map((s) => (
              <BookingCard 
                key={s.id} 
                s={s} 
                showActions 
                onAction={(status) => handleStatusChange({ id: s.id, status })} 
                isUpdating={isUpdating}
              />
            ))
          ) : (
            <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-3xl">
              لا توجد طلبات حجز معلقة حالياً
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="mt-6 space-y-4">
          {allSessions.length > 0 ? (
            allSessions.map((s) => <BookingCard key={s.id} s={s} />)
          ) : (
            <div className="py-20 text-center text-muted-foreground border-2 border-dashed rounded-3xl">
              سجل الحجوزات فارغ
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

/**
 * BookingCard Component
 */
interface BookingCardProps {
  s: Session;
  showActions?: boolean;
  onAction?: (status: 'confirmed' | 'cancelled') => void;
  isUpdating?: boolean;
}

function BookingCard({ s, showActions, onAction, isUpdating }: BookingCardProps) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-wrap items-center gap-4">
        <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
          <AvatarFallback className="bg-primary/10 text-primary font-bold">
            {s.studentName ? s.studentName[0] : "?"}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-[200px]">
          <div className="text-lg font-bold text-foreground">{s.studentName}</div>
          <div className="mt-2 flex flex-wrap gap-4 text-xs font-medium text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4 text-primary" /> {s.date}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" /> {s.time}
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" /> {s.location}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="text-lg font-black text-primary">{s.price} ج.م</div>
          <Badge 
            variant="outline" 
            className={`rounded-lg font-bold px-3 py-1 ${statusColor(s.status)}`}
          >
            {statusLabel(s.status)}
          </Badge>
        </div>
      </div>

      {showActions && onAction && (
        <div className="mt-5 flex gap-3 border-t border-border pt-5">
          <Button 
            disabled={isUpdating}
            onClick={() => onAction('confirmed')}
            size="sm" 
            className="flex-1 gap-2 rounded-xl font-bold py-5"
          >
            <CheckCircle2 className="h-4 w-4" /> قبول الطلب
          </Button>
          <Button 
            disabled={isUpdating}
            onClick={() => onAction('cancelled')}
            size="sm" 
            variant="outline" 
            className="flex-1 gap-2 rounded-xl font-bold py-5 text-destructive hover:bg-destructive/5 border-destructive/20"
          >
            <X className="h-4 w-4" /> رفض الطلب
          </Button>
        </div>
      )}
    </div>
  );
}