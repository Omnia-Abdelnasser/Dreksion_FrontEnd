import { motion } from "framer-motion";
import { User, Calendar, Flag } from "lucide-react";

const steps = [
  { icon: User, title: "اختر مدربك", desc: "تصفّح قائمة المدربين واختر الأنسب لك بناءً على التقييمات والمنطقة." },
  { icon: Calendar, title: "احجز موعدك", desc: "حدّد الوقت المناسب لك من خلال جدول المواعيد المتاح للمدرب." },
  { icon: Flag, title: "ابدأ التدريب", desc: "ابدأ رحلتك في تعلم القيادة بثقة وأمان مع متابعة كاملة لتقدمك." },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 px-6 relative">
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

        <div className="grid md:grid-cols-3 gap-6 relative">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-3xl p-8 text-right hover:shadow-glow transition-smooth group"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-6 mr-auto shadow-glow group-hover:scale-110 transition-smooth">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div className="text-5xl font-extrabold text-primary/20 mb-2">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
