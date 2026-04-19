import { motion } from 'framer-motion';
import { Calendar, Flag, User } from 'lucide-react';

const steps = [
   {
      icon: User,
      title: 'اختر مدربك',
      desc: 'تصفّح قائمة المدربين واختر الأنسب لك بناءً على التقييمات والمنطقة.',
   },
   {
      icon: Calendar,
      title: 'احجز موعدك',
      desc: 'حدّد الوقت المناسب لك من خلال جدول المواعيد المتاح للمدرب.',
   },
   {
      icon: Flag,
      title: 'ابدأ التدريب',
      desc: 'ابدأ رحلتك في تعلم القيادة بثقة وأمان مع متابعة كاملة لتقدمك.',
   },
];

const HowItWorks = () => {
   return (
      <section id='how-it-works' className='relative px-6 py-24'>
         <div className='mx-auto max-w-6xl text-center'>
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
               <span className='glass mb-4 inline-block rounded-full px-4 py-1.5 text-xs font-semibold text-primary'>
                  خطوات بسيطة
               </span>

               <h2 className='mb-4 text-3xl font-extrabold md:text-5xl'>
                  كيف تبدأ <span className='text-gradient'>رحلتك؟</span>
               </h2>

               <p className='mx-auto mb-16 max-w-xl text-muted-foreground'>
                  ثلاث خطوات فقط تفصلك عن تعلم القيادة باحتراف
               </p>
            </motion.div>

            <div className='grid gap-6 md:grid-cols-3'>
               {steps.map((step, i) => {
                  const Icon = step.icon;

                  return (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.12 }}
                        className='glass rounded-3xl border border-border/50 p-8 text-right transition-all duration-300 hover:-translate-y-1'
                     >
                        {/* Icon */}
                        <div className='mb-5 mr-auto flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 transition group-hover:scale-105'>
                           <Icon className='h-6 w-6 text-primary' />
                        </div>

                        {/* Number */}
                        <div className='mb-2 text-4xl font-extrabold text-primary/10'>
                           0{i + 1}
                        </div>

                        {/* Title */}
                        <h3 className='mb-2 text-lg font-bold'>{step.title}</h3>

                        {/* Desc */}
                        <p className='text-sm leading-relaxed text-muted-foreground'>
                           {step.desc}
                        </p>
                     </motion.div>
                  );
               })}
            </div>
         </div>
      </section>
   );
};

export default HowItWorks;
