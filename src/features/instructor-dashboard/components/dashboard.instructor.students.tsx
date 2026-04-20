import { useState } from "react";
import { CheckCircle2, Circle, ChevronDown, MessageSquare, Save } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { Progress } from "@/shared/components/ui/progress";

// Demo data for the skills tracking
const mockLevels = [
  {
    id: 1,
    name: "أساسيات القيادة",
    skills: [
      { id: "s1", name: "تحريك السيارة", completed: true },
      { id: "s2", name: "استخدام الفرامل", completed: true },
    ],
  },
  {
    id: 2,
    name: "المهارات المتقدمة",
    skills: [
      { id: "s3", name: "الركن الموازي", completed: false },
      { id: "s4", name: "القيادة في الزحام", completed: false },
    ],
  },
];

const students = [
  { id: "u1", name: "كريم سامي", sessions: 6, level: 1, progress: 47 },
  { id: "u2", name: "نور هشام", sessions: 12, level: 2, progress: 75 },
  { id: "u3", name: "منى أحمد", sessions: 3, level: 0, progress: 25 },
];

export function InstructorStudents() {
  const [openId, setOpenId] = useState<string | null>("u1");

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">طلابي ({students.length})</h1>
        <p className="font-medium text-muted-foreground">تابع تقدم طلابك وحدث مهاراتهم</p>
      </div>

      <div className="space-y-4">
        {students.map((stu) => (
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
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {stu.name[0]}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="font-bold text-lg">{stu.name}</div>
                <div className="mt-1 flex items-center gap-3">
                  <span className="text-xs font-bold text-muted-foreground bg-muted px-2 py-1 rounded-lg">
                    المستوى {stu.level}
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
              <div className="border-t border-border bg-muted/10 p-6">
                <div className="grid gap-6">
                  {mockLevels.map((lvl) => (
                    <div key={lvl.id} className="space-y-3">
                      <div className="flex items-center gap-2 text-sm font-black text-foreground">
                        <div className="h-1 w-6 bg-primary rounded-full" />
                        المستوى {lvl.id} - {lvl.name}
                      </div>
                      
                      <div className="grid gap-3 sm:grid-cols-2">
                        {lvl.skills.map((s) => (
                          <button
                            key={s.id}
                            className={`flex items-center justify-between rounded-xl border p-4 text-sm font-bold transition-all ${
                              s.completed
                                ? "border-green-500/30 bg-green-500/5 text-green-700"
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
                              <span className="text-[10px] text-primary underline underline-offset-4">
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
                  <Button variant="outline" className="gap-2 rounded-xl font-bold border-primary/20 text-primary">
                    <MessageSquare className="h-4 w-4" />
                    إرسال رسالة
                  </Button>
                  <Button className="gap-2 rounded-xl font-bold shadow-md shadow-primary/20">
                    <Save className="h-4 w-4" />
                    حفظ التقدم
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}