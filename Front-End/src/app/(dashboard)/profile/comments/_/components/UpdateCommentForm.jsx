"use client";

// Imports
import { useForm } from "react-hook-form";
import RHFSelect from "@/ui/RHFSelect";
import Loading from "@/ui/Loading";
import Button from "@/ui/Button";
import useUpdateComment from "../useUpdateComment";
import { useRouter } from "next/navigation";

// Options
const options = [
  { id: 1, label: "رد شده", value: 0 },
  { id: 2, label: "در انتظار تایید", value: 1 },
  { id: 3, label: "قبول", value: 2 },
];

function UpdateCommentForm({ comment, onClose }) {
  const { isUpdating, updateComment } = useUpdateComment();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    defaultValues: {
      status: String(comment.status),
    },
  });

  // disable the unnecessary call API
  const currentStatus = watch("status");
  const isUnchanged = +currentStatus === comment.status;

  // Handle form submission
  const onSubmit = (data) => {
    const updatedStatus = {
      status: +data.status,
    };

    updateComment(
      {
        id: comment._id,
        data: updatedStatus,
      },
      {
        onSuccess: () => {
          onClose();
          router.refresh();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form space-y-4">
      <RHFSelect
        label="تغییر وضعیت"
        required
        name="status"
        errors={errors}
        register={register}
        options={options}
      />

      {isUpdating ? (
        <Loading />
      ) : (
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={isUnchanged}
        >
          تایید
        </Button>
      )}
    </form>
  );
}

export default UpdateCommentForm;
