import { useState } from "react"; // Added
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
import { useForm } from "react-hook-form";
import { Mail, Lock, ArrowLeft, Loader2 } from "lucide-react"; // Added Loader2
import { useNavigate } from "react-router-dom";
import { loginUser } from "@/features/auth/services/auth.services"; 
import { toast } from "sonner"; 
import { LoginValues } from "@/features/auth/types/auth.type";
const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginValues) => {
    setIsLoading(true);
    try {
      const response = await loginUser(data);
      toast.success("مرحباً بك مجدداً!");
      
      // Save token (Example)
      if (response.access) {
        localStorage.setItem("token", response.access);
      }

      // Redirect based on role or to dashboard
      navigate("/dashboard/instructor"); 
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || "فشل تسجيل الدخول، تأكد من البيانات";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" dir="rtl">
      {/* Image Section */}
      <div className="relative hidden lg:block">
        <img
          src="/auth_image2.jpeg"
          alt="تعلم القيادة"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Form Section */}
      <div className="flex items-center justify-center px-6 py-10 bg-background">
        <div className="w-full max-w-md">
          <div className="mb-8 text-right">
            <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
              تسجيل الدخول
            </h2>
            <p className="mt-2 text-muted-foreground font-medium">
              مرحبًا بعودتك، سجّل الدخول إلى حسابك
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                rules={{ 
                  required: "البريد الإلكتروني مطلوب",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "صيغة البريد الإلكتروني غير صحيحة"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
                        <Input
                          type="email"
                          placeholder="name@email.com"
                          {...field}
                          className="pr-10 h-12 rounded-xl border-border bg-muted/20 focus:bg-card"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-bold" />
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
                    <FormLabel className="font-bold">كلمة المرور</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="pr-10 h-12 rounded-xl border-border bg-muted/20 focus:bg-card"
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs font-bold" />
                  </FormItem>
                )}
              />

              {/* Action Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    تسجيل الدخول
                    <ArrowLeft className="mr-2 h-4 w-4" />
                  </>
                )}
              </Button>

              <div className="text-center text-sm text-muted-foreground font-medium pt-2">
                ليس لديك حساب؟{" "}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="text-primary hover:underline font-bold"
                >
                  إنشاء حساب
                </button>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/forget-password")}
                  className="text-sm font-bold text-muted-foreground hover:text-primary transition-colors"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;