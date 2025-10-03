"use client";

// Imports
import Button from "@/ui/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { SpinnerMini } from "@/ui/Spinner";
import { useState } from "react";
import {
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 p-4 lg:p-6">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className=" p-8 ">
          {/* Header */}
          <div className="text-center mb-8">
            {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl mb-6 shadow-lg">
              <UserIcon className="w-8 h-8 text-secondary-0" />
            </div> */}
            <h1 className="text-3xl font-bold text-secondary-800 mb-2">
              ثبت‌نام
            </h1>
            <p className="text-secondary-500">
              حساب کاربری جدید خود را ایجاد کنید
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-1">
              <div className="relative">
                <input
                  {...register("name")}
                  type="text"
                  autoComplete="name"
                  id="name"
                  name="name"
                  placeholder="نام و نام خانوادگی"
                  className={`w-full pr-9 pl-4 py-3.5 rounded-xl bg-secondary-50 text-secondary-800 placeholder-secondary-500 border transition-all duration-200 focus:outline-none focus:ring-2 hover:border-primary-300 placeholder:text-sm placeholder:font-medium placeholder:text-secondary-400${
                    errors.name
                      ? "border-red-500 focus:ring-red-200"
                      : "border-secondary-200 focus:ring-primary-200 focus:border-primary-400"
                  }`}
                />
                {/* Icon + Label */}
                <div className="absolute inset-y-0 right-3 flex items-center gap-2 pointer-events-none text-secondary-500">
                  <UserIcon className="w-5 h-5" />
                  {/* <span className="text-sm font-medium">
                    نام و نام خانوادگی
                  </span> */}
                </div>
              </div>

              {/* Error Validation */}
              {errors.name && (
                <p className="text-red-500 text-xs flex items-center gap-1 mt-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  autoComplete="email"
                  id="email"
                  name="email"
                  dir="ltr"
                  className={`w-full pr-28 pl-4 py-3.5 rounded-xl bg-secondary-50 text-secondary-800 placeholder-transparent border transition-all duration-200 focus:outline-none focus:ring-2 hover:border-primary-300 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-200"
                      : "border-secondary-200 focus:ring-primary-200 focus:border-primary-400"
                  }`}
                />
                {/* Icon + Label */}
                <div className="absolute inset-y-0 right-3 flex items-center gap-2 pointer-events-none text-secondary-500">
                  <EnvelopeIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">ایمیل</span>
                </div>
              </div>

              {/* Error Validation */}
              {errors.email && (
                <p className="text-red-500 text-xs flex items-center gap-1 mt-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  autoComplete="new-password"
                  id="password"
                  name="password"
                  className={`w-full pr-28 pl-12 py-3.5 rounded-xl bg-secondary-50 text-secondary-800 placeholder-transparent border transition-all duration-200 focus:outline-none focus:ring-2 hover:border-primary-300 ${
                    errors.password
                      ? "border-red-500 focus:ring-red-200"
                      : "border-secondary-200 focus:ring-primary-200 focus:border-primary-400"
                  }`}
                />
                {/* Icon + Label */}
                <div className="absolute inset-y-0 right-3 flex items-center gap-2 pointer-events-none text-secondary-500">
                  <LockClosedIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">رمز عبور</span>
                </div>

                {/* Eye toggle */}
                <button
                  type="button"
                  className="absolute inset-y-0 left-3 flex items-center text-secondary-400 hover:text-secondary-600 transition-colors"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeIcon className="w-5 h-5" />
                  ) : (
                    <EyeSlashIcon className="w-5 h-5" />
                  )}
                </button>
              </div>

              {/* Error Validation */}
              {errors.password && (
                <p className="text-red-500 text-xs flex items-center gap-1 mt-2">
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2 text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              <input
                type="checkbox"
                id="conditions"
                name="conditions"
                className="w-4 h-4 text-primary-600 bg-secondary-50 border-secondary-300 rounded focus:ring-primary-500 focus:ring-2"
                required
              />
              <span className="text-secondary-600 leading-relaxed flex items-center gap-1">
                با{" "}
                <Link
                  href="/terms"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  شرایط و قوانین
                </Link>{" "}
                و{" "}
                <Link
                  href="/privacy"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  حریم خصوصی
                </Link>{" "}
                موافقم.
              </span>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              {isLoading ? (
                <div className="w-full bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl py-3.5 flex justify-center shadow-lg">
                  <SpinnerMini />
                </div>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3.5 text-base font-semibold bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  ایجاد حساب کاربری
                </Button>
              )}
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-secondary-0 text-secondary-500 font-medium">
                یا
              </span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-secondary-200 rounded-xl hover:bg-secondary-50 transition-all duration-200 group hover:border-primary-200 hover:shadow-md">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-secondary-700 font-medium">
                ثبت‌نام با Google
              </span>
            </button>
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <span className="text-secondary-500 text-sm">
              قبلاً حساب کاربری دارید؟{" "}
            </span>
            <Link
              href="/signin"
              className="text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors hover:underline"
            >
              ورود به حساب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
