import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Settings as SettingsIcon, Save, Loader2, Banknote, Bell, Globe } from "lucide-react";
import { Switch } from "@/shared/components/ui/switch";
import { toast } from "sonner";
import { getSystemSettings, updateSystemSettings } from "../services/admin.services";
import { SystemSettings } from "../types/admin.types";

export function AdminSettings() {
  const queryClient = useQueryClient();

  // 1. Fetch current settings from Node.js
  const { data: settings, isLoading } = useQuery({
    queryKey: ['system-settings'],
    queryFn: getSystemSettings
  });

  // 2. Mutation for saving changes
  const { mutate: saveSettings, isPending: isSaving } = useMutation({
    mutationFn: (data: SystemSettings) => updateSystemSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] });
      toast.success("تم تحديث إعدادات النظام بنجاح");
    },
    onError: () => toast.error("فشل في تحديث الإعدادات")
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Construct the data object with explicit type casting to resolve TS errors
    const data: SystemSettings = {
      platformName: (formData.get("platformName") as string) || "دِركسيون",
      commissionPercentage: Number(formData.get("commissionPercentage")),
      minPrice: Number(formData.get("minPrice")),
      maxPrice: Number(formData.get("maxPrice")),
      allowPublicRegistration: formData.get("allowPublicRegistration") === "on",
      emailNotificationsEnabled: formData.get("emailNotificationsEnabled") === "on",
      autoVerifyInstructors: settings?.autoVerifyInstructors || false, // Keep existing or default
    };
    
    saveSettings(data);
  };

  if (isLoading) return (
    <div className="flex h-[400px] items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-8 p-1" dir="rtl">
      {/* Header Section */}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center gap-3 italic">
          <SettingsIcon className="h-8 w-8 text-primary" />
          إعدادات النظام
        </h1>
        <p className="text-sm font-bold text-muted-foreground mt-1">إدارة معايير المنصة وسياسات التسعير العامة</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          
          {/* General & Pricing Configuration */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-black text-foreground border-b border-border pb-4 italic flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              الإعدادات العامة والمالية
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="font-bold text-sm">اسم المنصة</Label>
                <Input 
                  name="platformName" 
                  defaultValue={settings?.platformName || "دِركسيون"} 
                  className="h-12 rounded-xl border-border bg-muted/20 focus:bg-card font-bold" 
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-sm">العمولة (%)</Label>
                <Input 
                  name="commissionPercentage" 
                  type="number" 
                  defaultValue={settings?.commissionPercentage || 10} 
                  className="h-12 rounded-xl border-border bg-muted/20 focus:bg-card font-bold" 
                />
              </div>
              <div className="space-y-2 border-t border-border pt-4 md:col-span-2">
                <p className="text-xs font-bold text-primary mb-4">نطاق أسعار الحصص المسموح به للمدربين (ج.م)</p>
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-sm">الحد الأدنى للسعر</Label>
                <Input 
                  name="minPrice" 
                  type="number" 
                  defaultValue={settings?.minPrice || 50} 
                  className="h-12 rounded-xl border-border bg-muted/20 focus:bg-card font-bold" 
                />
              </div>
              <div className="space-y-2">
                <Label className="font-bold text-sm">الحد الأقصى للسعر</Label>
                <Input 
                  name="maxPrice" 
                  type="number" 
                  defaultValue={settings?.maxPrice || 500} 
                  className="h-12 rounded-xl border-border bg-muted/20 focus:bg-card font-bold" 
                />
              </div>
            </div>
          </div>

          {/* Access & Notifications Section */}
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h3 className="mb-6 text-xl font-black text-foreground border-b border-border pb-4 italic">الوصول والتنبيهات</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/30 p-5 transition-all hover:bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-black text-foreground">التسجيل العام</div>
                    <div className="text-xs font-bold text-muted-foreground mt-1 max-w-xs">السماح للمستخدمين الجدد بإنشاء حسابات بدون دعوة</div>
                  </div>
                </div>
                <Switch 
                  name="allowPublicRegistration" 
                  defaultChecked={settings?.allowPublicRegistration} 
                />
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-border bg-muted/30 p-5 transition-all hover:bg-muted/50">
                <div className="flex items-start gap-4">
                  <div className="mt-1 h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Bell className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-black text-foreground">إشعارات النظام</div>
                    <div className="text-xs font-bold text-muted-foreground mt-1 max-w-xs">إرسال تنبيهات فورية عند وجود طلبات جديدة</div>
                  </div>
                </div>
                <Switch 
                  name="emailNotificationsEnabled" 
                  defaultChecked={settings?.emailNotificationsEnabled} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Action Card */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg shadow-primary/20">
            <h4 className="text-lg font-black mb-2 tracking-tight">تحديث النظام</h4>
            <p className="text-sm font-medium opacity-90 leading-relaxed">
              تغيير نطاق الأسعار سيؤثر على جميع المدربين الجدد والأسعار المعروضة للطلاب.
            </p>
            <Button 
              type="submit" 
              disabled={isSaving}
              className="w-full mt-6 bg-white text-primary hover:bg-white/90 rounded-2xl font-black h-12 transition-all active:scale-95 shadow-md"
            >
              {isSaving ? (
                <Loader2 className="ml-2 h-5 w-5 animate-spin" />
              ) : (
                <Save className="ml-2 h-5 w-5" />
              )}
              حفظ التغييرات
            </Button>
          </div>
          
          <div className="rounded-3xl border border-dashed border-border p-6 text-center">
            <p className="text-xs font-bold text-muted-foreground italic">
              آخر مزامنة ناجحة مع السيرفر: {new Date().toLocaleTimeString('ar-EG')}
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}