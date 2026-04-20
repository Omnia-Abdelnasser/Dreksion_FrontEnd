import { Bell, Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

interface HeaderProps {
  userName?: string;
  userRole?: string;
  userImage?: string;
  notificationCount?: number;
}

export function DashboardHeader({ 
  userName = "طه محمد", 
  userRole = "مدرب محترف", 
  userImage,
  notificationCount = 3 
}: HeaderProps) {
  
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-8 shrink-0" dir="rtl">
      
      {/* Search Section */}
      <div className="flex flex-1 items-center gap-2 rounded-2xl bg-muted/50 px-3 py-1.5 md:max-w-md border border-transparent focus-within:border-primary/20 focus-within:bg-card transition-all">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="ابحث عن دروس، طلاب، أو تقارير..." 
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-8 text-sm font-black italic" 
        />
      </div>

      {/* Profile & Notifications */}
      <div className="flex items-center gap-4">
        
        {/* Notifications Button */}
        <button className="relative rounded-xl border border-border bg-card p-2.5 hover:bg-secondary hover:text-primary transition-all duration-200 active:scale-90">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-black text-white ring-2 ring-background">
              {notificationCount}
            </span>
          )}
        </button>
        
        <div className="h-8 w-[1px] bg-border/60 mx-1 hidden sm:block" />

        {/* User Profile Info */}
        <div className="flex items-center gap-3">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-black text-foreground leading-none">{userName}</span>
            <span className="text-[10px] font-black text-primary mt-1 uppercase tracking-wider">{userRole}</span>
          </div>
          <Avatar className="h-10 w-10 border-2 border-background shadow-md">
            <AvatarImage src={userImage} alt={userName} />
            <AvatarFallback className="bg-primary/10 text-primary font-black">
              {userName.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}