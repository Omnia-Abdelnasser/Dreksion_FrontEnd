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
  InputOTPSeparator,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";



const ResetPasswordForm = () => {
  const form = useForm({
    defaultValues: {
        otp: "",
        password: "",
        confirmPassword: "",
    },
})

  return (
    <div className="flex min-h-screen flex-row-reverse">
      {/* image */}
      <div className="hidden w-1/2 md:block">
        <img
          src="/auth_image2.jpeg"
          alt="reset-password"
          className="h-screen w-full object-cover"
        />
      </div>

      {/* form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h2 className="mb-2 text-center text-2xl font-bold text-blue-600">
            إعادة تعيين كلمة المرور
          </h2>

          <p className="mb-6 text-center text-sm text-gray-500">
            أدخل رمز التحقق وكلمة المرور الجديدة
          </p>

          <Form {...form}>
            <form
           
              className="space-y-5"
            >
              {/* OTP */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">
                      رمز التحقق
                    </FormLabel>
<FormControl>
  <InputOTP
    maxLength={6}
    value={field.value}
    onChange={field.onChange}
    containerClassName="flex justify-center"
  >
    <InputOTPGroup className="grid grid-cols-6 gap-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <InputOTPSlot
          key={i}
          index={i}
          className="
            h-12 w-12
            text-lg font-semibold text-gray-800
            rounded-xl
            border border-gray-300
            bg-white
            shadow-sm
            transition-all
            focus:border-blue-500
            focus:ring-2 focus:ring-blue-200
            data-[active=true]:border-blue-600
            data-[active=true]:ring-2 data-[active=true]:ring-blue-300
          "
        />
      ))}
    </InputOTPGroup>
  </InputOTP>
</FormControl>
 <FormMessage />
</FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left text-gray-700">
                      كلمة المرور
                    </FormLabel>
                    <FormControl>
                      <Input
                        dir="ltr"
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="text-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

                   {/*  confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left text-gray-700">
                      تأكيد كلمة المرور
                    </FormLabel>
                    <FormControl>
                      <Input
                        dir="ltr"
                        type="password"
                        placeholder="••••••••"
                        {...field}
                        className="text-gray-700"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit */}
              <Button
                type="submit"
                className="w-full rounded-xl bg-blue-600 py-6 text-white hover:bg-blue-700"
              >
                إعادة تعيين كلمة المرور
              </Button>

              <p className="text-center text-sm text-gray-600">
                تذكّرت كلمة المرور؟{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:underline"
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