import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

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

const ForgetPasswordForm = () => {
   const form = useForm({
      defaultValues: {
         email: '',
      },
   });

   const onSubmit = (data: any) => {
      console.log('Password reset request:', data);
      // TODO: handle API call for password reset
   };

   return (
      <div className='flex min-h-screen flex-row-reverse'>
         {/* image */}
         <div className='hidden w-1/2 md:block'>
            <img
               src='/auth_image2.jpeg'
               alt='forget-password'
               className='h-screen w-full object-cover'
            />
         </div>

         {/* form */}
         <div className='flex w-full items-center justify-center bg-gray-50 px-6 md:w-1/2'>
            <div className='w-full max-w-md rounded-2xl bg-white p-8 shadow-xl'>
               {/* title */}
               <h2 className='mb-2 text-center text-2xl font-bold text-blue-600'>
                  نسيت كلمة المرور
               </h2>

               <p className='mb-6 text-center text-sm text-gray-500'>
                  أدخل بريدك الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك
               </p>

               <Form {...form}>
                  <form
                     onSubmit={form.handleSubmit(onSubmit)}
                     className='space-y-5'
                  >
                     {/* Email */}
                     <FormField
                        control={form.control}
                        name='email'
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className='text-left text-gray-700'>
                                 البريد الإلكتروني
                              </FormLabel>
                              <FormControl>
                                 <Input
                                    dir='ltr'
                                    type='email'
                                    placeholder='example@email.com'
                                    {...field}
                                    className='text-gray-700'
                                 />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     {/* زر الإرسال */}
                     <Button
                        type='submit'
                        className='w-full rounded-xl bg-blue-600 py-6 text-white transition hover:bg-blue-700'
                     >
                        إرسال رابط إعادة التعيين
                     </Button>

                     <div className='flex flex-col gap-2'>
                        {/* رابط العودة لتسجيل الدخول */}
                        <p className='text-center text-sm text-gray-600'>
                           تذكّرت كلمة المرور؟{' '}
                           <Link
                              to='/'
                              className='font-medium text-blue-600 hover:underline'
                           >
                              العودة لتسجيل الدخول
                           </Link>
                        </p>
                     </div>
                  </form>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default ForgetPasswordForm;
