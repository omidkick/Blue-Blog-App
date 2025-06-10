import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { uploadAvatarApi } from "@/services/authService";

export default function useUploadAvatar() {
  const queryClient = useQueryClient();

  const { mutateAsync: uploadAvatar, isLoading: isUploading } = useMutation({
    mutationFn: uploadAvatarApi,
    onSuccess: (data) => {
      toast.success(data.message);

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { uploadAvatar, isUploading };
}
