"use client";

// Imports
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { SpinnerMini } from "@/ui/Spinner";

// Form validation
const schema = yup
  .object({
    name: yup
      .string()
      .min(5, "حداقل باید ۵ کاراکتر باشد")
      .max(30, "حداکثر باید ۳۰ کاراکتر باشد")
      .required("نام و نام خانوادگی الزامی است"),
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
  })
  .required();

function Signup() {
  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // Submit Form
  const { signup } = useAuth();
  const onSubmit = async (values) => {
    await signup(values);
  };
  // UI
  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6 md:mb-10 ">
        ثبت نام
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <RHFTextField
          label="نام و نام خانوادگی"
          name="name"
          register={register}
          isRequired
          errors={errors}
        />
        <RHFTextField
          label="ایمیل"
          name="email"
          register={register}
          dir="ltr"
          isRequired
          errors={errors}
        />
        <RHFTextField
          label="پسورد"
          name="password"
          register={register}
          type="password"
          dir="ltr"
          isRequired
          errors={errors}
        />
        <div className="flex items-center justify-center">
          {isLoading ? (
            <SpinnerMini />
          ) : (
            <Button type="submit" variant="primary" className="w-full">
              تایید
            </Button>
          )}
        </div>
        {/* Go signin */}
        <div className="flex  items-center justify-center gap-x-3 text-xs">
          <span className="text-muted-foreground text-secondary-400">
            قبلا ثبت نام کردید؟
          </span>
          <Link
            href="/signin"
            className="text-secondary-500 font-medium hover:underline transition-all duration-200 focus:text-primary-900"
          >
            ورود به حساب کاربری
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
