import {
  Calendar,
  Car,
  Clock,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Star,
  User,
  ShieldCheck,
  Users as UsersIcon,
  Settings,
  BookOpen
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';

interface SidebarProps {
  role?: 'instructor' | 'student' | 'admin';
}

// --- Admin Navigation ---
const adminNavItems = [
  { to: '/dashboard/admin', label: 'نظرة عامة', icon: LayoutDashboard },
  { to: '/dashboard/admin/instructors', label: 'مراجعة المدربين', icon: ShieldCheck },
  { to: '/dashboard/admin/users', label: 'إدارة المستخدمين', icon: UsersIcon },
  { to: '/dashboard/admin/settings', label: 'إعدادات النظام', icon: Settings },
] as const;

// --- Instructor Navigation ---
const instructorNavItems = [
  { to: '/dashboard/instructor', label: 'نظرة عامة', icon: LayoutDashboard },
  { to: '/dashboard/instructor/bookings', label: 'طلبات الحجز', icon: Calendar },
  { to: '/dashboard/instructor/availability', label: 'المواعيد', icon: Clock },
  { to: '/dashboard/instructor/students', label: 'قائمة الطلاب', icon: UsersIcon },
  { to: '/dashboard/instructor/chat', label: 'الرسائل', icon: MessageCircle },
  { to: '/dashboard/instructor/reviews', label: 'التقييمات', icon: Star },
  { to: '/dashboard/instructor/profile', label: 'الملف الشخصي', icon: User },
] as const;

// --- Student Navigation (Updated with Chat) ---
const studentNavItems = [
  { to: '/dashboard/student', label: 'نظرة عامة', icon: LayoutDashboard },
  { to: '/dashboard/student/sessions', label: 'جلساتي التدريبية', icon: Calendar },
  { to: '/dashboard/student/progress', label: 'مستوى التقدم', icon: BookOpen },
  { to: '/dashboard/student/chat', label: 'الرسائل', icon: MessageCircle }, // تم إضافة الشات هنا
  { to: '/dashboard/student/profile', label: 'الملف الشخصي', icon: User },
] as const;

export function DashboardSidebar({ role }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = 
    role === 'admin' 
      ? adminNavItems 
      : role === 'instructor' 
        ? instructorNavItems 
        : studentNavItems;

  const handleLogout = () => {
    // logout(); 
    console.log('Logout triggered');
    navigate('/login');
  };

  return (
    <aside className='hidden w-72 flex-col border-l border-border bg-card lg:flex' dir='rtl'>
      {/* Logo Section */}
      <Link
        to='/home'
        className='flex items-center gap-2 border-b border-border p-6'
      >
        <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20'>
          <Car className='h-6 w-6' />
        </div>
        <span className='text-2xl font-black italic tracking-tighter text-primary'>
          دِركسيون
        </span>
      </Link>

      {/* Navigation Links */}
      <nav className='flex-1 space-y-1 overflow-y-auto p-4 custom-scrollbar'>
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                active
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20 scale-[1.02]'
                  : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${active ? 'text-primary-foreground' : 'text-muted-foreground'}`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Info & Logout */}
      <div className='space-y-2 border-t border-border p-4'>
        <div className='flex items-center gap-3 rounded-2xl bg-secondary/50 p-3 border border-border/50'>
          <Avatar className='h-10 w-10 border-2 border-background shadow-sm'>
            <AvatarImage src={undefined} />
            <AvatarFallback className='font-bold bg-primary/10 text-primary uppercase italic'>
              طه
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 overflow-hidden text-right'>
            <p className='truncate text-sm font-black text-foreground italic'>
              طه محمد
            </p>
            <p className='truncate text-[10px] font-black text-primary/80 uppercase tracking-widest italic'>
              {role === 'admin' 
                ? 'مدير النظام' 
                : role === 'instructor' 
                  ? 'مدرب معتمد' 
                  : 'متدرب نشط'}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className='flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-black text-destructive transition-all duration-200 hover:bg-destructive/10 active:scale-95'
        >
          <LogOut className='h-5 w-5' />
          تسجيل الخروج
        </button>
      </div>
    </aside>
  );
}