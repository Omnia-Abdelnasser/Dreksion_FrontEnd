import { Button } from "@/shared/components/ui/button";
import { Form } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Link } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";
import { getLocationName } from "@/features/auth/services/locationApi";
const RegisterForm = () => {
  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      phone: "",
      license_image: "",
      password: "",
      gender: "",
      location: "",
     
      role: "trainee",

      license_degree: "",
      owns_car: false,
      can_drive_manual: false,
      can_drive_automatic: false,
    },
  });


  const role = useWatch({
    control: form.control,
    name: "role",
  });

  const gender = useWatch({
    control: form.control,
    name: "gender",
  });
  const handleGetLocation = () => {
  if (!navigator.geolocation) return;

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;

    const place = await getLocationName(latitude, longitude);

    form.setValue("location", place);
  });
};

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-indigo-50 to-slate-100">

  

      {/* Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center px-4 py-8 relative z-10">

        <div className="w-full max-w-lg rounded-[2rem] bg-white/90 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-white/50 relative overflow-hidden">

          {/*Title */}
          <h2 className="text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700 mb-2">
            إنشاء حساب جديد
          </h2>

          <p className="text-center text-sm text-gray-500 mb-8 font-medium">
            ابدأ رحلتك معنا 
          </p>

          <Form {...form}>
            <form className="space-y-4">

              <div className="flex gap-4">
                {/* First Name */}
                <Input
                  {...form.register("first_name")}
                  placeholder="الاسم الأول"
                  className="text-gray-900 placeholder:text-gray-400 w-1/2"
                />
                {/* Last Name */}
                <Input
                  {...form.register("last_name")}
                  placeholder="الاسم الأخير"
                  className="text-gray-900 placeholder:text-gray-400 w-1/2"
                />
              </div>

              {/* Phone */}
              <Input
                {...form.register("phone")}
                placeholder="رقم التليفون"
                className="text-gray-900 placeholder:text-gray-400"
              />

              {/* Password */}
              <Input
                {...form.register("password")}
                type="password"
                placeholder="كلمة المرور"
                className="text-gray-900 placeholder:text-gray-400"
              />

       <div className="relative">
  <Input
    {...form.register("location")}
    placeholder="اضغطي على تحديد الموقع"
    className="rounded-xl h-11 pr-32 text-gray-900"
  />

  <button
    type="button"
    onClick={handleGetLocation}
    className="absolute right-2 top-1/2 -translate-y-1/2 text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
  >
    📍 تحديد
  </button>
</div>
              {/* Role Toggle */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => form.setValue("role", "trainee")}
                  className={`w-1/2 py-2 rounded-lg border transition ${
                    role === "trainee"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700"
                  }`}
                >
                  متدرب
                </button>

                <button
                  type="button"
                  onClick={() => form.setValue("role", "instructor")}
                  className={`w-1/2 py-2 rounded-lg border transition ${
                    role === "instructor"
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700"
                  }`}
                >
                  مدرب
                </button>
              </div>

              {/* GENDER CHECKBOX STYLE */}
              <div className="flex gap-3">

                <button
                  type="button"
                  onClick={() => form.setValue("gender", "male")}
                  className={`w-1/2 py-2 rounded-lg border transition ${
                    gender === "male"
                      ? "bg-green-600 text-white border-green-600"
                      : "bg-white text-gray-700"
                  }`}
                >
                  ذكر
                </button>

                <button
                  type="button"
                  onClick={() => form.setValue("gender", "female")}
                  className={`w-1/2 py-2 rounded-lg border transition ${
                    gender === "female"
                      ? "bg-green-600 text-white border-green-500"
                      : "bg-white text-gray-700"
                  }`}
                >
                  أنثى
                </button>

              </div>

              {/* Instructor Fields */}
              {role === "instructor" && (
                <div className="space-y-4 border-t pt-4">

                  {/* License Image */}
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">صورة الرخصة</label>
                    <Input
                      {...form.register("license_image")}
                      type="file"
                      accept="image/*"
                      className="text-gray-900"
                    />
                  </div>

                  {/* License Degree */}
                  <Input
                    {...form.register("license_degree")}
                    placeholder="درجة الرخصة"
                    className="text-gray-900 placeholder:text-gray-400"
                  />

                  {/* Checklist */}
                  <div className="space-y-2 pt-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        {...form.register("owns_car")}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 text-sm">أمتلك سيارة</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        {...form.register("can_drive_manual")}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 text-sm">بعرف أسوق مانيوال</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        {...form.register("can_drive_automatic")}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-gray-800 text-sm">بعرف أسوق أوتوماتيك</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Button */}
              <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 mt-6 py-6 text-white text-[15px] font-bold rounded-2xl shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.01] transition-all duration-300">
                إنشاء الحساب
              </Button>

              {/* LOGIN LINK */}
              <p className="text-center text-sm text-gray-600">
                لديك حساب؟{" "}
                <Link to="/" className="text-blue-600 font-medium">
                  تسجيل الدخول
                </Link>
              </p>

            </form>
          </Form>

        </div>
      </div>

          {/* Image */}
      <div className="hidden md:block w-1/2 relative">
        <img
          src="/auth_image2.jpeg"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
            {/* image*/}
      {/* <div className="hidden w-1/2 md:block">
        <img
          src="/auth_image2.jpeg"
          alt="login"
          className="h-full w-full object-cover "
        />
      </div> */}
    </div>
  );
};

export default RegisterForm;