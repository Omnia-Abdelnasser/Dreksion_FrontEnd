import {
  Calendar,
  Car,
  Clock,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Star,
  TrendingUp,
  User,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar';

interface SidebarProps {
   role?: 'instructor' | 'student' | 'admin';
}

const instructorImg = 'https://github.com/shadcn.png';

const navItems = [
   { to: '/dashboard/instructor', label: 'نظرة عامة', icon: LayoutDashboard },
   { to: '/dashboard/instructor/bookings',label: 'طلبات الحجز',icon: Calendar, },
   { to: '/dashboard/instructor/availability', label: 'المواعيد', icon: Clock },
   {  to: '/dashboard/instructor/students',  label: 'قائمة الطلاب',   icon: TrendingUp,},
   { to: '/dashboard/instructor/chat', label: 'الرسائل', icon: MessageCircle },
   { to: '/dashboard/instructor/reviews', label: 'التقييمات', icon: Star },
   { to: '/dashboard/instructor/profile', label: 'الملف الشخصي', icon: User },
] as const;

export function DashboardSidebar({ role }: SidebarProps) {
   const location = useLocation();

   return (
      <aside className='hidden w-72 flex-col border-l border-border bg-card lg:flex'dir='rtl'>
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

         <nav className='flex-1 space-y-1 overflow-y-auto p-4'>
            {navItems.map((item) => {
               const active = location.pathname === item.to;
               return (
                  <Link
                     key={item.to}
                     to={item.to}
                     className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
                        active
                           ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
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

         <div className='space-y-2 border-t border-border p-4'>
            <div className='flex items-center gap-3 rounded-2xl bg-secondary/50 p-3'>
               <Avatar className='h-10 w-10 border-2 border-background shadow-sm'>
                  <AvatarImage src={instructorImg} />
                  <AvatarFallback className='font-bold'>طه</AvatarFallback>
               </Avatar>
               <div className='flex-1 overflow-hidden text-right'>
                  <p className='truncate text-sm font-bold text-foreground'>
                     طه محمد
                  </p>
                  <p className='truncate text-[10px] font-bold text-primary'>
                     {role === 'instructor' ? 'مدرب معتمد' : 'مستخدم'}
                  </p>
               </div>
            </div>

            <button
               onClick={() => console.log('Logout triggered')}
               className='flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold text-destructive transition-all duration-200 hover:bg-destructive/10'
            >
               <LogOut className='h-5 w-5' />
               تسجيل الخروج
            </button>
         </div>
      </aside>
   );
}
