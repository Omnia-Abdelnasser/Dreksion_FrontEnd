import React, { useState, useEffect } from "react";
import { Plus, Trash2, Save, Loader2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { toast } from "sonner";
import { getAvailability, updateAvailability } from "../services/instructor-services";

const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];
const slots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];

export function Availability() {
  const queryClient = useQueryClient();
  const [available, setAvailable] = useState<Set<string>>(new Set());

  // 1. Fetch data
  const { data: initialData, isLoading } = useQuery({
    queryKey: ['instructor-availability'],
    queryFn: getAvailability,
  });

  // Sync state with fetched data
  useEffect(() => {
    if (initialData) {
      setAvailable(new Set(initialData));
    }
  }, [initialData]);

  // 2. Save mutation
  const { mutate: saveSchedule, isPending: isSaving } = useMutation({
    mutationFn: (data: string[]) => updateAvailability(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-availability'] });
      toast.success("تم حفظ جدول المواعيد بنجاح");
    },
    onError: () => toast.error("فشل في حفظ المواعيد")
  });

  const toggle = (key: string) => {
    setAvailable((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleSave = () => {
    saveSchedule(Array.from(available));
  };

  if (isLoading) return <div className="flex h-[400px] items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-primary" /></div>;

  return (
    <div className="space-y-6" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground italic">إدارة المواعيد</h1>
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
            disabled={isSaving}
            className="gap-2 rounded-xl text-destructive hover:bg-destructive/10 border-destructive/20 font-bold"
            onClick={() => setAvailable(new Set())}
          >
            <Trash2 className="h-4 w-4" /> مسح الجدول
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-xl px-10 font-bold shadow-lg shadow-primary/20 min-w-[160px]"
          >
            {isSaving ? <Loader2 className="animate-spin h-4 w-4 ml-2" /> : <Save className="h-4 w-4 ml-2" />}
            حفظ الجدول
          </Button>
        </div>
      </div>
    </div>
  );
}