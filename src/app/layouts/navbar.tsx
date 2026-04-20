import { useState } from "react";
import { Menu, X, Car, LayoutDashboard, LogOut, User, ChevronDown } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

/**
 * Custom Hook to simulate Auth Context
 */
const useAuth = () => {
  const isLoggedIn = true; 
  const user = { 
    name: "طه محمد", 
    role: "student", 
    avatar: "" 
  };
  return { isLoggedIn, user };
};

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Smart Navigation: Handles smooth scroll on Home, or Redirects then scrolls
   */
  const handleNavClick = (e: React.MouseEvent, id: string, path?: string) => {
    e.preventDefault();
    setActive(id);
    
    // If it's a direct page link (like Instructors)
    if (path) {
      navigate(path);
      setOpen(false);
      return;
    }

    // If it's a scroll section
    const element = document.getElementById(id);
    if (element && location.pathname === '/') {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
      // Fallback for cross-page scroll
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
    setOpen(false);
  };

  const dashboardPath = `/dashboard/${user?.role}`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4" dir="rtl">
      <nav className="glass max-w-7xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center">
            <Car className="w-5 h-5 text-primary-foreground" />
          </span>
          <span className="text-gradient">دركسيون</span>
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1">
          <li>
            <a href="#home" onClick={(e) => handleNavClick(e, "home")} 
               className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-all", active === "home" ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
              الرئيسية
            </a>
          </li>
          <li>
            {/* Link to actual Instructors page instead of a section */}
            <Link to="/instructors" onClick={() => setActive("instructors")}
               className={cn("px-4 py-2 text-sm font-medium rounded-lg transition-all", active === "instructors" ? "text-primary" : "text-muted-foreground hover:text-foreground")}>
              المدربين
            </Link>
          </li>
          
          {isLoggedIn && (
            <li>
              <Link to={dashboardPath} className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-all italic">
                لوحة التحكم
              </Link>
            </li>
          )}
        </ul>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-2">
          {!isLoggedIn ? (
            <>
              <Button onClick={() => navigate('/login')} variant="ghost" size="sm" className="font-bold">تسجيل الدخول</Button>
              <Button onClick={() => navigate('/register')} size="sm" className="bg-gradient-primary text-primary-foreground font-bold rounded-xl px-5">
                إنشاء حساب
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 outline-none glass-border p-1.5 pr-4 rounded-xl hover:bg-white/5 transition-all">
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  <div className="text-right">
                    <p className="text-[10px] font-black italic leading-none text-foreground">{user?.name}</p>
                    <p className="text-[9px] text-primary font-bold uppercase mt-1">
                      {user?.role === 'instructor' ? 'مدرب محترف' : 'متدرب نشط'}
                    </p>
                  </div>
                  <Avatar className="h-9 w-9 border border-primary/20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-primary/10 text-primary font-bold text-xs italic">
                      {user?.name?.[0]}
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 rounded-xl mt-2 p-2 glass" >
                <DropdownMenuItem onClick={() => navigate(dashboardPath)} className="rounded-lg py-3 cursor-pointer focus:bg-primary/10">
                  <LayoutDashboard className="ml-3 w-4 h-4 text-primary" />
                  <span className="font-bold">لوحة التحكم</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`${dashboardPath}/profile`)} className="rounded-lg py-3 cursor-pointer focus:bg-primary/10">
                  <User className="ml-3 w-4 h-4 text-primary" />
                  <span className="font-bold">الملف الشخصي</span>
                </DropdownMenuItem>
                <div className="h-px bg-border my-1 opacity-20" />
                <DropdownMenuItem onClick={() => navigate('/login')} className="rounded-lg py-3 cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
                  <LogOut className="ml-3 w-4 h-4" />
                  <span className="font-black">تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg glass" aria-label="Toggle menu">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="md:hidden glass max-w-7xl mx-auto rounded-2xl mt-2 p-4 animate-fade-in text-right shadow-2xl">
          <a href="#home" onClick={(e) => handleNavClick(e, "home")} className={cn("block py-3 px-4 rounded-lg text-sm font-bold", active === "home" ? "text-primary bg-primary/5" : "text-muted-foreground")}>الرئيسية</a>
          <Link to="/instructors" onClick={() => {setOpen(false); setActive("instructors")}} className={cn("block py-3 px-4 rounded-lg text-sm font-bold", active === "instructors" ? "text-primary bg-primary/5" : "text-muted-foreground")}>المدربين</Link>
          <a href="#contact" onClick={(e) => handleNavClick(e, "contact")} className={cn("block py-3 px-4 rounded-lg text-sm font-bold", active === "contact" ? "text-primary bg-primary/5" : "text-muted-foreground")}>تواصل معنا</a>
          
          <div className="flex gap-2 mt-3 pt-3 border-t border-border/20">
            {!isLoggedIn ? (
              <>
                <Button onClick={() => navigate('/login')} variant="ghost" size="sm" className="flex-1 font-bold">دخول</Button>
                <Button onClick={() => navigate('/register')} size="sm" className="flex-1 bg-gradient-primary text-primary-foreground font-bold">تسجيل</Button>
              </>
            ) : (
              <Button onClick={() => navigate(dashboardPath)} size="sm" className="flex-1 bg-gradient-primary text-primary-foreground font-bold italic">لوحة التحكم</Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;