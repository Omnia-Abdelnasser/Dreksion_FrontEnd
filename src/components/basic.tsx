import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
// import lessonImage from "@/assets/driving-lesson.jpg";

const features = [
  "شرح كامل لقواعد المرور",
  "تدريب عملي مع مدربين محترفين",
  "اختبارات وتقييم مستمر",
  "محتوى  عالي الجودة",
];

const Basics = () => {
  return (
    <section id="basics" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="glass rounded-3xl overflow-hidden grid md:grid-cols-2 gap-0 ">
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 md:p-12 text-right flex flex-col justify-center"
          >
            <span className="inline-block self-end glass px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4">
              محتوى تعليمي
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              تعرف على <span className="text-gradient">أساسيات السياقة</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              نوفّر لك مكتبة متكاملة من الدروس لتعلم القيادة من الصفر حتى الاحتراف،
              مع أفضل المدربين المعتمدين.
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-center justify-end gap-3 text-sm">
                  <span className="text-foreground">{f}</span>
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                </li>
              ))}
            </ul>

            <Button size="lg" className="self-end bg-gradient-primary text-primary-foreground hover:opacity-90  rounded-full">
              ابدأ التعلم الآن
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative min-h-[300px] md:min-h-full"
          >
            <img
              src="/driving-lesson.jpg"
              alt="درس قيادة"
              loading="lazy"
              width={1024}
              height={1024}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-background/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Basics;