import { useState } from "react";
import { Search, MapPin, SlidersHorizontal, List, Map as MapIcon } from "lucide-react";
import { Link } from "react-router-dom";

// Components

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Slider } from "@/shared/components/ui/slider";
import { Label } from "@/shared/components/ui/label";
import { Checkbox } from "@/shared/components/ui/checkbox";
import InstructorCard from "@/features/instructors/components/instructor-card";
import { InstructorsMap } from "@/shared/components/ui/InstructorsMap";

// Data
import { mockInstructors } from "@/shared/lib/mock-data";

export default function SearchPage() {
  // 1. States للتحكم في الفلترة والعرض
  const [view, setView] = useState<"list" | "map">("list");
  const [price, setPrice] = useState([300]);
  const [rating, setRating] = useState([1]);
  const [carTypes, setCarTypes] = useState<string[]>([]);

  const filtered = mockInstructors.filter((i) => {
    const matchPrice = i.hourlyRate <= price[0];
    const matchRating = i.rating >= rating[0];
    const matchCar = carTypes.length === 0 || carTypes.includes(i.carType);
    return matchPrice && matchRating && matchCar;
  });

  const toggleType = (t: string) =>
    setCarTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground" dir="rtl">

      {/* Top Search Bar */}
      <div className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto max-w-7xl px-4 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[240px] flex-1">
              <MapPin className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="ابحث بالمنطقة (مثلاً: أكتوبر، زايد...)" className="pr-10 h-11 rounded-xl" />
            </div>
            <Button className="h-11 px-8 rounded-xl gap-2 font-bold">
              <Search className="h-4 w-4" /> ابحث الآن
            </Button>
            
            {/* View Switcher */}
            <div className="mr-auto flex items-center gap-1 rounded-xl border border-border bg-muted/30 p-1">
              <Button
                size="sm"
                variant={view === "list" ? "default" : "ghost"}
                onClick={() => setView("list")}
                className={`gap-2 rounded-lg ${view === "list" ? "shadow-sm" : ""}`}
              >
                <List className="h-4 w-4" /> قائمة
              </Button>
              <Button
                size="sm"
                variant={view === "map" ? "default" : "ghost"}
                onClick={() => setView("map")}
                className={`gap-2 rounded-lg ${view === "map" ? "shadow-sm" : ""}`}
              >
                <MapIcon className="h-4 w-4" /> خريطة
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto grid max-w-7xl flex-1 gap-8 px-4 py-8 lg:grid-cols-[300px_1fr]">
        
        {/* Sidebar Filters */}
        <aside className="h-fit sticky top-24 space-y-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-2 border-b border-border pb-4">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h3 className="font-bold text-lg">تصفية النتائج</h3>
          </div>

          {/* Price Filter */}
          <div className="space-y-4">
            <Label className="flex justify-between font-bold">
              <span>السعر الأقصى</span>
              <span className="text-primary">{price[0]} ج.م</span>
            </Label>
            <Slider 
              value={price} 
              onValueChange={setPrice} 
              max={500} 
              min={50} 
              step={10} 
              className="py-2"
            />
          </div>

          {/* Rating Filter */}
          <div className="space-y-4">
            <Label className="flex justify-between font-bold">
              <span>التقييم الأدنى</span>
              <span className="text-primary">{rating[0]}+ ⭐</span>
            </Label>
            <Slider 
              value={rating} 
              onValueChange={setRating} 
              max={5} 
              min={1} 
              step={0.5}
              className="py-2"
            />
          </div>

          {/* Car Type Filter */}
          <div className="space-y-4">
            <Label className="font-bold block mb-2">نوع ناقل الحركة</Label>
            <div className="grid gap-2">
              {[
                { id: "automatic", label: "أوتوماتيك" },
                { id: "toyota", label: "مانيوال (عادي)" },
              ].map((t) => (
                <div 
                  key={t.id} 
                  onClick={() => toggleType(t.id)}
                  className={`flex cursor-pointer items-center justify-between rounded-xl p-3 border transition-all ${
                    carTypes.includes(t.id) 
                    ? "border-primary bg-primary/5" 
                    : "border-transparent hover:bg-muted"
                  }`}
                >
                  <span className="text-sm font-medium">{t.label}</span>
                  <Checkbox checked={carTypes.includes(t.id)} />
                </div>
              ))}
            </div>
          </div>

          <Button 
            variant="outline" 
            className="w-full rounded-xl text-muted-foreground"
            onClick={() => {setPrice([500]); setRating([1]); setCarTypes([]);}}
          >
            إعادة تعيين الكل
          </Button>
        </aside>

        {/* Results Area */}
        <main>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {filtered.length} مدرب متاح حالياً
            </h2>
          </div>

          {view === "list" ? (
            filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border bg-card p-20 text-center">
                <div className="bg-muted p-4 rounded-full mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-bold text-lg">لا توجد نتائج</h3>
                <p className="text-muted-foreground mt-2">جرب تغيير معايير البحث أو الفلاتر</p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((ins) => (
                  <InstructorCard key={ins.id} instructor={ins} />
                ))}
              </div>
            )
          ) : (
            <div className="h-[calc(100vh-250px)] min-h-[500px] sticky top-24 rounded-3xl overflow-hidden border border-border shadow-md">
              <InstructorsMap instructors={filtered} />
            </div>
          )}
        </main>
      </div>

    </div>
  );
}