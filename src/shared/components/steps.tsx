import { motion } from "framer-motion";
import { User, Calendar, Flag } from "lucide-react";

const steps = [
  {
    icon: User,
    title: "اختر مدربك",
    desc: "تصفّح قائمة المدربين واختر الأنسب لك بناءً على التقييمات والمنطقة.",
  },
  {
    icon: Calendar,
    title: "احجز موعدك",
    desc: "حدّد الوقت المناسب لك من خلال جدول المواعيد المتاح للمدرب.",
  },
  {
    icon: Flag,
    title: "ابدأ التدريب",
    desc: "ابدأ رحلتك في تعلم القيادة بثقة وأمان مع متابعة كاملة لتقدمك.",
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-6 relative">
      <div className="max-w-6xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-4">
            خطوات بسيطة
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold mb-4">
            كيف تبدأ <span className="text-gradient">رحلتك؟</span>
          </h2>

          <p className="text-muted-foreground max-w-xl mx-auto mb-16">
            ثلاث خطوات فقط تفصلك عن تعلم القيادة باحتراف
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="glass rounded-3xl p-8 text-right border border-border/50 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 mr-auto transition group-hover:scale-105">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                {/* Number */}
                <div className="text-4xl font-extrabold text-primary/10 mb-2">
                  0{i + 1}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold mb-2">
                  {step.title}
                </h3>

                {/* Desc */}
                <p className="text-sm text-muted-foreground leading-relaxed">
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