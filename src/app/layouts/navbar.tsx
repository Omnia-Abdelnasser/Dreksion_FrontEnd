import { useState } from "react";
import { Menu, X, Car } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

const sections = [
  { id: "home", label: "الرئيسية" },
  { id: "how-it-works", label: "كيف تبدأ" },
  { id: "basics", label: "الدروس" },
  { id: "instructors", label: "المدربين" },
  { id: "contact", label: "تواصل معنا" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
const navigate = useNavigate();
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav className="glass max-w-7xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between ">
        <a href="#home" className="flex items-center gap-2 font-bold text-lg">
          <span className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center ">
            <Car className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="text-gradient">دركسيون</span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => scrollTo(e, s.id)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-lg transition-smooth",
                  active === s.id
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {s.label}
                {active === s.id && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-glow" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-2">
          <Button onClick={()=>navigate('/login')} variant="ghost" size="sm">تسجيل الدخول</Button>
          <Button onClick={()=>navigate('/register')} variant="default" size="sm" className="bg-gradient-primary text-primary-foreground hover:opacity-90 ">
            إنشاء حساب
          </Button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-lg glass"
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass max-w-7xl mx-auto rounded-2xl mt-2 p-4 animate-fade-in">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => scrollTo(e, s.id)}
              className={cn(
                "block py-3 px-4 rounded-lg text-sm font-medium transition-smooth",
                active === s.id ? "text-primary bg-secondary" : "text-muted-foreground"
              )}
            >
              {s.label}
            </a>
          ))}
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            <Button onClick={() => navigate('/login')} variant="ghost" size="sm" className="flex-1">تسجيل الدخول</Button>
            <Button onClick={() => navigate('/register')} size="sm" className="flex-1 bg-gradient-primary text-primary-foreground">إنشاء حساب</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;