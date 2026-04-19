import React, { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
const slots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

export function Availability() {
  const [available, setAvailable] = useState<Set<string>>(
    new Set(["السبت-10:00", "الأحد-12:00", "الاثنين-16:00", "الثلاثاء-08:00", "الأربعاء-14:00"])
  );

  const toggle = (key: string) => {
    setAvailable((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">إدارة المواعيد</h1>
        <Button className="gap-2 rounded-xl font-bold">
          <Plus className="h-4 w-4" /> إضافة موعد يدوي
        </Button>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <p className="mb-6 text-sm text-muted-foreground font-medium">
          اضغط على المربعات لتحديد المواعيد المتاحة لديك خلال الأسبوع ليتمكن الطلاب من الحجز.
        </p>
        
        <div className="overflow-x-auto">
          <div className="min-w-[700px] pb-4">
            <div className="grid grid-cols-[100px_repeat(7,1fr)] gap-3">
              <div />
              
              {days.map((d) => (
                <div key={d} className="rounded-xl bg-muted/50 py-3 text-center text-xs font-black text-foreground">
                  {d}
                </div>
              ))}

              {slots.map((slot) => (
                <React.Fragment key={slot}>
                  <div className="flex items-center justify-center text-xs font-bold text-muted-foreground bg-muted/20 rounded-xl">
                    {slot}
                  </div>
                  
                  {days.map((d) => {
                    const key = `${d}-${slot}`;
                    const isOn = available.has(key);
                    return (
                      <button
                        key={key}
                        onClick={() => toggle(key)}
                        type="button"
                        className={`rounded-xl py-4 text-[10px] font-black transition-all duration-200 border-2 ${
                          isOn
                            ? "bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20 scale-[0.98]"
                            : "border-dashed border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/5"
                        }`}
                      >
                        {isOn ? "متاح" : "+"}
                      </button>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-border pt-6">
          <Button 
            variant="outline" 
            className="gap-2 rounded-xl text-destructive hover:bg-destructive/10 border-destructive/20 font-bold"
            onClick={() => setAvailable(new Set())}
          >
            <Trash2 className="h-4 w-4" /> مسح الجدول بالكامل
          </Button>
          <Button className="rounded-xl px-10 font-bold shadow-lg shadow-primary/20">
            حفظ جدول المواعيد
          </Button>
        </div>
      </div>
    </div>
  );
}