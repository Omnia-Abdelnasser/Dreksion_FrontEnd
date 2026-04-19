import { useState } from 'react';

import { ArrowLeft, Lock, Phone } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

type RegisterValues = {
   first_name: string;
   last_name: string;
   phone: string;
   license_image: string;
   password: string;
   gender: 'male' | 'female' | '';
   location: string;
   role: 'trainee' | 'instructor';
   license_degree: string;
   owns_car: boolean;
   can_drive_manual: boolean;
   can_drive_automatic: boolean;
};

const RegisterForm = ({ onSwitch }: { onSwitch?: () => void }) => {
   const [loadingLocation, setLoadingLocation] = useState(false);

   const form = useForm<RegisterValues>({
      defaultValues: {
         first_name: '',
         last_name: '',
         phone: '',
         license_image: '',
         password: '',
         gender: '',
         location: '',
         role: 'trainee',
         license_degree: '',
         owns_car: false,
         can_drive_manual: false,
         can_drive_automatic: false,
      },
   });

   const handleGetLocation = () => {
      if (!navigator.geolocation) {
         toast.error('المتصفح لا يدعم تحديد الموقع');
         return;
      }

      setLoadingLocation(true);

      navigator.geolocation.getCurrentPosition(
         (pos) => {
            const loc = `${pos.coords.latitude.toFixed(
               4
            )}, ${pos.coords.longitude.toFixed(4)}`;

            form.setValue('location', loc);
            toast.success('تم تحديد الموقع');
            setLoadingLocation(false);
         },
         () => {
            toast.error('تعذر الوصول للموقع');
            setLoadingLocation(false);
         }
      );
   };

   const onSubmit = (data: RegisterValues) => {
      console.log(data);
      toast.success('تم إنشاء الحساب بنجاح');
   };

   return (
      <div className='grid min-h-screen lg:grid-cols-2' dir='rtl'>
         {/* 🖼️ IMAGE RIGHT */}
         <div className='relative order-1 h-56 lg:order-2 lg:h-auto'>
            <img
               src='/driving-lesson.jpg'
               alt='تعلم القيادة'
               className='h-full w-full object-cover'
            />

            <div className='absolute inset-0 bg-black/40' />

            <div className='absolute bottom-6 right-6 max-w-xs text-white lg:max-w-sm'>
               <h2 className='mb-2 text-2xl font-bold lg:text-3xl'>
                  ابدأ رحلتك اليوم 🚗
               </h2>
               <p className='text-xs text-white/80 lg:text-sm'>
                  تعلم القيادة مع أفضل المدربين في مصر
               </p>
            </div>
         </div>

         {/* 🧾 FORM LEFT */}
         <div className='order-2 flex items-center justify-center bg-background px-6 py-10 lg:order-1'>
            <div className='w-full max-w-md'>
               <div className='mb-6 text-right'>
                  <h2 className='text-3xl font-extrabold'>إنشاء حساب جديد</h2>
                  <p className='mt-2 text-muted-foreground'>
                     ابدأ رحلتك معنا اليوم
                  </p>
               </div>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className='space-y-4'
                  >
                     {/* First + Last */}
                     <div className='grid grid-cols-2 gap-3'>
                        <FormField
                           control={form.control}
                           name='first_name'
                           render={() => (
                              <FormItem>
                                 <FormLabel>الاسم الأول</FormLabel>
                                 <FormControl>
                                    <Input className='h-11' />
                                 </FormControl>
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name='last_name'
                           render={() => (
                              <FormItem>
                                 <FormLabel>الاسم الأخير</FormLabel>
                                 <FormControl>
                                    <Input className='h-11' />
                                 </FormControl>
                              </FormItem>
                           )}
                        />
                     </div>

                     {/* Phone */}
                     <FormField
                        control={form.control}
                        name='phone'
                        render={() => (
                           <FormItem>
                              <FormLabel>الهاتف</FormLabel>
                              <FormControl>
                                 <div className='relative'>
                                    <Phone className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2' />
                                    <Input dir='ltr' className='h-11 pr-10' />
                                 </div>
                              </FormControl>
                           </FormItem>
                        )}
                     />

                     {/* Password */}
                     <FormField
                        control={form.control}
                        name='password'
                        render={() => (
                           <FormItem>
                              <FormLabel>كلمة المرور</FormLabel>
                              <FormControl>
                                 <div className='relative'>
                                    <Lock className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2' />
                                    <Input
                                       type='password'
                                       className='h-11 pr-10'
                                    />
                                 </div>
                              </FormControl>
                           </FormItem>
                        )}
                     />

                     {/* Location */}
                     <FormField
                        control={form.control}
                        name='location'
                        render={() => (
                           <FormItem>
                              <FormLabel>الموقع</FormLabel>

                              <div className='flex gap-2'>
                                 <FormControl>
                                    <Input className='h-11' />
                                 </FormControl>

                                 <Button
                                    type='button'
                                    onClick={handleGetLocation}
                                    disabled={loadingLocation}
                                 >
                                    {loadingLocation ? '...' : '📍'}
                                 </Button>
                              </div>
                           </FormItem>
                        )}
                     />

                     {/* Submit */}
                     <Button type='submit' className='h-12 w-full'>
                        إنشاء الحساب
                        <ArrowLeft className='mr-2 h-4 w-4' />
                     </Button>

                     {/* Switch */}
                     <div className='text-center text-sm text-muted-foreground'>
                        لديك حساب؟{' '}
                        <button
                           type='button'
                           onClick={onSwitch}
                           className='font-semibold text-primary hover:underline'
                        >
                           تسجيل الدخول
                        </button>
                     </div>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default RegisterForm;
