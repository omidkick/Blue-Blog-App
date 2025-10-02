"use client";

// Imports
import Button from "@/ui/Button";
import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useCreateCategory from "./useCreateCategory";
import Loading from "@/ui/Loading";
import { useRouter } from "next/navigation";
import useEditCategory from "./useEditCategory";

// Front-End Validation Schema
const schema = yup
  .object({
    title: yup
      .string()
      .min(3, "عنوان باید حداقل ۳ کاراکتر باشد")
      .required("عنوان ضروری است"),
    englishTitle: yup
      .string()
      .min(3, "عنوان انگلیسی باید حداقل ۳ کاراکتر باشد")
      .required("عنوان انگلیسی ضروری است"),
    description: yup
      .string()
      .min(5, "توضیحات باید حداقل ۵ کاراکتر باشد")
      .required("توضیحات ضروری است"),
  })
  .required();

function CreateCategoryForm({ categoryToEdit = {}, onCloseModal }) {
  const { _id: editId } = categoryToEdit;
  const isEditSession = Boolean(editId);

  const { title, englishTitle, description } = categoryToEdit;

  let editValues = {};

  // If editing, set default values
  if (isEditSession) {
    editValues = {
      title,
      englishTitle,
      description,
    };
  }

  const { isCreating, createCategory } = useCreateCategory();
  const { isEditing, editCategory } = useEditCategory();
  const router = useRouter();

  // RHF (React Hook Form)
  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(schema),
    defaultValues: editValues, // fill form with previous values if editing
  });

  // Handle Form Submit
  const onSubmit = (data) => {
    if (isEditSession) {
      editCategory(
        { id: editId, data },
        {
          onSuccess: () => {
            router.refresh("/profile/categories");
            onCloseModal();
          },
        }
      );
    } else {
      createCategory(data, {
        onSuccess: () => {
          router.push("/profile/categories");
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

      {/* English Title */}
      <RHFTextField
        label="عنوان انگلیسی"
        name="englishTitle"
        register={register}
        isRequired
        errors={errors}
      />

      {/* Description */}
      <div className="md:col-span-2">
        <RHFTextField
          label="توضیحات"
          name="description"
          register={register}
          isRequired
          errors={errors}
        />
      </div>

      {/* Submit Button || Loading */}
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

export default CreateCategoryForm;
