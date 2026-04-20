import { AlertCircle, Calendar, CheckCircle2, Clock, DollarSign, Star, Users, Loader2 } from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { toast } from 'sonner';
import { getInstructorDashboardData, updateBookingStatus } from '../services/instructor-services';

export function InstructorDashboardIndex() {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['instructor-dashboard'],
    queryFn: getInstructorDashboardData,
    retry: 1, // يحاول مرة واحدة كمان لو فشل
  });

  const { mutate: handleBooking } = useMutation({
    mutationFn: ({ id, status }: { id: string; status: 'confirmed' | 'cancelled' }) => 
      updateBookingStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-dashboard'] });
      toast.success("تم تحديث حالة الحجز");
    }
  });

  if (isLoading) return (
    <div className="flex h-screen items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-primary" />
    </div>
  );

  // تصحيح: التعامل مع حالة الخطأ أو البيانات الناقصة لمنع الـ White Screen
  if (isError || !data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 p-4 text-center">
        <AlertCircle className="h-12 w-12 text-destructive" />
        <h2 className="text-xl font-bold">عذراً، فشل في تحميل بيانات لوحة التحكم</h2>
        <p className="text-muted-foreground">تأكد من اتصالك بالسيرفر أو حاول مرة أخرى لاحقاً.</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['instructor-dashboard'] })}>إعادة المحاولة</Button>
      </div>
    );
  }

  // استخدام Safe Access للبيانات
  const stats = data?.stats || {
    todaySessionsCount: 0,
    totalStudents: 0,
    averageRating: 0,
    monthlyEarnings: 0,
    accountStatus: 'pending'
  };
  const pendingBookings = data?.pendingBookings || [];
  const todaySessions = data?.todaySessions || [];

  const statsConfig = [
    { icon: Calendar, label: 'حصص اليوم', value: stats.todaySessionsCount, color: 'text-primary bg-primary/10' },
    { icon: Users, label: 'إجمالي الطلاب', value: stats.totalStudents, color: 'text-blue-600 bg-blue-500/10' },
    { icon: Star, label: 'التقييم', value: stats.averageRating?.toFixed(1) || "0.0", color: 'text-yellow-600 bg-yellow-500/10' },
    { icon: DollarSign, label: 'الأرباح (الشهر)', value: `${stats.monthlyEarnings?.toLocaleString('ar-EG') || 0} ج.م`, color: 'text-green-600 bg-green-500/10' },
  ];

  return (
    <div className='space-y-6' dir='rtl'>
      <div>
        <h1 className='text-2xl font-bold text-foreground italic'>مرحباً بك مجدداً </h1>
        <p className='font-medium text-muted-foreground'>نظرة عامة على نشاطك اليوم</p>
      </div>

      {stats.accountStatus === 'pending' && (
        <div className='flex items-center gap-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-700 animate-pulse'>
          <AlertCircle className='h-5 w-5' />
          <div className='flex-1'>
            <div className='font-bold'>حسابك قيد المراجعة</div>
            <div className='text-sm opacity-90'>سيتم تفعيل حسابك بالكامل بعد مراجعة الإدارة للمستندات.</div>
          </div>
        </div>
      )}

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {statsConfig.map((stat, i) => (
          <div key={i} className='rounded-2xl border border-border bg-card p-5 shadow-sm'>
            <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
              <stat.icon className='h-5 w-5' />
            </div>
            <div className='text-2xl font-black'>{stat.value}</div>
            <div className='text-sm font-medium text-muted-foreground'>{stat.label}</div>
          </div>
        ))}
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
          <h2 className='mb-4 text-lg font-bold'>طلبات الحجز الجديدة</h2>
          <div className='space-y-3'>
            {pendingBookings.map((s: any) => (
              <div key={s.id} className='rounded-2xl border border-border bg-muted/20 p-4'>
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <div className='font-bold'>{s.studentName}</div>
                    <div className='mt-2 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground'>
                      <span className='flex items-center gap-1'><Calendar className='h-3 w-3' /> {s.date}</span>
                      <span className='flex items-center gap-1'><Clock className='h-3 w-3' /> {s.time}</span>
                    </div>
                  </div>
                  <Badge className='bg-orange-500/10 text-orange-600 border-orange-200'>جديد</Badge>
                </div>
                <div className='mt-4 flex gap-2'>
                  <Button size='sm' onClick={() => handleBooking({id: s.id, status: 'confirmed'})} className='flex-1 gap-1 rounded-lg font-bold'>
                    <CheckCircle2 className='h-4 w-4' /> قبول
                  </Button>
                  <Button size='sm' variant='outline' onClick={() => handleBooking({id: s.id, status: 'cancelled'})} className='flex-1 rounded-lg border-destructive/20 font-bold text-destructive hover:bg-destructive/5'>
                    رفض
                  </Button>
                </div>
              </div>
            ))}
            {pendingBookings.length === 0 && (
              <div className='rounded-2xl border border-dashed py-12 text-center text-sm font-medium text-muted-foreground'>لا توجد طلبات جديدة حالياً</div>
            )}
          </div>
        </div>

        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
          <h2 className='mb-4 text-lg font-bold'>حصص اليوم</h2>
          <div className='space-y-3'>
            {todaySessions.map((s: any) => (
              <div key={s.id} className='flex items-center justify-between rounded-2xl border border-border bg-muted/20 p-4'>
                <div>
                  <div className='font-bold'>{s.studentName}</div>
                  <div className='mt-1 flex gap-3 text-xs font-medium text-muted-foreground'>
                    <span>{s.time}</span>
                    <span className='opacity-50'>|</span>
                    <span>{s.location}</span>
                  </div>
                </div>
                <Badge className='rounded-lg border bg-green-500/10 text-green-600 border-green-200'>مؤكدة</Badge>
              </div>
            ))}
            {todaySessions.length === 0 && (
              <div className='rounded-2xl border border-dashed py-12 text-center text-sm font-medium text-muted-foreground'>لا توجد حصص لليوم</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}