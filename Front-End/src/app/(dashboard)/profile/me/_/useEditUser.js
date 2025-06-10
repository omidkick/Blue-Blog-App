import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { editUserApi } from "@/services/authService";

export default function useEditUser() {
  const queryClient = useQueryClient();

  const { mutate: editUser, isPending: isUpdating } = useMutation({
    mutationFn: editUserApi,
    onSuccess: (data) => {
      toast.success(data.message);

      // Refresh user data cache
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { editUser, isUpdating };
}
