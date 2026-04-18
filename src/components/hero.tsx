import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";


const Hero = () => {

  const tags = [
    "تعليم القيادة",
    "مدربين معتمدين",
  ]
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center pt-32 pb-16 px-6 overflow-hidden"
    >
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/driving-lesson.jpg"
          alt="سيارة على الطريق"
          width={1280}
          height={832}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
      </div>

      {/* Glow accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl -z-10" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-right order-2 lg:order-1"
        >
          <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-semibold text-primary mb-6">
            🚗 المنصة الأولى لتعليم القيادة في مصر
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            تعلم السياقة
            <br />
            <span className="text-gradient">بسهولة وأمان</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mr-auto">
            احجز دروس القيادة الخاصة بك بسهولة مع أفضل المدربين المعتمدين في مصر.
            ابدأ رحلتك نحو رخصة القيادة اليوم.
          </p>

          <div className="flex flex-wrap gap-3 justify-end mb-8">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 shadow-glow rounded-full">
              ابدأ التعلم
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full glass">
              انضم كمدرب
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 justify-end">
            {tags.map((t) => (
              <span key={t} className="glass px-4 py-1.5 rounded-full text-xs font-medium text-foreground">
                {t}
              </span>
            ))}
          </div>

          {/* Search bar */}
          <div className="mt-10 glass rounded-full p-2 flex items-center gap-2 max-w-md mr-auto">
            <input
              type="text"
              placeholder="ابحث عن مدرب قريب منك..."
              className="bg-transparent outline-none text-sm flex-1 px-4 text-foreground placeholder:text-muted-foreground"
            />
            <Button size="icon" className="bg-gradient-primary text-primary-foreground rounded-full shrink-0">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative order-1 lg:order-2"
        >
          <div className="absolute -inset-4 bg-gradient-primary opacity-30 blur-2xl rounded-3xl" />
          <div className="relative grid grid-cols-2 gap-4">
            <div className="glass rounded-2xl p-6 shadow-elegant">
              <div className="text-3xl font-extrabold text-gradient">+500</div>
              <div className="text-sm text-muted-foreground mt-1">مدرب معتمد</div>
            </div>
            <div className="glass rounded-2xl p-6 shadow-elegant mt-8">
              <div className="text-3xl font-extrabold text-gradient">+10K</div>
              <div className="text-sm text-muted-foreground mt-1">طالب نجح</div>
            </div>
            <div className="glass rounded-2xl p-6 shadow-elegant -mt-4">
              <div className="text-3xl font-extrabold text-gradient">4.9★</div>
              <div className="text-sm text-muted-foreground mt-1">تقييم المنصة</div>
            </div>
            <div className="glass rounded-2xl p-6 shadow-elegant mt-4">
              <div className="text-3xl font-extrabold text-gradient">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">دعم متواصل</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
