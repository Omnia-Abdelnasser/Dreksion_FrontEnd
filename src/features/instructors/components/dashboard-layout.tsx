import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { 
  Car, LayoutDashboard, Calendar, MessageCircle, 
  TrendingUp, Star, User, Bell, Search 
} from "lucide-react";
import { Input } from "@/shared/components/ui/input"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
// import instructor1 from "@/assets/instructor-1.jpg";

const navItems = [
  { to: "/dashboard", label: "نظرة عامة", icon: LayoutDashboard },
  { to: "/dashboard/sessions", label: "الجلسات", icon: Calendar },
  { to: "/dashboard/progress", label: "التقدم", icon: TrendingUp },
  { to: "/dashboard/chat", label: "المحادثات", icon: MessageCircle },
  { to: "/dashboard/ratings", label: "التقييمات", icon: Star },
  { to: "/dashboard/profile", label: "الملف الشخصي", icon: User },
] as const;

export function DashboardLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background text-foreground" dir="rtl">
      <aside className="hidden w-[260px] flex-col border-l border-border bg-card lg:flex">
        <Link to="/" className="flex items-center gap-2 border-b border-border p-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-primary/20 shadow-lg">
            <Car className="h-6 w-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">سواقة</span>
        </Link>

        <nav className="flex-1 space-y-1.5 p-4">
          {navItems.map((item) => {

            const isActive = location.pathname === item.to;
            
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/10"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-primary"}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile at bottom */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3 rounded-2xl bg-secondary/50 p-3">
            <Avatar className="h-10 w-10 border-2 border-background">
              {/* <AvatarImage src={instructor1} /> */}
              <AvatarFallback>طه</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden text-right">
              <div className="truncate text-sm font-bold">طه محمد</div>
              <div className="truncate text-xs text-muted-foreground">طالب قيادة</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b border-border bg-card px-8">
          <div className="flex flex-1 items-center gap-3 rounded-2xl bg-secondary/50 px-4 py-2 md:max-w-md">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="ابحث عن دروس، مدربين..." 
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-8 text-sm" 
            />
          </div>
          
          <div className="flex items-center gap-4">
            <button className="relative rounded-xl bg-secondary p-2.5 transition-colors hover:bg-secondary/80">
              <Bell className="h-5 w-5 text-foreground" />
              <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white border-2 border-card">
                3
              </span>
            </button>
            <Avatar className="h-10 w-10 cursor-pointer border-2 border-transparent hover:border-primary transition-all">
              {/* <AvatarImage src={instructor1} /> */}
              <AvatarFallback>طه</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}