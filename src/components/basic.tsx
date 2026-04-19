import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';

// import lessonImage from "@/assets/driving-lesson.jpg";

const features = [
   'شرح كامل لقواعد المرور',
   'تدريب عملي مع مدربين محترفين',
   'اختبارات وتقييم مستمر',
   'محتوى  عالي الجودة',
];

const Basics = () => {
   return (
      <section id='basics' className='px-6 py-24'>
         <div className='mx-auto max-w-6xl'>
            <div className='glass grid gap-0 overflow-hidden rounded-3xl md:grid-cols-2'>
               <motion.div
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className='flex flex-col justify-center p-10 text-right md:p-12'
               >
                  <span className='glass mb-4 inline-block self-end rounded-full px-4 py-1.5 text-xs font-semibold text-primary'>
                     محتوى تعليمي
                  </span>
                  <h2 className='mb-4 text-3xl font-extrabold md:text-4xl'>
                     تعرف على{' '}
                     <span className='text-gradient'>أساسيات السياقة</span>
                  </h2>
                  <p className='mb-8 leading-relaxed text-muted-foreground'>
                     نوفّر لك مكتبة متكاملة من الدروس لتعلم القيادة من الصفر حتى
                     الاحتراف، مع أفضل المدربين المعتمدين.
                  </p>

                  <ul className='mb-8 space-y-3'>
                     {features.map((f) => (
                        <li
                           key={f}
                           className='flex items-center justify-end gap-3 text-sm'
                        >
                           <span className='text-foreground'>{f}</span>
                           <CheckCircle2 className='h-5 w-5 shrink-0 text-primary' />
                        </li>
                     ))}
                  </ul>

                  <Button
                     size='lg'
                     className='bg-gradient-primary self-end rounded-full text-primary-foreground hover:opacity-90'
                  >
                     ابدأ التعلم الآن
                  </Button>
               </motion.div>

               <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className='relative min-h-[300px] md:min-h-full'
               >
                  <img
                     src='/driving-lesson.jpg'
                     alt='درس قيادة'
                     loading='lazy'
                     width={1024}
                     height={1024}
                     className='absolute inset-0 h-full w-full object-cover'
                  />
                  <div className='absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-transparent' />
               </motion.div>
            </div>
         </div>
      </section>
   );
};

export default Basics;
