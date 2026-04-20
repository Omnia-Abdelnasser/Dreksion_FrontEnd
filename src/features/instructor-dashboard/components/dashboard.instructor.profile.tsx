import { Camera, CheckCircle2, Save, X, Loader2, MapPin, User, Phone, Mail } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Badge } from "@/shared/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { toast } from "sonner";
import { getInstructorProfile, updateInstructorProfile } from "../services/instructor-services";
import { InstructorProfileData } from "../types/instructor-types";

export function InstructorProfile() {
  const queryClient = useQueryClient();

  // 1. Fetch Profile Data
  const { data: profile, isLoading } = useQuery<InstructorProfileData>({
    queryKey: ['instructor-profile'],
    queryFn: getInstructorProfile,
  });

  // 2. Update Profile Mutation
  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (data: any) => updateInstructorProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['instructor-profile'] });
      toast.success("Profile updated successfully");
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || "Failed to update profile");
    }
  });

  // 3. The handleSubmit function you asked about
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const updatedData: any = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      nationalId: formData.get("nationalId"),
      details: {
        bio: formData.get("bio"),
        carModel: formData.get("carModel"),
        transmission: formData.get("transmission"),
        pricePerHour: Number(formData.get("pricePerHour")),
        sessionDuration: formData.get("sessionDuration"),
      }
    };

    updateProfile(updatedData);
  };

  if (isLoading) return (
    <div className="flex h-[500px] items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
      <div>
        <h1 className="text-2xl font-bold text-foreground italic">الملف الشخصي</h1>
        <p className="font-medium text-muted-foreground">إدارة معلوماتك الشخصية وتفاصيل السيارة</p>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex flex-col items-center gap-6 border-b border-border pb-8 sm:flex-row sm:items-start">
          <div className="relative group">
            <Avatar className="h-28 w-28 border-4 border-background shadow-xl">
              <AvatarImage src={profile?.avatarUrl} />
              <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                {profile?.firstName?.[0]}
              </AvatarFallback>
            </Avatar>
            <button type="button" className="absolute bottom-1 left-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground border-2 border-background shadow-lg">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          
          <div className="flex-1 text-center sm:text-right pt-2">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <h2 className="text-2xl font-black text-foreground">{profile?.firstName} {profile?.lastName}</h2>
              {profile?.isVerified && (
                <Badge className="gap-1 bg-green-500/10 text-green-600 border-green-200 py-1 px-3 rounded-lg font-bold">
                  <CheckCircle2 className="h-3.5 w-3.5" /> معتمد
                </Badge>
              )}
            </div>
            <p className="mt-2 text-sm font-bold text-muted-foreground">مدرب · انضم في {profile?.joinedDate}</p>
          </div>
        </div>

        <div className="grid gap-6 pt-8 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-bold text-xs flex items-center gap-2"><User className="h-3 w-3" /> الاسم الأول</Label>
            <Input name="firstName" defaultValue={profile?.firstName} className="rounded-xl bg-muted/20" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs flex items-center gap-2"><User className="h-3 w-3" /> الاسم الأخير</Label>
            <Input name="lastName" defaultValue={profile?.lastName} className="rounded-xl bg-muted/20" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs flex items-center gap-2"><Phone className="h-3 w-3" /> رقم الهاتف</Label>
            <Input name="phone" defaultValue={profile?.phone} className="rounded-xl bg-muted/20" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs flex items-center gap-2"><MapPin className="h-3 w-3" /> الموقع</Label>
            <Input name="location" defaultValue={profile?.location} className="rounded-xl bg-muted/20" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs">الرقم القومي</Label>
            <Input name="nationalId" defaultValue={profile?.nationalId} className="rounded-xl bg-muted/20" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <Label className="font-bold text-xs">نبذة عنك (Bio)</Label>
            <Textarea name="bio" defaultValue={profile?.details?.bio} rows={3} className="rounded-xl bg-muted/20" />
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-bold border-b pb-4">السيارة والأسعار</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="font-bold text-xs">طراز السيارة</Label>
            <Input name="carModel" defaultValue={profile?.details?.carModel} className="rounded-xl bg-muted/20" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs">ناقل الحركة</Label>
            <Select name="transmission" defaultValue={profile?.details?.transmission}>
              <SelectTrigger className="rounded-xl bg-muted/20 font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="font-bold">
                <SelectItem value="automatic">أوتوماتيك</SelectItem>
                <SelectItem value="manual">مانيوال</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs">سعر الحصة (ج.م)</Label>
            <Input name="pricePerHour" type="number" defaultValue={profile?.details?.pricePerHour} className="rounded-xl bg-muted/20" />
          </div>
          <div className="space-y-2">
            <Label className="font-bold text-xs">مدة الحصة</Label>
            <Select name="sessionDuration" defaultValue={profile?.details?.sessionDuration}>
              <SelectTrigger className="rounded-xl bg-muted/20 font-bold">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="font-bold">
                <SelectItem value="1">ساعة</SelectItem>
                <SelectItem value="1.5">ساعة ونصف</SelectItem>
                <SelectItem value="2">ساعتان</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pb-6">
        <Button type="button" variant="ghost" className="rounded-xl font-bold">إلغاء</Button>
        <Button disabled={isUpdating} type="submit" className="rounded-xl font-bold px-8 shadow-md">
          {isUpdating ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : <Save className="h-4 w-4 ml-2" />}
          حفظ التغييرات
        </Button>
      </div>
    </form>
  );
}