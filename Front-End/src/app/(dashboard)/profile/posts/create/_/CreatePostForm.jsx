"use client";

// Imports
import { useCategories } from "@/hooks/useCategories";
import Button from "@/ui/Button";
import ButtonIcon from "@/ui/ButtonIcon";
import FileInput from "@/ui/FileInput";
import RHFSelect from "@/ui/RHFSelect";
import RHFTextField from "@/ui/RHFTextField";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import useCreatePost from "./useCreatePost";
import Loading from "@/ui/Loading";
import { useRouter } from "next/navigation";
import useEditPost from "./useEditPost";
import { imageUrlToFile } from "@/utils/fileFormatter";

// Front-End Validation Schema
const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),

    coverImage: yup
      .mixed()
      .required("کاور پست الزامی است")
      .test(
        "fileRequired",
        "کاور پست الزامی است",
        (value) => value instanceof File
      ),
  })
  .required();

function CreatePostForm({ postToEdit = {} }) {
  const { _id: editId } = postToEdit;
  const isEditSession = Boolean(editId);

  const {
    title,
    text,
    slug,
    briefText,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevCoverImageUrl,
  } = postToEdit;

  // if we are not editing
  let editValues = {};

  // define previous values in form
  if (isEditSession) {
    editValues = {
      title,
      text,
      slug,
      briefText,
      readingTime,
      category: category._id,
      coverImage,
    };
  }

  const { categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState(prevCoverImageUrl || null);
  const [showPreview, setShowPreview] = useState(true);
  const { isCreating, createPost } = useCreatePost();
  const { isEditing, editPost } = useEditPost();
  const router = useRouter();

  // RHF
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: editValues, // fill the form with prev values
  });

  useEffect(() => {
    if (prevCoverImageUrl) {
      //convert prev link to file
      async function fetchMyApi() {
        const file = await imageUrlToFile(prevCoverImageUrl);
        setValue("coverImage", file);
        setCoverImageUrl(URL.createObjectURL(file));
        setValue("category", category._id);
      }
      fetchMyApi();
    }
  }, [editId, category]);

  // Handle Submit Form ( Create A New Post|| Update A Post)
  const onSubmit = (data) => {
    //To Send Uploaded File besides JSON stuff ==> use FormData constructor
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (isEditSession) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => {
          router.push("/profile/posts");
        },
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Title */}
      <RHFTextField
        label="عنوان"
        name="title"
        register={register}
        isRequired
        errors={errors}
      />

      {/* Brief Text */}
      <RHFTextField
        label="متن کوتاه"
        name="briefText"
        register={register}
        isRequired
        errors={errors}
      />

      {/* Text */}
      <div className="md:col-span-2">
        <RHFTextField
          label="متن"
          name="text"
          register={register}
          isRequired
          errors={errors}
        />
      </div>

      {/* Slug */}
      <RHFTextField
        label="اسلاگ"
        name="slug"
        register={register}
        isRequired
        errors={errors}
      />

      {/* Reading Time */}
      <RHFTextField
        label="زمان مطالعه"
        name="readingTime"
        register={register}
        isRequired
        errors={errors}
      />

      {/* Category Select */}
      <div className="md:col-span-2">
        <RHFSelect
          label="دسته بندی"
          name="category"
          errors={errors}
          isRequired
          register={register}
          options={categories}
        />
      </div>

      {/* Cover Image Input */}
      <div className="md:col-span-2">
        <Controller
          name="coverImage"
          control={control}
          // rules={{ required: "کاور پست الزامی است" }}
          render={({ field: { value, onChange, ...rest } }) => {
            return (
              <FileInput
                label="انتخاب کاور پست"
                name="coverImage"
                isRequired
                className="bg-secondary-0 hover:bg-secondary-50 hover:shadow-md text-primary-900 lg:w-1/2 lg:mx-auto mt-4 lg:mt-6"
                errors={errors}
                {...rest}
                value={value?.fileName}
                onChange={(event) => {
                  const file = event.target.files[0];
                  onChange(file);
                  setCoverImageUrl(URL.createObjectURL(file));
                  event.target.value = null;
                }}
                showPreview={showPreview}
                setShowPreview={setShowPreview}
                coverImageUrl={coverImageUrl}
              />
            );
          }}
        />
      </div>

      {/* Cover Image Preview */}
      {coverImageUrl && showPreview && (
        <div className="md:col-span-2 relative w-full max-w-md aspect-video overflow-hidden rounded-lg mx-auto">
          <Image
            fill
            alt="cover-image"
            src={coverImageUrl}
            className="object-fill object-center"
            sizes="(max-width: 768px) 100vw, 600px"
          />

          <ButtonIcon
            variant="red"
            className="w-7 h-7 absolute left-2 top-2"
            onClick={() => {
              setCoverImageUrl(null);
              setValue("coverImage", null);
            }}
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}

      {/* Submit button  || Loading */}
      <div className="md:col-span-2 lg:w-1/2 lg:mx-auto">
        {isCreating || isEditing ? (
          <Loading />
        ) : (
          <Button variant="primary" type="submit" className="w-full">
            تایید
          </Button>
        )}
      </div>
    </form>
  );
}

export default CreatePostForm;
