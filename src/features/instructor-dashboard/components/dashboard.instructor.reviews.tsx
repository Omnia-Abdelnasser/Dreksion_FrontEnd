import { Star, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar";
import { getInstructorReviews } from "../services/instructor-services";
import { InstructorReviewsResponse } from "../types/instructor-types";

export function InstructorReviews() {
  const { data, isLoading } = useQuery<InstructorReviewsResponse>({
    queryKey: ['instructor-reviews'],
    queryFn: getInstructorReviews,
  });

  if (isLoading) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  const reviews = data?.reviews || [];
  const avg = data?.averageRating ? data.averageRating.toFixed(1) : "0.0";
  const total = data?.totalReviews || 0;

  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">التقييمات</h1>
        <p className="font-medium text-muted-foreground">ماذا يقول الطلاب عن تجربتهم معك</p>
      </div>

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
          <div className="text-xs text-muted-foreground/60 mt-1">بناءً على {total} تقييم</div>
        </div>

        <div className="md:col-span-2 rounded-3xl border border-border bg-card p-8 shadow-sm flex flex-col justify-center">
          {[5, 4, 3, 2, 1].map((star) => {
            const starData = data?.ratingDistribution?.find(d => d.star === star);
            const count = starData ? starData.count : 0;
            const pct = total > 0 ? (count / total) * 100 : 0;
            
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

      <div className="space-y-4">
        <h2 className="text-lg font-bold px-1">أحدث التعليقات</h2>
        {reviews.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed rounded-3xl">
             <p className="text-muted-foreground font-bold">لا توجد تقييمات حالياً</p>
          </div>
        ) : (
          reviews.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-6 shadow-sm hover:shadow-md transition-all">
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                    <AvatarFallback className="bg-primary/10 text-primary font-bold">
                      {r.studentName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-bold text-foreground">{r.studentName}</div>
                    <div className="text-xs font-medium text-muted-foreground mt-1">
                      {new Date(r.createdAt).toLocaleDateString('ar-EG', { day: 'numeric', month: 'long' })}
                    </div>
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
                "{r.comment}"
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}