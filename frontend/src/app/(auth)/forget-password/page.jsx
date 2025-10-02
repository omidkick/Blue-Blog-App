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
import { SpinnerMini } from "@/ui/Spinner";
import {
  EnvelopeIcon,
  ArrowRightIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import SignInSlider from "../signin/_components/SignInSlider";

// Form validation
const schema = yup
  .object({
    email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  })
  .required();

function ForgotPassword() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // RHF
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  // onSubmit Form
  const onSubmit = async (values) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  // Success View
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex overflow-hidden lg:mx-auto lg:max-w-screen-2xl">
        {/* Left Side - Image Slider */}
        <SignInSlider />

        {/* Right Side - Success Message */}
        <div className="w-full lg:w-2/5 flex items-center justify-center bg-secondary-0 p-6">
          <div className="w-full max-w-sm text-center">
            {/* Success Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
              <CheckCircleIcon className="w-8 h-8 text-green-600" />
            </div>

            {/* Header */}
            <h1 className="text-2xl font-bold text-secondary-800 mb-2">
              ایمیل ارسال شد
            </h1>
            <p className="text-secondary-500 text-sm mb-2">
              لینک بازیابی رمز عبور به آدرس
            </p>
            <p className="text-primary-600 font-medium text-sm mb-6" dir="ltr">
              {getValues("email")}
            </p>
            <p className="text-secondary-500 text-sm mb-8">
              ارسال شده است. لطفاً ایمیل خود را بررسی کنید.
            </p>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                onClick={() => setIsSubmitted(false)}
                variant="primary"
                className="w-full py-3 text-base font-medium bg-primary-600 hover:bg-primary-700 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                ارسال مجدد ایمیل
              </Button>

              <Link
                href="/signin"
                className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-secondary-200 rounded-xl hover:bg-secondary-50 transition-all duration-200 text-secondary-600 font-medium text-sm "
              >
                <ArrowRightIcon className="w-4 h-4" />
                بازگشت به صفحه ورود
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Form View
  return (
    <div className="min-h-screen flex overflow-hidden lg:mx-auto lg:max-w-screen-2xl">
      {/* Left Side - Image Slider */}
      <SignInSlider />

      {/* Right Side - Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center bg-secondary-0 p-6">
        <div className="w-full max-w-sm">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-100 rounded-2xl mb-6">
              <EnvelopeIcon className="w-7 h-7 text-primary-600" />
            </div>
            <h1 className="text-2xl font-bold text-secondary-800 mb-2">
              فراموشی رمز عبور
            </h1>
            <p className="text-secondary-500 text-sm">
              ایمیل خود را وارد کنید تا لینک بازیابی برای شما ارسال شود
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
                  className={`w-full pr-28 pl-4 py-3 rounded-xl bg-secondary-50 text-secondary-800 placeholder-transparent border transition-all duration-200 focus:outline-none focus:ring-1 hover:border-primary-700 ${
                    errors.email
                      ? "border-red-500 focus:ring-red-500"
                      : "border-secondary-200"
                  }`}
                  placeholder="your@email.com"
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
                  ارسال لینک بازیابی
                </Button>
              )}
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-secondary-200 "></div>
            </div>
          </div>

          {/* Back to Sign In */}
          <div className="text-center">
            <Link
              href="/signin"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors mt-4"
            >
              <ArrowRightIcon className="w-4 h-4" />
              بازگشت به صفحه ورود
            </Link>
          </div>

          {/* Help Text */}
          <div className="mt-8 p-4 bg-secondary-50 rounded-xl">
            <h3 className="text-sm font-medium text-secondary-700 mb-2">
              راهنمایی
            </h3>
            <ul className="text-xs text-secondary-600 space-y-1">
              <li>• پوشه اسپم ایمیل خود را بررسی کنید</li>
              <li>• ممکن است تا ۵ دقیقه طول بکشد</li>
              <li>• در صورت عدم دریافت، مجدداً امتحان کنید</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
