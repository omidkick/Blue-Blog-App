import { deleteCommentApi } from "@/services/commentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteComment() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteComment } = useMutation({
    mutationFn: deleteCommentApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });

  return { isDeleting, deleteComment };
}
