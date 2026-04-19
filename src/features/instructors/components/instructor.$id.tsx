import { useParams, Link } from "react-router-dom";
import { 
  Star, MapPin, Car as CarIcon, MessageSquare, 
  Calendar, Award, CheckCircle2, Users 
} from "lucide-react";

import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { InstructorsMap } from "@/shared/components/ui/InstructorsMap";
import { mockInstructors } from "@/shared/lib/mock-data";

export default function InstructorProfile() {
  const { id } = useParams<{ id: string }>();
  
  const instructor = mockInstructors.find((i) => i.id === id);

  if (!instructor) {
    return (
      <div className="flex min-h-screen items-center justify-center text-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">Instructor Not Found</h1>
          <Button asChild className="mt-4">
            <Link to="/instructors">Back to Search</Link>
          </Button>
        </div>
      </div>
    );
  }

  const slots = ["08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
  const days = ["السبت", "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة"];

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground" dir="rtl">
      {/* Profile Header */}
      <div className="border-b border-border bg-secondary/20">
        <div className="container mx-auto max-w-7xl px-4 py-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
            <Avatar className="h-28 w-28 border-4 border-card shadow-lg">
              <AvatarImage src={instructor.avatarUrl} />
              <AvatarFallback>{instructor.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-right">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{instructor.name}</h1>
                {instructor.isVerified && (
                  <Badge className="gap-1 bg-green-500/10 text-green-500 hover:bg-green-500/10 border-green-500/20">
                    <CheckCircle2 className="h-3.5 w-3.5" /> معتمد
                  </Badge>
                )}
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-foreground">{instructor.rating}</span>
                  ({instructor.reviewsCount} تقييم)
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {instructor.location}
                </span>
                <span className="flex items-center gap-1">
                  <CarIcon className="h-4 w-4" /> {instructor.carType}
                </span>
              </div>
              <p className="mt-3 max-w-2xl text-muted-foreground">{instructor.bio}</p>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <div className="text-3xl font-bold text-primary">
                {instructor.hourlyRate} <span className="text-base font-normal text-muted-foreground">ج.م / ساعة</span>
              </div>
              <div className="flex gap-2">
                <Button asChild size="lg" className="gap-2">
                  <Link to={`/booking/${instructor.id}`}>
                    <Calendar className="h-4 w-4" /> احجز الآن
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/dashboard/chat">
                    <MessageSquare className="h-4 w-4" /> دردشة
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="container mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Stats Section */}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { icon: Award, label: "سنوات الخبرة", value: instructor.experienceYears },
              { icon: Users, label: "إجمالي الطلاب", value: "150+" },
              { icon: Star, label: "متوسط التقييم", value: instructor.rating },
            ].map((s, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="text-2xl font-bold">{s.value}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Schedule Section */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold">المواعيد المتاحة</h3>
            <div className="grid grid-cols-7 gap-2 text-center text-xs">
              {days.map((d) => (
                <div key={d} className="rounded-lg bg-muted py-2 font-semibold">{d}</div>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-7 gap-2">
              {Array.from({ length: 28 }).map((_, idx) => {
                const isAvailable = (idx + 1) % 3 !== 0;
                return (
                  <button
                    key={idx}
                    disabled={!isAvailable}
                    className={`rounded-lg py-2 text-[10px] transition-colors ${
                      isAvailable
                        ? "bg-primary/5 text-primary hover:bg-primary hover:text-white"
                        : "bg-muted/30 text-muted-foreground/40 line-through"
                    }`}
                  >
                    {slots[idx % slots.length]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reviews Section */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm text-right">
            <h3 className="mb-6 text-lg font-bold">آخر التقييمات</h3>
            <div className="space-y-6">
              {[
                { name: "نور هشام", rating: 5, text: "مدرب ممتاز جداً، صبور وشرحه واضح. أنصح به بشدة." },
                { name: "كريم سامي", rating: 5, text: "تعلمت معه القيادة في وقت قصير، شكراً." },
              ].map((r, i) => (
                <div key={i} className="border-b border-border pb-6 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>{r.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-semibold">{r.name}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`h-4 w-4 ${j < r.rating ? "fill-yellow-500 text-yellow-500" : "text-muted"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h3 className="mb-4 px-2 font-bold text-right">الموقع على الخريطة</h3>
            <div className="h-64 overflow-hidden rounded-xl bg-muted/20">
              <InstructorsMap instructors={[instructor]} />
            </div>
            <div className="mt-4 flex items-center gap-2 px-2 text-sm text-muted-foreground text-right">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{instructor.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}