import { motion } from "framer-motion";
import { Search, ArrowLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const Hero = () => {
  const tags = ["تعليم القيادة", "مدربين معتمدين"];

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center pt-32 pb-16 px-6 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/driving-lesson.jpg"
          alt="سيارة على الطريق"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
      </div>

      <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary/10 rounded-full blur-2xl -z-10" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-glow/5 rounded-full blur-2xl -z-10" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center w-full">
        
        {/* LEFT */}
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
            تعلم القيادة
            <br />
            <span className="text-gradient">بسهولة وأمان</span>
          </h1>

          <p className="text-lg text-muted-foreground mb-8 max-w-xl mr-auto">
            احجز دروس القيادة الخاصة بك بسهولة مع أفضل المدربين المعتمدين في مصر.
            ابدأ رحلتك نحو رخصة القيادة اليوم.
          </p>

          <div className="flex flex-wrap gap-3 justify-end mb-8">
            <Button size="lg" className="bg-gradient-primary text-primary-foreground hover:opacity-90 rounded-full shadow-md">
              ابدأ التعلم
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Button>

            <Button size="lg" variant="outline" className="rounded-full glass">
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
   
{/* RIGHT - MINIMAL IMAGE */}
<div className="relative flex justify-center items-center order-1 lg:order-2">

  {/* soft gradient تحت الصورة */}
  <div className="absolute bottom-0 w-64 h-40 bg-primary/10 blur-2xl rounded-full" />

  {/* image */}
  <img
    src="/driving-lesson.jpg"
    alt="car"
    className="relative w-[320px] md:w-[380px] object-contain drop-shadow-xl"
  />

  {/* small floating badge */}
  <div className="absolute top-6 right-10 glass px-3 py-1.5 rounded-full text-xs text-foreground shadow-sm">
    🚗 سهل وسريع
  </div>

</div>
      </div>
    </section>
  );
};

export default Hero;