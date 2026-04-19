import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  Star,
  Users,
} from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Button } from '@/shared/components/ui/button';
import { mockSessions, statusColor, statusLabel } from '@/shared/lib/mock-data';

export function InstructorDashboardIndex() {
  const status: 'pending' | 'approved' = 'approved';

  const pendingRequests = mockSessions.filter((s) => s.status === 'pending');
  const confirmedSessions = mockSessions.filter(
    (s) => s.status === 'confirmed'
  );

  return (
    <div className='space-y-6' dir='rtl'>
      <div>
        <h1 className='text-2xl font-bold text-foreground'>
          مرحباً، طه 👋
        </h1>
        <p className='font-medium text-muted-foreground'>
          نظرة عامة على نشاطك اليوم
        </p>
      </div>

      {(status as string) === 'pending' && (
        <div className='flex items-center gap-3 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-yellow-700'>
          <AlertCircle className='h-5 w-5' />
          <div className='flex-1'>
            <div className='font-bold'>حسابك قيد المراجعة</div>
            <div className='text-sm opacity-90'>
              سيتم تفعيل حسابك خلال 24-48 ساعة بعد مراجعة المستندات.
            </div>
          </div>
        </div>
      )}

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {[
          {
            icon: Calendar,
            label: 'حصص اليوم',
            value: confirmedSessions.length.toString(),
            color: 'text-primary bg-primary/10',
          },
          {
            icon: Users,
            label: 'إجمالي الطلاب',
            value: '320',
            color: 'text-blue-600 bg-blue-500/10',
          },
          {
            icon: Star,
            label: 'التقييم',
            value: '4.9',
            color: 'text-yellow-600 bg-yellow-500/10',
          },
          {
            icon: DollarSign,
            label: 'الأرباح هذا الشهر',
            value: '12,450 ج.م',
            color: 'text-green-600 bg-green-500/10',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className='rounded-2xl border border-border bg-card p-5 shadow-sm'
          >
            <div
              className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}
            >
              <stat.icon className='h-5 w-5' />
            </div>
            <div className='text-2xl font-black'>{stat.value}</div>
            <div className='text-sm font-medium text-muted-foreground'>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div className='grid gap-6 lg:grid-cols-2'>
        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
          <h2 className='mb-4 text-lg font-bold'>طلبات الحجز الجديدة</h2>
          <div className='space-y-3'>
            {pendingRequests.map((s) => (
              <div
                key={s.id}
                className='rounded-2xl border border-border bg-muted/20 p-4'
              >
                <div className='flex items-start justify-between gap-3'>
                  <div>
                    <div className='font-bold'>{s.studentName}</div>
                    <div className='mt-2 flex flex-wrap gap-3 text-xs font-medium text-muted-foreground'>
                      <span className='flex items-center gap-1'>
                        <Calendar className='h-3 w-3' /> {s.date}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Clock className='h-3 w-3' /> {s.time}
                      </span>
                    </div>
                  </div>
                  <Badge className='border-yellow-200 bg-yellow-500/10 font-bold text-yellow-600'>
                    جديد
                  </Badge>
                </div>
                <div className='mt-4 flex gap-2'>
                  <Button
                    size='sm'
                    className='flex-1 gap-1 rounded-lg font-bold'
                  >
                    <CheckCircle2 className='h-4 w-4' /> قبول
                  </Button>
                  <Button
                    size='sm'
                    variant='outline'
                    className='flex-1 rounded-lg border-destructive/20 font-bold text-destructive hover:bg-destructive/5'
                  >
                    رفض
                  </Button>
                </div>
              </div>
            ))}
            {pendingRequests.length === 0 && (
              <div className='rounded-2xl border border-dashed py-12 text-center text-sm font-medium text-muted-foreground'>
                لا توجد طلبات جديدة حالياً
              </div>
            )}
          </div>
        </div>

        <div className='rounded-3xl border border-border bg-card p-6 shadow-sm'>
          <h2 className='mb-4 text-lg font-bold'>حصص اليوم</h2>
          <div className='space-y-3'>
            {confirmedSessions.map((s) => (
              <div
                key={s.id}
                className='flex items-center justify-between rounded-2xl border border-border bg-muted/20 p-4'
              >
                <div>
                  <div className='font-bold'>{s.studentName}</div>
                  <div className='mt-1 flex gap-3 text-xs font-medium text-muted-foreground'>
                    <span>{s.time}</span>
                    <span className='opacity-50'>|</span>
                    <span>{s.location}</span>
                  </div>
                </div>
                <Badge
                  className={`rounded-lg border px-3 py-1 font-bold ${statusColor(
                    s.status
                  )}`}
                >
                  {statusLabel(s.status)}
                </Badge>
              </div>
            ))}
            {confirmedSessions.length === 0 && (
              <div className='rounded-2xl border border-dashed py-12 text-center text-sm font-medium text-muted-foreground'>
                لا توجد حصص مؤكدة لليوم
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}