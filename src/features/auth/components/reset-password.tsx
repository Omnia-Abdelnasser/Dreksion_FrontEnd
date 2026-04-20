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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Lock, ShieldCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type ResetValues = {
  otp: string;
  password: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const form = useForm<ResetValues>({
    defaultValues: { otp: "", password: "", confirmPassword: "" },
  });

  const onSubmit = (data: ResetValues) => {
    if (data.password !== data.confirmPassword) {
      toast.error("كلمتا المرور غير متطابقتين");
      return;
    }
    console.log(data);
    toast.success("تم إعادة تعيين كلمة المرور بنجاح");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" dir="rtl">

      {/* Image */}
      <div className="relative hidden lg:block">
        <img
          src="/auth_image2.jpeg"
          alt="reset-password"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

     
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center px-6 py-10 bg-background">
        <div className="w-full max-w-md">

          <div className="mb-8 text-right">
            <h2 className="text-3xl font-extrabold">
              إعادة تعيين كلمة المرور
            </h2>
            <p className="mt-2 text-muted-foreground">
              أدخل رمز التحقق وكلمة المرور الجديدة
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* OTP */}
              <FormField
                control={form.control}
                name="otp"
                rules={{ required: "رمز التحقق مطلوب" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      رمز التحقق
                    </FormLabel>

                    <FormControl>
                      <div dir="ltr" className="flex justify-center">
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <InputOTPGroup className="gap-2">
                            {[0, 1, 2, 3, 4, 5].map((i) => (
                              <InputOTPSlot
                                key={i}
                                index={i}
                                className="h-12 w-12 rounded-lg border bg-input text-center text-lg font-bold"
                              />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PASSWORD */}
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
                          dir="rtl"
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="pr-10 h-12 bg-input border-border"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* CONFIRM PASSWORD */}
              <FormField
                control={form.control}
                name="confirmPassword"
                rules={{ required: "تأكيد كلمة المرور مطلوب" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>تأكيد كلمة المرور</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/70" />
                        <Input
                          type="password"
                          placeholder="••••••••"
                          {...field}
                          className="pr-10 h-12 bg-input border-border"
                        />
                      </div>
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* BUTTON */}
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl">
                إعادة تعيين كلمة المرور
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>

              {/* BACK */}
              <p className="text-center text-sm text-muted-foreground">
                تذكّرت كلمة المرور؟{" "}
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
    </div>
  );
};

export default ResetPasswordForm;