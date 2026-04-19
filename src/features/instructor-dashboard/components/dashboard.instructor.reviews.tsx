import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";

// Dummy data inside the file for now, you can move it to mock-data later
const reviews = [
  { name: "نور هشام", rating: 5, text: "مدرب ممتاز جداً، صبور وشرحه واضح.", date: "منذ يومين" },
  { name: "كريم سامي", rating: 5, text: "تعلمت معه القيادة في وقت قصير، شكراً.", date: "منذ أسبوع" },
  { name: "منى أحمد", rating: 4, text: "تجربة جيدة جداً، سيارة نظيفة ومريحة.", date: "منذ أسبوعين" },
  { name: "علي محمود", rating: 5, text: "أنصح به بشدة، أسلوب احترافي.", date: "منذ شهر" },
];

export function InstructorReviews() {
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">التقييمات</h1>
        <p className="font-medium text-muted-foreground">ماذا يقول الطلاب عن تجربتهم معك</p>
      </div>

      {/* Summary Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <div className="text-6xl font-black text-primary">{avg}</div>
          <div className="mt-3 flex justify-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star 
                key={i} 
                className={`h-6 w-6 ${i < Math.round(Number(avg)) ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} 
              />
            ))}
          </div>
          <div className="mt-3 text-sm font-bold text-muted-foreground">متوسط التقييم العام</div>
          <div className="text-xs text-muted-foreground/60 mt-1">بناءً على {reviews.length} تقييم</div>
        </div>

        <div className="md:col-span-2 rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = (count / reviews.length) * 100;
            return (
              <div key={star} className="mb-3 flex items-center gap-4 text-sm font-bold">
                <div className="flex items-center gap-1 w-8">
                  <span>{star}</span>
                  <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${pct}%` }} 
                  />
                </div>
                <span className="w-8 text-left text-muted-foreground">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold px-1">أحدث التعليقات</h2>
        {reviews.map((r, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {r.name[0]}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-foreground">{r.name}</div>
                  <div className="text-xs font-medium text-muted-foreground mt-1">{r.date}</div>
                </div>
              </div>
              <div className="flex gap-0.5 bg-muted/30 p-2 rounded-xl">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star 
                    key={j} 
                    className={`h-4 w-4 ${j < r.rating ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} 
                  />
                ))}
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed font-medium text-muted-foreground bg-muted/10 p-4 rounded-xl border border-border/50">
              "{r.text}"
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}