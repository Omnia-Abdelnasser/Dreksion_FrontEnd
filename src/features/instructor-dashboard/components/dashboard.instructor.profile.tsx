import { Camera, CheckCircle2, Save, X } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";

export function InstructorProfile() {
  return (
    <div className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">الملف الشخصي</h1>
        <p className="font-medium text-muted-foreground">إدارة معلوماتك الشخصية وتفاصيل السيارة والأسعار</p>
      </div>

      {/* Profile Header Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col items-center gap-6 border-b border-border pb-8 sm:flex-row sm:items-start">
          <div className="relative group">
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">طه</AvatarFallback>
            </Avatar>
            <button className="absolute bottom-1 left-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-110 transition-transform border-2 border-background">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1 text-center sm:text-right pt-2">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <h2 className="text-2xl font-black text-foreground">طه محمد</h2>
              <Badge className="gap-1 bg-green-500/10 text-green-600 border-green-200 py-1 px-3 rounded-lg font-bold">
                <CheckCircle2 className="h-3.5 w-3.5" /> معتمد
              </Badge>
            </div>
            <p className="mt-2 text-sm font-bold text-muted-foreground">مدرب معتمد · انضم في أبريل 2026</p>
          </div>
        </div>

        {/* Basic Info Grid */}
        <div className="grid gap-6 pt-8 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-bold text-sm px-1">الاسم الكامل</Label>
            <Input defaultValue="طه محمد" className="rounded-xl border-border bg-muted/20 focus:bg-card" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-sm px-1">البريد الإلكتروني</Label>
            <Input defaultValue="taha@dreksion.com" type="email" className="rounded-xl border-border bg-muted/20 focus:bg-card" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-sm px-1">رقم الهاتف</Label>
            <Input defaultValue="01012345678" className="rounded-xl border-border bg-muted/20 focus:bg-card" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-sm px-1">الموقع / المدينة</Label>
            <Input defaultValue="مدينة 6 أكتوبر، الجيزة" className="rounded-xl border-border bg-muted/20 focus:bg-card" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label className="font-bold text-sm px-1">نبذة عنك (Bio)</Label>
            <Textarea 
              defaultValue="مدرب قيادة محترف بخبرة في تعليم القيادة الآمنة والتحكم الكامل في السيارة لجميع المستويات." 
              rows={4} 
              className="rounded-2xl border-border bg-muted/20 focus:bg-card leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Car & Pricing Card */}
      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-bold flex items-center gap-2">
          <div className="h-1.5 w-4 bg-primary rounded-full" />
          السيارة والأسعار
        </h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-bold text-sm px-1">طراز السيارة</Label>
            <Input defaultValue="تويوتا كورولا 2022" className="rounded-xl border-border bg-muted/20 focus:bg-card" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-sm px-1">نوع ناقل الحركة</Label>
            <Select defaultValue="automatic">
              <SelectTrigger className="rounded-xl border-border bg-muted/20 focus:bg-card font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl font-bold">
                <SelectItem value="automatic">أوتوماتيك (Automatic)</SelectItem>
                <SelectItem value="manual">مانيوال (Manual)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-sm px-1">سعر الحصة (ج.م)</Label>
            <Input type="number" defaultValue="200" className="rounded-xl border-border bg-muted/20 focus:bg-card" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-sm px-1">مدة الحصة</Label>
            <Select defaultValue="1">
              <SelectTrigger className="rounded-xl border-border bg-muted/20 focus:bg-card font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="rounded-xl font-bold">
                <SelectItem value="1">ساعة واحدة</SelectItem>
                <SelectItem value="1.5">ساعة ونصف</SelectItem>
                <SelectItem value="2">ساعتان</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pb-6">
        <Button variant="outline" className="gap-2 rounded-xl font-bold px-6 border-primary/20 text-primary">
          <X className="h-4 w-4" /> إلغاء
        </Button>
        <Button className="gap-2 rounded-xl font-bold px-8 shadow-md shadow-primary/20">
          <Save className="h-4 w-4" /> حفظ التغييرات
        </Button>
      </div>
    </div>
  );
}