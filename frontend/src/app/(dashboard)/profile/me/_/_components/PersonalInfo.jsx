"use client";

// Imports
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";

import RHFTextField from "@/ui/RHFTextField";
import Button from "@/ui/Button";
import Avatar from "@/ui/Avatar";
import Loading from "@/ui/Loading";
import { Spinner } from "@/ui/Spinner";
import { useQueryClient } from "@tanstack/react-query";

import useUser from "../useUser";
import useEditUser from "../useEditUser";
import useUploadAvatar from "../useUploadAvatar";
import { imageUrlToFile } from "@/utils/fileFormatter";
import { compressImage, checkFileSize } from "@/utils/imageCompression";

// Validation schema
const schema = yup.object({
  name: yup.string().required("نام ضروری است"),
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل ضروری است"),
});

function PersonalInfo() {
  const { user, isLoading, error } = useUser();
  const queryClient = useQueryClient();

  const { editUser, isUpdating } = useEditUser();
  const { uploadAvatar, isUploading } = useUploadAvatar();

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [isCompressing, setIsCompressing] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  // Prefill form with user data
  useEffect(() => {
    if (user) {
      setAvatarUrl(user.avatarUrl || null);
      reset({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user, reset]);

  // Handle avatar selection with compression
  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("لطفاً یک فایل تصویری انتخاب کنید");
      return;
    }

    // Check file size (before compression)
    if (!checkFileSize(file, 10)) {
      // 10MB limit before compression
      toast.error("حجم فایل نباید بیش از 10 مگابایت باشد");
      return;
    }

    setIsCompressing(true);
    try {
      // Compress the image
      const compressedFile = await compressImage(file, 800, 800, 0.8);

      setAvatarFile(compressedFile);
      setAvatarUrl(URL.createObjectURL(compressedFile));

      toast.success("تصویر با موفقیت فشرده شد");
    } catch (error) {
      console.error("Error compressing image:", error);
      toast.error("خطا در فشرده‌سازی تصویر");
    } finally {
      setIsCompressing(false);
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Handle avatar upload first if there's a new avatar
      if (avatarFile && avatarFile instanceof File) {
        await uploadAvatar(avatarFile);
      } else if (
        avatarUrl &&
        avatarUrl !== user.avatarUrl &&
        !avatarUrl.startsWith("blob:")
      ) {
        const fileFromUrl = await imageUrlToFile(avatarUrl);
        const compressedFile = await compressImage(fileFromUrl, 800, 800, 0.8);
        await uploadAvatar(compressedFile);
      }

      // Update user profile
      await editUser({
        name: data.name,
        email: data.email,
      });

      // Navigate to profile
      router.push("/profile");

      // Force a hard refresh after navigation
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      toast.error(err?.message || "خطا در ذخیره تغییرات");
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">خطا در دریافت اطلاعات کاربر</p>;

  const isProcessing = isUpdating || isUploading || isCompressing;

  // UI
  return (
    <form
      className="flex flex-col gap-y-6 bg-secondary-0 p-8 rounded-xl w-full max-w-md mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Avatar Preview, Upload & Name Display */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <div
          className="relative cursor-pointer group"
          onClick={() =>
            !isCompressing && document.getElementById("avatarInput").click()
          }
        >
          <Avatar src={avatarUrl} width={90} />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            {isCompressing ? (
              <div className="text-white text-xs">در حال فشرده‌سازی...</div>
            ) : (
              <span className="text-white text-xs">ویرایش</span>
            )}
          </div>
        </div>

        {/* user name */}
        <p className="text-sm md:text-base text-secondary-700 font-extrabold">
          {user?.name}
        </p>

        {/* Hidden file input triggered by avatar click */}
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
          disabled={isCompressing}
        />
      </div>

      {/* Name Input */}
      <RHFTextField
        label="نام و نام خانوادگی"
        name="name"
        register={register}
        errors={errors}
        isRequired
      />

      {/* Email Input */}
      <RHFTextField
        label="ایمیل"
        name="email"
        register={register}
        type="email"
        errors={errors}
        isRequired
      />

      {/* Submit */}
      <div className="mt-6">
        {isProcessing ? (
          <Loading />
        ) : (
          <Button variant="primary" type="submit" className="w-full">
            ذخیره تغییرات
          </Button>
        )}
      </div>
    </form>
  );
}

export default PersonalInfo;
