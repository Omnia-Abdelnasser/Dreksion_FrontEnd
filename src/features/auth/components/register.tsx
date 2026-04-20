import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useForm, useWatch } from "react-hook-form";
import { Phone, Lock, MapPin, User, ArrowLeft, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { getLocationName } from "@/features/auth/services/location-api";
import { useRegister } from "@/features/auth/hooks/auth.hook";
import { RegisterValues } from "@/features/auth/types/auth.type";
const RegisterForm = ({ onSwitch: _onSwitch }: { onSwitch?: () => void }) => {
  const [loadingLocation, setLoadingLocation] = useState(false);
    const { mutate} = useRegister();
  const navigate = useNavigate();
  const form = useForm<RegisterValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      gender: "",
      role: "trainee",
      location: "",
      nationalId: "",
      licenseNumber: "",
      // profileImage: undefined,
      // licenseImage: undefined,

      details: {
        haveAcar: false,
        carType: [],
      },
    },
  });

const buildFormData = (data: any) => {
  const formData = new FormData();

  formData.append("firstName", data.firstName);
  formData.append("lastName", data.lastName);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("password", data.password);
  formData.append("gender", data.gender);
  formData.append("role", data.role);

  if (data.location) {
  formData.append(
    "location",
    JSON.stringify(data.location)
  );
}
  if (data.nationalId) formData.append("nationalId", data.nationalId);
  if (data.licenseNumber) formData.append("licenseNumber", data.licenseNumber);

  if (data.profileImage)
    formData.append("profileImage", data.profileImage);

  if (data.licenseImage)
    formData.append("licenseImage", data.licenseImage);

  formData.append("details", JSON.stringify(data.details));

  return formData;
};

const onSubmit = (data: any) => {
  const formData = buildFormData(data);

  mutate(formData, {
    onSuccess: (res: any) => {
      toast.success(res?.message || "تم إنشاء الحساب بنجاح");

      console.log("registered email:", res?.email);

      form.reset();

      navigate("/confirmEmail", {
        state: {
          email: res?.email, 
        },
      });
    },

    onError: (err: any) => {
      toast.error(
        err?.response?.data?.message || "حدث خطأ أثناء إنشاء الحساب"
      );
    },
  });
};
  const role = useWatch({ control: form.control, name: "role" });
  const gender = useWatch({ control: form.control, name: "gender" });

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast.error("المتصفح لا يدعم تحديد الموقع");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lon = pos.coords.longitude;

          const locationName = await getLocationName(lat, lon);

          form.setValue("location", locationName);
          toast.success("تم تحديد الموقع");
        } catch {
          toast.error("فشل جلب اسم المكان");
        } finally {
          setLoadingLocation(false);
        }
      },
      () => {
        toast.error("تعذر الوصول للموقع");
        setLoadingLocation(false);
      }
    );
  };

 
  return (
    <div className="min-h-screen grid lg:grid-cols-2" dir="rtl">

      {/* FORM */}
      <div className="flex items-center justify-center px-6 py-10 order-2 lg:order-1">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-extrabold mb-2">
            إنشاء حساب جديد
          </h2>
          <p className="text-muted-foreground mb-6">
            ابدأ رحلتك معنا اليوم
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

              {/* name */}
              <div className="grid grid-cols-2 gap-3">
                <FormField control={form.control} name="firstName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الأول</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-11" />
                    </FormControl>
                  </FormItem>
                )} />

                <FormField control={form.control} name="lastName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>الاسم الأخير</FormLabel>
                    <FormControl>
                      <Input {...field} className="h-11" />
                    </FormControl>
                  </FormItem>
                )} />
              </div>

              {/* phone */}
              <FormField control={form.control} name="phone" render={({ field }) => (
                <FormItem>
                  <FormLabel>الهاتف</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                      <Input dir="ltr" {...field} className="pr-10 h-11" />
                    </div>
                  </FormControl>
                </FormItem>
              )} />

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                rules={{ required: "البريد الإلكتروني مطلوب" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
                        <Input
                          type="email"
                          placeholder="name@email.com"
                          {...field}
                          className="pr-10 h-12"
                        />
                      </div>
                    </FormControl>
                    < FormMessage />
                  </FormItem>
                )}
              />

                            {/* Password */}
                            <FormField
                              control={form.control}
                              name="password"
                              rules={{ required: "كلمة المرور مطلوبة" }}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>كلمة المرور</FormLabel>
                                  <FormControl>
                                    <div className="relative">
                                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
                                      <Input
                                        type="password"
                                        placeholder="••••••••"
                                        {...field}
                                        className="pr-10 h-12"
                                      />
                                    </div>
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

              {/* location */}
              <FormField control={form.control} name="location" render={({ field }) => (
                <FormItem>
                  <FormLabel>الموقع</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <div className="relative flex-1">
                        <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4" />
                        <Input {...field} className="pr-10 h-11" />
                      </div>
                    </FormControl>

                    <Button
                      type="button"
                      onClick={handleGetLocation}
                      disabled={loadingLocation}
                    >
                      📍
                    </Button>
                  </div>
                </FormItem>
              )} />

{/* nationalId */}
<FormField
  control={form.control}
  name="nationalId"
  render={({ field }) => (
    <FormItem>
      <FormLabel>الرقم القومي</FormLabel>

      <FormControl>
        <div className="relative">
          <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />

          <Input
            {...field}
            placeholder="أدخل الرقم القومي"
            className="pr-10 h-12"
            dir="rtl"
          />
        </div>
      </FormControl>

      <FormMessage />
    </FormItem>
  )}
/>


              {/* role */}
              <div>
                <p className="flex items-center gap-2 mb-2">
                  <User className="h-4 w-4" /> نوع الحساب
                </p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => form.setValue("role", "trainee")}
                    className={`w-1/2 py-2 rounded-lg border ${
                      role === "trainee" ? "bg-primary text-white" : ""
                    }`}
                  >
                    متدرب
                  </button>

                  <button
                    type="button"
                    onClick={() => form.setValue("role", "instructor")}
                    className={`w-1/2 py-2 rounded-lg border ${
                      role === "instructor" ? "bg-primary text-white" : ""
                    }`}
                  >
                    مدرب
                  </button>
                </div>
              </div>

              {/* gender */}
              <div>
                <p className="mb-2">النوع</p>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => form.setValue("gender", "male")}
                    className={`w-1/2 py-2 border rounded-lg ${
                      gender === "male" ? "bg-accent text-white" : ""
                    }`}
                  >
                    ذكر
                  </button>

                  <button
                    type="button"
                    onClick={() => form.setValue("gender", "female")}
                    className={`w-1/2 py-2 border rounded-lg ${
                      gender === "female" ? "bg-accent text-white" : ""
                    }`}
                  >
                    أنثى
                  </button>
                </div>
              </div>

              {/* instructor ONLY */}
              {role === "instructor" && (
                <div className="space-y-4 p-4 border rounded-xl bg-muted/20">

                  <FormField control={form.control} name="licenseImage" render={({ field }) => (
                    <FormItem>
                      <FormLabel>صورة الرخصة</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={(e) =>
                           field.onChange(e.target.files?.[0]
                            )
                          }
                        />
                      </FormControl>
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="licenseNumber" render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الرخصة</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )} />

                  {[
                    { name: "owns_car", label: "أمتلك سيارة" },
                    { name: "can_drive_manual", label: "مانيوال" },
                    { name: "can_drive_automatic", label: "أوتوماتيك" },
                  ].map((item) => (
                    <FormField
                      key={item.name}
                      control={form.control}
                      name={item.name as any}
                      render={({ field }) => (
                        <FormItem className="flex items-center gap-2">
                          <FormControl>
                            <Checkbox
                              checked={field.value as boolean}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel>{item.label}</FormLabel>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              )}

              {/* submit */}
              <Button type="submit" className="w-full h-12">
                إنشاء الحساب
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
              {/* switch to login */}
              <p className="text-center text-sm text-muted-foreground">
                لديك حساب؟{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  تسجيل الدخول
                </Link>
              </p>

            </form>
          </Form>
        </div>
      </div>

      {/* IMAGE */}
      <div className="relative hidden lg:block">
        <img
          src="/auth_image2.jpeg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

    </div>
  );
};

export default RegisterForm;