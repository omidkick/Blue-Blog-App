"use client";

// Imports
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import RHFTextField from "@/ui/RHFTextField";
import Button from "@/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { SpinnerMini } from "@/ui/Spinner";
import {
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import SignInSlider from "./SignInSlider";

// Form validation
const schema = yup
  .object({
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
    password: yup.string().required("رمز عبور الزامی است"),
  })
  .required();

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

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
  const onSubmit = async (values) => {
    await signin(values);
  };

  // UI
  return (
    <div className="min-h-screen flex overflow-hidden lg:mx-auto lg:max-w-screen-2xl">
      {/* Right Side - Image Slider */}
      <SignInSlider />

      {/* Left Side - Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center bg-secondary-0 p-6">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-8">
            {/* <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-2xl mb-6">
              <svg
                className="w-7 h-7 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div> */}
            <h1 className="text-2xl font-bold text-secondary-800 mb-2">ورود</h1>
            <p className="text-secondary-500 text-sm">
              به حساب کاربری خود وارد شوید
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-1">
              <div className="relative">
                <input
                  {...register("email")}
                  type="email"
                  dir="ltr"
                  className={`w-full pr-28 pl-10 py-3 rounded-xl bg-secondary-50 text-secondary-800 placeholder-transparent border transition-all duration-200 focus:outline-none focus:ring-1 hover:border-primary-700 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-secondary-200"
                  }`}
                />
                {/* Icon + Label */}
                <div className="absolute inset-y-0 right-3 flex items-center gap-2 pointer-events-none text-secondary-500">
                  <EnvelopeIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">ایمیل</span>
                </div>
              </div>

              {/* Error Validation */}
              {errors.email && (
                <p className="text-red-500 text-xs flex items-center gap-1 mt-1 lg:mt-2">
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
                  </svg>{" "}
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1 mt-4">
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  dir="ltr"
                  className={`w-full pr-28 pl-10 py-3 rounded-xl bg-secondary-50 text-secondary-800 placeholder-transparent border transition-all duration-200 focus:outline-none focus:ring-1 hover:border-primary-700  ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-secondary-200"
                  }`}
                />
                {/* Icon + Label */}
                <div className="absolute inset-y-0 right-3 flex items-center gap-2 pointer-events-none text-secondary-500">
                  <LockClosedIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">رمز عبور</span>
                </div>

                {/* Eye toggle */}
                <button
                  type="button"
                  className="absolute inset-y-0 left-3 flex items-center text-secondary-400"
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
                <p className="text-red-500 text-xs flex items-center gap-1 mt-1 lg:mt-2">
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
                  </svg>{" "}
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-600 bg-secondary-50 border-secondary-300 rounded focus:ring-primary-500 focus:ring-2"
                />
                <span className="text-secondary-600">مرا به خاطر بسپار</span>
              </label>
              <Link
                href="/forget-password"
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
              >
                فراموشی رمز عبور؟
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              {isLoading ? (
                <div className="w-full bg-primary-600 rounded-xl py-3 flex justify-center">
                  <SpinnerMini />
                </div>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full py-3 text-base font-medium bg-primary-600 hover:bg-primary-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  ورود
                </Button>
              )}
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-secondary-0 text-secondary-500">یا</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-3 mb-6">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-secondary-200 rounded-xl hover:bg-secondary-50 transition-all duration-200 group">
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
              <span className="text-secondary-700 font-medium text-sm">
                ادامه با Google
              </span>
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center space-y-2">
            <span className="text-secondary-500 text-sm">
              حساب کاربری ندارید؟{" "}
            </span>
            <Link
              href="/signup"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
            >
              ثبت‌نام کنید
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
