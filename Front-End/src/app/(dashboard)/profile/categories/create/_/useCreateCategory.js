import { addCategoryApi } from "@/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useCreateCategory() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createCategory } = useMutation({
    mutationFn: addCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "مشکلی پیش آمد");
    },
  });

  return { isCreating, createCategory };
}
