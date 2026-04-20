import { Trophy, CheckCircle2, Circle, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Progress } from "@/shared/components/ui/progress";

// Internal service and types imports
import { getStudentDashboardData } from "../services/student-services";

/**
 * Student Learning Progress Component
 * Refactored for a cleaner UI with subtle colors and smaller Hero section
 */
export function StudentProgressPage() {
  // 1. Fetch data from our service
  const { data, isLoading } = useQuery({
    queryKey: ['student-dashboard-data'],
    queryFn: getStudentDashboardData,
  });

  const profile = data as any;

  // Loading state
  if (isLoading) return (
    <div className="flex h-[400px] items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-primary" />
    </div>
  );

  const stats = profile?.stats || { progressPercentage: 0 };
  const levels = profile?.levels || [];
  const overall = stats.progressPercentage;

  return (
    <div className="space-y-8" dir="rtl">
      {/* Page Header */}
      <div className="flex flex-col gap-1 text-right">
        <h1 className="text-3xl font-black italic tracking-tight text-foreground uppercase tracking-widest">
          رحلتي التعليمية
        </h1>
        <p className="font-bold text-muted-foreground italic text-sm">
          تابع تقدمك في منهج دِركسيون المعتمد لتعليم القيادة
        </p>
      </div>

      {/* Hero Progress Card - Slimmer & Subdued (Muted Blue/Slate) */}
      <div className="rounded-[1.5rem] border border-border bg-slate-800/40 p-5 text-white shadow-lg relative overflow-hidden group backdrop-blur-sm">
        {/* Background Decorative Icon - Very subtle */}
        <Trophy className="absolute -left-2 -bottom-2 h-32 w-32 text-primary/10 -rotate-12 transition-transform group-hover:rotate-0 duration-700" />
        
        <div className="relative z-10 flex items-center gap-6">
          {/* Smaller Icon Container */}
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/20 border border-primary/20">
            <Trophy className="h-8 w-8 text-primary shadow-[0_0_15px_rgba(var(--primary),0.4)]" />
          </div>
          
          <div className="flex-1 text-right">
            <div className="flex items-center justify-between mb-2">
               <div className="text-[10px] font-black uppercase tracking-widest opacity-70 italic">إجمالي الإنجاز</div>
               <div className="text-2xl font-black italic tracking-tighter text-primary">{overall}%</div>
            </div>
            
            {/* Slimmer Progress Bar */}
            <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700/50">
              <div 
                className="h-full bg-primary transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(var(--primary),0.3)]" 
                style={{ width: `${overall}%` }} 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Levels Grid */}
      <div className="space-y-6">
        {levels.map((level: any) => {
          const skills = level.skills || [];
          const done = skills.filter((s: any) => s.completed).length;
          const total = skills.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const isComplete = pct === 100;

          return (
            <div key={level.id} className="rounded-[2rem] border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Level Header */}
              <div className="mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-center sm:text-right">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-black italic shadow-inner ${
                    isComplete 
                      ? "bg-green-500 text-white shadow-green-500/20" 
                      : "bg-primary/10 text-primary"
                  }`}>
                    {level.id}
                  </div>
                  <div>
                    <div className="font-black text-xl italic tracking-tight text-foreground">المستوى {level.id} - {level.name}</div>
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider italic mt-1">
                      تم إتقان {done} من أصل {total} مهارات
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                   <span className={`text-2xl font-black italic ${isComplete ? "text-green-500" : "text-primary"}`}>
                    {pct}%
                   </span>
                </div>
              </div>

              {/* Level Progress Bar - Slim Version */}
              <Progress value={pct} className={`h-1.5 mb-6 ${isComplete ? "[&>div]:bg-green-500" : ""}`} />

              {/* Skills Grid */}
              <div className="grid gap-3 sm:grid-cols-2">
                {skills.map((skill: any) => (
                  <div 
                    key={skill.id} 
                    className={`flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-bold transition-all ${
                      skill.completed 
                        ? "border-green-500/20 bg-green-500/5 text-foreground shadow-sm shadow-green-500/5" 
                        : "border-border bg-muted/20 text-muted-foreground opacity-70"
                    }`}
                  >
                    {skill.completed ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />
                    ) : (
                      <Circle className="h-5 w-5 shrink-0 opacity-20" />
                    )}
                    <span className="italic">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}