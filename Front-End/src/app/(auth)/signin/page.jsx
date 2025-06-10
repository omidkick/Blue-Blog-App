"use client";

// Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RHFTextField from "@/ui/RHFTextField";
import Button from "@/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { SpinnerMini } from "@/ui/Spinner";

// Form validation
const schema = yup
  .object({
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
  })
  .required();

function Signin() {
  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { signin } = useAuth();

  // onSubmit Form
  const router = useRouter();
  const onSubmit = async (values) => {
    await signin(values);
  };

  // UI
  return (
    <div className="">
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-4 md:mb-10">
        ورود
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
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

        <div className=" flex  items-center justify-center gap-x-3 text-xs">
          <span className="text-muted-foreground text-secondary-400">
            حساب کاربری ندارید؟
          </span>
          <Link
            href="/signup"
            className="text-secondary-500 font-medium hover:underline transition-all duration-200 focus:text-primary-900 "
          >
            ثبت‌نام کنید
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Signin;
