import { editCategoryApi } from "@/services/categoryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditCategory() {
  const queryClient = useQueryClient();

  const { isLoading: isEditing, mutate: editCategory } = useMutation({
    mutationFn: editCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["categories"], // Adjust the query key if needed
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "An error occurred");
    },
  });

  return { isEditing, editCategory };
}
