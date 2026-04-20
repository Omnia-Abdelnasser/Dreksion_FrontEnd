import { useState } from "react";
import { Camera, Loader2, Save, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { toast } from "sonner";

// Internal service imports
import { getStudentProfile, updateStudentProfile } from "../services/student-services";

/**
 * Student Profile Component
 * Viewing and updating profile data with Arabic content and project default styles
 */
export function StudentProfile() {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  // 1. Fetch Profile Data
  const { data, isLoading } = useQuery({
    queryKey: ['student-profile'],
    queryFn: getStudentProfile,
  });

  // Local Type Casting for flexibility
  const profile = data as any;

  // 2. Update Mutation Logic
  const updateMutation = useMutation({
    mutationFn: updateStudentProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-profile'] });
      toast.success("تم تحديث البيانات بنجاح");
      setIsEditing(false);
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "فشل في تحديث الملف الشخصي");
    }
  });

  // Handle Form Submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const payload = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
    };

    updateMutation.mutate(payload);
  };

  if (isLoading) return (
    <div className="flex h-[400px] items-center justify-center">
      <Loader2 className="animate-spin h-10 w-10 text-primary" />
    </div>
  );

  return (
    <div className="space-y-6" dir="rtl">
      {/* Page Header */}
      <div className="text-right flex flex-col gap-1">
        <h1 className="text-3xl font-black italic tracking-tight text-foreground uppercase tracking-widest">
          الملف الشخصي
        </h1>
        <p className="font-bold text-muted-foreground italic text-sm">
          إدارة إعدادات الحساب والمعلومات الشخصية
        </p>
      </div>

      <div className="rounded-[2.5rem] border border-border bg-card p-8 shadow-sm overflow-hidden">
        <form onSubmit={handleSubmit}>
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-6 border-b border-border pb-8 sm:flex-row sm:justify-start">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-primary/10 transition-transform group-hover:scale-105">
                <AvatarImage src={profile?.profileImage} alt="Profile" />
                <AvatarFallback className="bg-primary/5 text-primary text-3xl font-black italic">
                  {profile?.firstName?.[0]}
                </AvatarFallback>
              </Avatar>
              
              <label className="absolute bottom-1 left-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-xl hover:bg-primary/90 transition-all hover:scale-110">
                <Camera className="h-5 w-5" />
                <input type="file" className="hidden" accept="image/*" />
              </label>
            </div>
            
            <div className="text-center sm:text-right">
              <h2 className="text-2xl font-black italic tracking-tight">
                {profile?.firstName} {profile?.lastName}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-2 justify-center sm:justify-start">
                <Badge variant="secondary" className="font-black px-4 py-1 rounded-lg italic bg-primary/10 text-primary border-none">متدرب نشط</Badge>
                <span className="text-[10px] text-muted-foreground font-black uppercase tracking-widest italic bg-muted px-2 py-1 rounded">
                   عضو منذ 2026
                </span>
              </div>
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid gap-6 pt-8 md:grid-cols-2">
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase pr-1 italic text-primary text-right block">الاسم الأول</Label>
              <Input 
                name="firstName" 
                defaultValue={profile?.firstName} 
                className="rounded-2xl border-muted bg-muted/20 font-bold focus:ring-primary h-12"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="font-black text-xs uppercase pr-1 italic text-primary text-right block">اسم العائلة</Label>
              <Input 
                name="lastName" 
                defaultValue={profile?.lastName} 
                className="rounded-2xl border-muted bg-muted/20 font-bold h-12 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-black text-xs uppercase pr-1 italic text-muted-foreground text-right block">الرقم القومي</Label>
              <Input 
                defaultValue={profile?.nationalId || "298XXXXXXXXXXX"} 
                disabled 
                className="rounded-2xl bg-muted/50 font-bold opacity-70 cursor-not-allowed h-12"
              />
              <p className="text-[10px] text-muted-foreground font-bold italic px-1 text-right">
                * لا يمكن تعديل بيانات التوثيق
              </p>
            </div>

            <div className="space-y-2">
              <Label className="font-black text-xs uppercase pr-1 italic text-muted-foreground text-right block">البريد الإلكتروني</Label>
              <Input 
                defaultValue={profile?.email} 
                disabled 
                className="rounded-2xl bg-muted/50 font-bold opacity-70 cursor-not-allowed h-12"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-black text-xs uppercase pr-1 italic text-primary text-right block">رقم الهاتف</Label>
              <Input 
                name="phone" 
                defaultValue={profile?.phone} 
                className="rounded-2xl border-muted bg-muted/20 font-bold h-12 focus:ring-primary"
              />
            </div>

            <div className="space-y-2">
              <Label className="font-black text-xs uppercase pr-1 italic text-primary text-right block">الموقع / المدينة</Label>
              <Input 
                name="address" 
                defaultValue="المعادي، القاهرة" 
                className="rounded-2xl border-muted bg-muted/20 font-bold h-12 focus:ring-primary"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-10 flex flex-wrap justify-end gap-3 border-t border-border pt-6">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsEditing(false)}
              className="rounded-2xl font-black px-10 border-primary/20 text-primary hover:bg-primary/5 transition-colors"
            >
              <X className="ml-2 h-4 w-4" /> إلغاء
            </Button>
            
            <Button 
              type="submit" 
              disabled={updateMutation.isPending} 
              className="rounded-2xl font-black px-10 shadow-xl bg-primary shadow-primary/20 hover:scale-[1.02] transition-all"
            >
              {updateMutation.isPending ? (
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="ml-2 h-4 w-4" />
              )}
              حفظ التغييرات
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}