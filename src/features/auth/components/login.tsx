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
import { Mail, Lock, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

type LoginValues = { email: string; password: string };

const LoginForm = ({ onSwitch }: { onSwitch?: () => void }) => {
  const form = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginValues) => {
    console.log(data);
  };
const navigate = useNavigate();
  return (
    <div className="min-h-screen grid lg:grid-cols-2" dir="rtl">

      {/*  Image */}
      <div className="relative h-56 lg:h-auto">
        <img
          src="/auth_image2.jpeg"
          alt="تعلم القيادة"
          className="w-full h-full object-cover"
        />
      <div className="absolute inset-0 bg-black/40" />

     
      </div>
     

      {/*  Form */}
      <div className="flex items-center justify-center px-6 py-10 bg-background">
        <div className="w-full max-w-md">

          <div className="mb-8 text-right">
            <h2 className="text-3xl font-extrabold text-foreground">
              تسجيل الدخول
            </h2>
            <p className="mt-2 text-muted-foreground">
              مرحبًا بعودتك، سجّل الدخول إلى حسابك
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

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
                    <FormMessage />
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

              {/* Button */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl"
              >
                تسجيل الدخول
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>

              {/* Switch */}
              <div className="text-center text-sm text-muted-foreground">
                ليس لديك حساب؟{" "}
               
                <button
                  type="button"
                 onClick={()=>navigate("/register")}
                  className="text-primary hover:underline font-semibold"
                >
                  إنشاء حساب
                </button>
             
              </div>

              {/* Forgot */}
              <div className="text-center">
                <a
                  href="/forget_Pwd"
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  نسيت كلمة المرور؟
                </a>
              </div>

            </form>
          </Form>
        </div>
      </div>

    </div>
  );
};

export default LoginForm;