import { Bell, Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input"; 
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";

const instructorImg = "https://github.com/shadcn.png"; 

export function DashboardHeader() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-4 md:px-8" dir="rtl">
      <div className="flex flex-1 items-center gap-2 rounded-2xl bg-muted/50 px-3 py-1.5 md:max-w-md border border-transparent focus-within:border-primary/20 focus-within:bg-card transition-all">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="ابحث عن دروس، طلاب، أو تقارير..." 
          className="border-0 bg-transparent shadow-none focus-visible:ring-0 h-8 text-sm font-medium" 
        />
      </div>

      <div className="flex items-center gap-4">
        <button className="relative rounded-xl border border-border bg-card p-2.5 hover:bg-secondary hover:text-primary transition-all duration-200">
          <Bell className="h-5 w-5" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-black text-white ring-2 ring-background">
            3
          </span>
        </button>
        
        <div className="h-8 w-[1px] bg-border/60 mx-1 hidden sm:block" />

        <div className="flex items-center gap-3">
          <div className="hidden flex-col items-end sm:flex">
            <span className="text-sm font-bold text-foreground leading-none">طه محمد</span>
            <span className="text-[10px] font-bold text-primary mt-1">مدرب محترف</span>
          </div>
          <Avatar className="h-10 w-10 border-2 border-background shadow-sm">
            <AvatarImage src={instructorImg} alt="Taha" />
            <AvatarFallback className="bg-primary/10 text-primary font-bold">طه</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}