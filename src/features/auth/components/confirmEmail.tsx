import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ShieldCheck, MailCheck, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

type ConfirmEmailValues = {
  otp: string;
};

const ConfirmEmailForm = () => {
  const form = useForm<ConfirmEmailValues>({
    defaultValues: { otp: "" },
  });

  const onSubmit = (data: ConfirmEmailValues) => {
    console.log(data);
    toast.success("تم تأكيد البريد الإلكتروني بنجاح");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" dir="rtl">
      
      {/* IMAGE */}
      <div className="relative hidden lg:block">
        <img
          src="/auth_image2.jpeg"
          alt="confirm-email"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center px-6 py-10 bg-background">
        <div className="w-full max-w-md">

          <div className="mb-8 text-right">
            <h2 className="text-3xl font-extrabold flex items-center gap-2">
              <MailCheck className="h-6 w-6 text-primary" />
              تأكيد البريد الإلكتروني
            </h2>
            <p className="mt-2 text-muted-foreground">
              أدخل رمز التحقق المرسل إلى بريدك الإلكتروني
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

              {/* BUTTON */}
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl">
                تأكيد البريد الإلكتروني
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>

              {/* RESEND */}
              <p className="text-center text-sm text-muted-foreground">
                لم يصلك الكود؟{" "}
                <button
                  type="button"
                  onClick={() => toast.info("تم إرسال كود جديد")}
                  className="text-primary font-semibold hover:underline"
                >
                  إعادة الإرسال
                </button>
              </p>

              {/* BACK */}
              <p className="text-center text-sm text-muted-foreground">
                العودة إلى{" "}
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

export default ConfirmEmailForm;