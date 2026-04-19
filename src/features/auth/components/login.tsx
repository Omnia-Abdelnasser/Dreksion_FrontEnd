import { ArrowLeft, Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';

type LoginValues = { email: string; password: string };

const LoginForm = ({ onSwitch }: { onSwitch?: () => void }) => {
   const form = useForm<LoginValues>({
      defaultValues: { email: '', password: '' },
   });

   const onSubmit = (data: LoginValues) => {
      console.log(data);
   };

   return (
      <div className='grid min-h-screen lg:grid-cols-2' dir='rtl'>
         {/*  Image */}
         <div className='relative h-56 lg:h-auto'>
            <img
               src='/driving-lesson.jpg'
               alt='تعلم القيادة'
               className='h-full w-full object-cover'
            />
         </div>

         {/*  Form */}
         <div className='flex items-center justify-center bg-background px-6 py-10'>
            <div className='w-full max-w-md'>
               <div className='mb-8 text-right'>
                  <h2 className='text-3xl font-extrabold text-foreground'>
                     تسجيل الدخول
                  </h2>
                  <p className='mt-2 text-muted-foreground'>
                     مرحبًا بعودتك، سجّل الدخول إلى حسابك
                  </p>
               </div>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className='space-y-5'
                  >
                     {/* Email */}
                     <FormField
                        control={form.control}
                        name='email'
                        rules={{ required: 'البريد الإلكتروني مطلوب' }}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>البريد الإلكتروني</FormLabel>
                              <FormControl>
                                 <div className='relative'>
                                    <Mail className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70' />
                                    <Input
                                       dir='ltr'
                                       placeholder='name@email.com'
                                       {...field}
                                       className='h-12 pr-10'
                                    />
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* Password */}
                     <FormField
                        control={form.control}
                        name='password'
                        rules={{ required: 'كلمة المرور مطلوبة' }}
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>كلمة المرور</FormLabel>
                              <FormControl>
                                 <div className='relative'>
                                    <Lock className='absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary/70' />
                                    <Input
                                       type='password'
                                       placeholder='••••••••'
                                       {...field}
                                       className='h-12 pr-10'
                                    />
                                 </div>
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* Button */}
                     <Button
                        type='submit'
                        className='h-12 w-full rounded-xl bg-primary font-bold text-primary-foreground hover:bg-primary/90'
                     >
                        تسجيل الدخول
                        <ArrowLeft className='mr-2 h-4 w-4' />
                     </Button>

                     {/* Switch */}
                     <div className='text-center text-sm text-muted-foreground'>
                        ليس لديك حساب؟{' '}
                        <button
                           type='button'
                           onClick={onSwitch}
                           className='font-semibold text-primary hover:underline'
                        >
                           إنشاء حساب
                        </button>
                     </div>

                     {/* Forgot */}
                     <div className='text-center'>
                        <a
                           href='#'
                           className='text-sm text-muted-foreground transition hover:text-primary'
                        >
                           نسيت كلمة المرور؟
                        </a>
                     </div>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default LoginForm;
