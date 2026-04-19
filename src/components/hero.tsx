import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

const Hero = () => {
   const tags = ['تعليم القيادة', 'مدربين معتمدين'];

   return (
      <section
         id='home'
         className='relative flex min-h-screen w-full items-center overflow-hidden px-6 pb-16 pt-32'
      >
         {/* Background */}
         <div className='absolute inset-0 -z-10'>
            <img
               src='/driving-lesson.jpg'
               alt='سيارة على الطريق'
               className='h-full w-full object-cover'
            />
            <div
               className='absolute inset-0'
               style={{ background: 'var(--gradient-hero)' }}
            />
            <div
               className='absolute inset-0'
               style={{ background: 'var(--gradient-overlay)' }}
            />
         </div>

         {/* 🔥 أخف glow */}
         <div className='absolute right-0 top-1/4 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-2xl' />
         <div className='bg-primary-glow/5 absolute bottom-0 left-0 -z-10 h-72 w-72 rounded-full blur-2xl' />

         <div className='relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2'>
            {/* LEFT */}
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.7 }}
               className='order-2 text-right lg:order-1'
            >
               <span className='glass mb-6 inline-block rounded-full px-4 py-1.5 text-xs font-semibold text-primary'>
                  🚗 المنصة الأولى لتعليم القيادة في مصر
               </span>

               <h1 className='mb-6 text-4xl font-extrabold leading-tight md:text-6xl'>
                  تعلم القيادة
                  <br />
                  <span className='text-gradient'>بسهولة وأمان</span>
               </h1>

               <p className='mb-8 mr-auto max-w-xl text-lg text-muted-foreground'>
                  احجز دروس القيادة الخاصة بك بسهولة مع أفضل المدربين المعتمدين
                  في مصر. ابدأ رحلتك نحو رخصة القيادة اليوم.
               </p>

               <div className='mb-8 flex flex-wrap justify-end gap-3'>
                  <Button
                     size='lg'
                     className='bg-gradient-primary rounded-full text-primary-foreground shadow-md hover:opacity-90'
                  >
                     ابدأ التعلم
                     <ArrowLeft className='mr-2 h-4 w-4' />
                  </Button>

                  <Button
                     size='lg'
                     variant='outline'
                     className='glass rounded-full'
                  >
                     انضم كمدرب
                  </Button>
               </div>

               {/* <div className="flex flex-wrap gap-2 justify-end">
            {tags.map((t) => (
              <span key={t} className="glass px-4 py-1.5 rounded-full text-xs font-medium text-foreground">
                {t}
              </span>
            ))}
          </div> */}

               {/* Search */}
               {/* <div className="mt-10 glass rounded-full p-2 flex items-center gap-2 max-w-md mr-auto shadow-sm">
            <input
              type="text"
              placeholder="ابحث عن مدرب قريب منك..."
              className="bg-transparent outline-none text-sm flex-1 px-4 text-foreground placeholder:text-muted-foreground"
            />
            <Button size="icon" className="bg-gradient-primary text-primary-foreground rounded-full">
              <Search className="w-4 h-4" />
            </Button>
          </div> */}
            </motion.div>

            {/* RIGHT */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.7, delay: 0.2 }}
               className='relative order-1 lg:order-2'
            >
               {/* 🔥 أخف بكتيييير */}
               <div className='bg-gradient-primary absolute -inset-3 rounded-3xl opacity-10 blur-xl' />

               <div className='relative grid grid-cols-2 gap-4'>
                  <div className='glass rounded-2xl p-6 shadow-md'>
                     <div className='text-gradient text-3xl font-extrabold'>
                        +500
                     </div>
                     <div className='mt-1 text-sm text-muted-foreground'>
                        مدرب معتمد
                     </div>
                  </div>

                  <div className='glass mt-8 rounded-2xl p-6 shadow-md'>
                     <div className='text-gradient text-3xl font-extrabold'>
                        +10K
                     </div>
                     <div className='mt-1 text-sm text-muted-foreground'>
                        طالب نجح
                     </div>
                  </div>

                  <div className='glass -mt-4 rounded-2xl p-6 shadow-md'>
                     <div className='text-gradient text-3xl font-extrabold'>
                        4.9★
                     </div>
                     <div className='mt-1 text-sm text-muted-foreground'>
                        تقييم المنصة
                     </div>
                  </div>

                  <div className='glass mt-4 rounded-2xl p-6 shadow-md'>
                     <div className='text-gradient text-3xl font-extrabold'>
                        24/7
                     </div>
                     <div className='mt-1 text-sm text-muted-foreground'>
                        دعم متواصل
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>
   );
};

export default Hero;
