"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";

import RHFTextField from "@/ui/RHFTextField";
import Button from "@/ui/Button";
import Avatar from "@/ui/Avatar";
import Loading from "@/ui/Loading";
import { Spinner } from "@/ui/Spinner";

import useUser from "../useUser";
import useEditUser from "../useEditUser";
import useUploadAvatar from "../useUploadAvatar";
import { imageUrlToFile } from "@/utils/fileFormatter";

// Validation schema
const schema = yup.object({
  name: yup.string().required("نام ضروری است"),
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل ضروری است"),
});

function PersonalInfo() {
  const { user, isLoading, error } = useUser();

  const { editUser, isEditing } = useEditUser();
  const { uploadAvatar, isUploading } = useUploadAvatar();

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
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

  // Handle avatar selection
  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarUrl(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      let uploadedAvatarUrl = user.avatarUrl;

      // If user selected a new file, upload it
      if (avatarFile) {
        uploadedAvatarUrl = await uploadAvatar(avatarFile);
      } else if (avatarUrl && avatarUrl !== user.avatarUrl) {

        const fileFromUrl = await imageUrlToFile(avatarUrl);
        uploadedAvatarUrl = await uploadAvatar(fileFromUrl);
      }


      await editUser({
        name: data.name,
        email: data.email,
      });

      router.push("/profile");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <p className="text-red-500">خطا در دریافت اطلاعات کاربر</p>;

  return (
    <form
      className="flex flex-col gap-y-6 bg-secondary-0 p-8 rounded-xl w-full max-w-md mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Avatar Preview, Upload & Name Display */}
      <div className="flex flex-col items-center gap-2 mb-4">
        <div
          className="relative cursor-pointer group"
          onClick={() => document.getElementById("avatarInput").click()}
        >
          <Avatar src={avatarUrl} width={90} />
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <span className="text-white text-xs">ویرایش</span>
          </div>
        </div>

        {/* user name */}
        <p className="text-sm md:text-base text-secondary-700 font-extrabold">{user?.name}</p>

        {/* Hidden file input triggered by avatar click */}
        <input
          id="avatarInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
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
        {isEditing || isUploading ? (
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
