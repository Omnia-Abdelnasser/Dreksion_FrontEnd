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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ForgetPasswordForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Password reset request:", data);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2" dir="rtl">

      {/* IMAGE  */}
      <div className="relative hidden lg:block ">
        <img
          src="/auth_image2.jpeg"
          alt="forget-password"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* <div className="absolute bottom-6 right-6 text-white max-w-sm">
          <h2 className="text-2xl font-bold mb-2">
            استرجاع كلمة المرور 
          </h2>
          <p className="text-sm text-white/80">
            أدخل بريدك لإعادة تعيين كلمة المرور بسهولة
          </p>
        </div> */}
      </div>

      {/* FORM */}
      <div className="flex items-center justify-center px-6 py-10 bg-background order-1">
        <div className="w-full max-w-md">

          <div className="mb-8 text-right">
            <h2 className="text-3xl font-extrabold text-foreground">
              نسيت كلمة المرور
            </h2>
            <p className="mt-2 text-muted-foreground">
              أدخل بريدك لإرسال رابط إعادة التعيين
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* EMAIL */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>البريد الإلكتروني</FormLabel>
                    <FormControl>
                      <Input
                        dir="rtl"
                        type="email"
                        placeholder="name@email.com"
                        {...field}
                        className="h-12 bg-input border-border focus-visible:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* BUTTON */}
              <Button
                type="submit"
                className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl"
              >
                إرسال رابط إعادة التعيين
              </Button>

              {/* BACK LINK */}
              <p className="text-center text-sm text-muted-foreground">
                تذكّرت كلمة المرور؟{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  العودة لتسجيل الدخول
                </Link>
              </p>

            </form>
          </Form>

        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordForm;