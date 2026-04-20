import { useState } from 'react';

import { ArrowLeft, Calendar, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { mockInstructors } from '@/shared/lib/mock-data';

const times = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

export default function BookingPage() {
   const { id } = useParams();
   const navigate = useNavigate();

   const instructor = mockInstructors.find((i) => i.id === id);

   const [date, setDate] = useState('');
   const [time, setTime] = useState('');
   const [location, setLocation] = useState('');
   const [confirmed, setConfirmed] = useState(false);

   if (!instructor) {
      return (
         <div className='flex h-screen flex-col items-center justify-center gap-4'>
            <h1 className='font-sans text-2xl font-bold'>
               Instructor not found
            </h1>
            <Button onClick={() => navigate('/instructors')}>
               Back to List
            </Button>
         </div>
      );
   }

   const handleConfirm = () => {
      if (!date || !time || !location) {
         toast.error('Please fill all fields');
         return;
      }
      setConfirmed(true);
      toast.success('Booking request sent successfully');
   };

   if (confirmed) {
      return (
         <div className='flex min-h-screen flex-col' dir='rtl'>
            <div className='container mx-auto flex max-w-2xl flex-1 items-center px-4 py-12'>
               <div className='w-full rounded-3xl border border-border bg-card p-10 text-center shadow-lg'>
                  <div className='mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-500/10 text-green-600'>
                     <CheckCircle2 className='h-10 w-10' />
                  </div>
                  <h1 className='text-3xl font-black text-foreground'>
                     تم تأكيد حجزك بنجاح!
                  </h1>
                  <p className='mt-3 font-medium text-muted-foreground'>
                     سنرسل لك تأكيداً بالبريد الإلكتروني وستتلقى رسالة من المدرب
                     قريباً.
                  </p>

                  <div className='mx-auto mt-8 max-w-sm rounded-2xl border border-border/50 bg-muted/50 p-6 text-right'>
                     <div className='space-y-3 text-sm font-bold'>
                        <div className='flex justify-between border-b border-border/50 pb-2'>
                           <span className='text-muted-foreground'>
                              المدرب:
                           </span>
                           <span className='text-foreground'>
                              {instructor.name}
                           </span>
                        </div>
                        <div className='flex justify-between border-b border-border/50 pb-2'>
                           <span className='text-muted-foreground'>
                              التاريخ والوقت:
                           </span>
                           <span className='text-foreground'>
                              {date} الساعة {time}
                           </span>
                        </div>
                        <div className='flex justify-between border-b border-border/50 pb-2'>
                           <span className='text-muted-foreground'>
                              المكان:
                           </span>
                           <span className='text-foreground'>{location}</span>
                        </div>
                        <div className='flex justify-between pt-2 text-base text-primary'>
                           <span>الإجمالي:</span>
                           <span>{instructor.hourlyRate} ج.م</span>
                        </div>
                     </div>
                  </div>

                  <div className='mt-8 flex justify-center gap-4 font-bold'>
                     <Button asChild className='rounded-xl px-8'>
                        <Link to='/dashboard/instructor'>لوحة التحكم</Link>
                     </Button>
                     <Button
                        asChild
                        variant='outline'
                        className='rounded-xl px-8'
                     >
                        <Link to='/instructors'>حجز جديد</Link>
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className='flex min-h-screen flex-col' dir='rtl'>
         <div className='container mx-auto max-w-4xl px-4 py-12'>
            <Button
               variant='ghost'
               size='sm'
               onClick={() => navigate(-1)}
               className='mb-6 gap-2 font-bold hover:bg-primary/10 hover:text-primary'
            >
               <ArrowLeft className='h-4 w-4' /> رجوع للمدرب
            </Button>

            <h1 className='mb-8 text-3xl font-black tracking-tight text-foreground'>
               حجز حصة قيادة
            </h1>

            <div className='grid gap-8 md:grid-cols-[1fr_350px]'>
               <div className='space-y-8 rounded-3xl border border-border bg-card p-8 shadow-sm'>
                  <div className='space-y-4'>
                     <Label className='flex items-center gap-2 text-base font-bold text-foreground'>
                        <Calendar className='h-5 w-5 text-primary' /> اختر
                        التاريخ
                     </Label>
                     <Input
                        type='date'
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className='h-12 rounded-xl border-border bg-muted/20 font-bold focus:bg-card'
                     />
                  </div>

                  <div className='space-y-4'>
                     <Label className='flex items-center gap-2 text-base font-bold text-foreground'>
                        <Clock className='h-5 w-5 text-primary' /> اختر الوقت
                     </Label>
                     <div className='grid grid-cols-3 gap-3 sm:grid-cols-4'>
                        {times.map((t) => (
                           <button
                              key={t}
                              type='button'
                              onClick={() => setTime(t)}
                              className={`rounded-xl border py-3 text-sm font-bold transition-all ${
                                 time === t
                                    ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/20'
                                    : 'border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground'
                              }`}
                           >
                              {t}
                           </button>
                        ))}
                     </div>
                  </div>

                  <div className='space-y-4'>
                     <Label className='flex items-center gap-2 text-base font-bold text-foreground'>
                        <MapPin className='h-5 w-5 text-primary' /> مكان اللقاء
                     </Label>
                     <Input
                        placeholder='مثال: مدينة 6 أكتوبر - المحور'
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className='h-12 rounded-xl border-border bg-muted/20 text-right font-bold focus:bg-card'
                     />
                  </div>
               </div>

               <div className='h-fit space-y-6 rounded-3xl border border-border bg-card p-6 shadow-sm'>
                  <div className='flex items-center gap-4 border-b border-border pb-5'>
                     <Avatar className='h-14 w-14 border-2 border-background shadow-sm'>
                        <AvatarImage src={instructor.avatarUrl} />
                        <AvatarFallback className='font-bold'>
                           {instructor.name[0]}
                        </AvatarFallback>
                     </Avatar>
                     <div className='text-right'>
                        <div className='font-black text-foreground'>
                           {instructor.name}
                        </div>
                        <div className='text-xs font-bold text-muted-foreground'>
                           {instructor.carModel}
                        </div>
                     </div>
                  </div>

                  <div className='space-y-3 py-2 text-sm font-bold'>
                     <div className='flex justify-between text-muted-foreground'>
                        <span>سعر الحصة</span>
                        <span>{instructor.hourlyRate} ج.م</span>
                     </div>
                     <div className='flex justify-between text-muted-foreground'>
                        <span>المدة</span>
                        <span>60 دقيقة</span>
                     </div>
                     <div className='flex justify-between border-t border-border pt-4 text-lg'>
                        <span className='font-black text-foreground'>
                           الإجمالي
                        </span>
                        <span className='font-black text-primary'>
                           {instructor.hourlyRate} ج.م
                        </span>
                     </div>
                  </div>

                  <Button
                     onClick={handleConfirm}
                     className='h-12 w-full rounded-2xl text-base font-black shadow-lg shadow-primary/20'
                     size='lg'
                  >
                     تأكيد الحجز الآن
                  </Button>
               </div>
            </div>
         </div>
      </div>
   );
}
