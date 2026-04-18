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

const LoginForm = () => {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex min-h-screen flex-row-reverse bg-gradient-to-br from-indigo-50 to-slate-100">

      {/* image*/}
      <div className="hidden w-1/2 md:block">
        <img
          src="/auth_image2.jpeg"
          alt="login"
          className="h-screen w-full object-cover"
        />
      </div>

      {/* form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-6">

        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

          {/* title */}
          <h2 className="mb-2 text-center text-2xl font-bold text-blue-600">
            تسجيل الدخول
          </h2>

          <p className="mb-6 text-center text-sm text-gray-500">
            مرحبًا بعودتك سجّل الدخول إلى حسابك
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-left text-gray-700">
                      البريد الإلكتروني
                    </FormLabel>
                    <FormControl>
                      <Input
                        dir="ltr"
                        type="email"
                        placeholder="example@email.com"
                        {...field}
                        className="text-gray-700"
                      />
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
{/* 
              <p className="text-center text-sm text-gray-600">
                <Link
                  to="/forget-password"
                  className="font-medium text-blue-600 hover:underline"
                >
                  نسيت كلمة المرور؟
                </Link> 
              </p> */}

              {/* زر الدخول */}
              <Button className="w-full rounded-xl bg-blue-600 py-6 text-white transition hover:bg-blue-700">
                تسجيل الدخول
              </Button>
              <div className="flex flex-col gap-2">
                {/* رابط التسجيل */}
                <p className="text-center text-sm text-gray-600">
                  ليس لديك حساب؟{" "}
                  <Link
                    to="/register"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    إنشاء حساب
                  </Link>
                </p>
                <p className="text-center text-sm text-gray-600">
                  <Link
                    to="/forget_Pwd"
                    className="font-medium text-blue-600 hover:underline"
                  >
                    نسيت كلمة المرور؟
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;