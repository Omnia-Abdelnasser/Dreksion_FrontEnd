import { useLocation, Link } from 'react-router-dom';
import { Car, LayoutDashboard, Calendar, MessageCircle, TrendingUp, Star, User, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

interface SidebarProps {
  role?: "instructor" | "student" | "admin";
}

const instructor1 = "https://github.com/shadcn.png";

// Updated navItems to match your AppRoute paths exactly
const navItems = [
  { to: "/dashboard/instructor", label: "نظرة عامة", icon: LayoutDashboard },
  { to: "/dashboard/instructor/bookings", label: "طلبات الحجز", icon: Calendar },
  { to: "/dashboard/instructor/availability", label: "المواعيد", icon: Clock },
  { to: "/dashboard/instructor/students", label: "قائمة الطلاب", icon: TrendingUp },
  { to: "/dashboard/instructor/reviews", label: "التقييمات", icon: Star },
  { to: "/dashboard/instructor/profile", label: "الملف الشخصي", icon: User },
] as const;

export function DashboardSidebar({ role }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className="hidden w-64 flex-col border-l border-border bg-card lg:flex" dir="rtl">
      <Link to="/home" className="flex items-center gap-2 border-b border-border p-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Car className="h-5 w-5" />
        </div>
        <span className="text-xl font-black text-primary italic">دِركسيون</span>
      </Link>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          // Precise matching for active state
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                  : "text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
            >
              <item.icon className={`h-5 w-5 ${active ? "text-primary-foreground" : "text-muted-foreground"}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border p-4">
        <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-3">
          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
            <AvatarImage src={instructor1} />
            <AvatarFallback>طه</AvatarFallback>
          </Avatar>
          <div className="flex-1 overflow-hidden text-right">
            <p className="truncate text-sm font-bold text-foreground">طه محمد</p>
            <p className="truncate text-[10px] text-muted-foreground font-bold">
              {role === "instructor" ? "مدرب معتمد" : "مستخدم"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}