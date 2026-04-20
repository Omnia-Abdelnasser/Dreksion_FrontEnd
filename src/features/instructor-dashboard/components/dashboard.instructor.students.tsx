import { useState } from "react";
import { CheckCircle2, Circle, ChevronDown, MessageSquare, Save, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Progress } from "@/shared/components/ui/progress";
import { toast } from "sonner";
import { getInstructorStudents, updateStudentSkill } from "../services/instructor-services";

export function InstructorStudents() {
  const queryClient = useQueryClient();
  const [openId, setOpenId] = useState<string | null>(null);

  // 1. Fetch real students data
  const { data: students, isLoading } = useQuery({
    queryKey: ['instructor-students'],
    queryFn: getInstructorStudents,
  });

  // 2. Mutation for toggling skill status
  const { mutate: toggleSkill, isPending: isUpdating } = useMutation({
    mutationFn: ({ studentId, skillId, completed }: { studentId: string; skillId: string; completed: boolean }) => 
      updateStudentSkill(studentId, skillId, completed),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-students'] });
      toast.success("تم تحديث مهارات الطالب");
    }
  });

  if (isLoading) return <div className="flex h-[400px] items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-foreground italic">طلابي ({students?.length || 0})</h1>
        <p className="font-medium text-muted-foreground">تابع تقدم طلابك وحدث مهاراتهم التعليمية</p>
      </div>

      <div className="space-y-4">
        {students?.map((stu) => (
          <div 
            key={stu.id} 
            className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all"
          >
            {/* Student Header Toggle */}
            <button
              onClick={() => setOpenId(openId === stu.id ? null : stu.id)}
              className="flex w-full items-center gap-4 p-5 text-right hover:bg-muted/30 transition-colors"
            >
              <Avatar className="h-14 w-14 border-2 border-background shadow-sm">
                <AvatarFallback className="bg-primary/10 text-primary font-bold uppercase">
                  {stu.name[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="font-bold text-lg">{stu.name}</div>
                <div className="mt-1 flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                    المستوى {stu.currentLevel}
                  </span>
                  <span className="text-xs font-bold text-muted-foreground">
                    {stu.sessions} حصة تدريبية
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <Progress value={stu.progress} className="h-2 flex-1" />
                  <span className="text-sm font-black text-primary">{stu.progress}%</span>
                </div>
              </div>
              
              <ChevronDown 
                className={`h-6 w-6 text-muted-foreground transition-transform duration-300 ${
                  openId === stu.id ? "rotate-180" : ""
                }`} 
              />
            </button>

            {/* Expansion Content: Skills Tracking */}
            {openId === stu.id && (
              <div className="border-t border-border bg-muted/5 p-6">
                <div className="grid gap-6">
                  {stu.levels.map((lvl) => (
                    <div key={lvl.id} className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-black text-foreground italic">
                        <div className="h-1 w-6 bg-primary rounded-full" />
                        المستوى {lvl.id} - {lvl.name}
                      </div>
                      
                      <div className="grid gap-3 sm:grid-cols-2">
                        {lvl.skills.map((s) => (
                          <button
                            key={s.id}
                            disabled={isUpdating}
                            onClick={() => toggleSkill({ studentId: stu.id, skillId: s.id, completed: !s.completed })}
                            className={`flex items-center justify-between rounded-xl border p-4 text-sm font-bold transition-all active:scale-[0.98] ${
                              s.completed
                                ? "border-green-500/30 bg-green-500/5 text-green-700 shadow-sm"
                                : "border-border bg-card hover:border-primary/30"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {s.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground/30" />
                              )}
                              <span>{s.name}</span>
                            </div>
                            {!s.completed && (
                              <span className="text-[10px] text-primary underline underline-offset-4 font-black">
                                تحديد كمكتمل
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-8 flex justify-end gap-3 border-t border-border pt-6">
                  <Button variant="outline" className="gap-2 rounded-xl font-bold border-primary/20 text-primary hover:bg-primary/5">
                    <MessageSquare className="h-4 w-4" />
                    تواصل مع {stu.name.split(' ')[0]}
                  </Button>
                  <Button className="gap-2 rounded-xl font-bold shadow-lg shadow-primary/20">
                    <Save className="h-4 w-4" />
                    حفظ التعديلات
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
        {students?.length === 0 && (
          <div className="text-center py-20 border-2 border-dashed rounded-3xl text-muted-foreground font-bold">
            لا يوجد طلاب مسجلين معك حالياً
          </div>
        )}
      </div>
    </div>
  );
}