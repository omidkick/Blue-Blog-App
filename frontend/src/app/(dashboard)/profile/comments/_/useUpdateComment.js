import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCommentApi } from "@/services/commentService";

export default function useUpdateComment() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateComment } = useMutation({
    mutationFn: updateCommentApi,
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the cache to refresh comments data
      queryClient.invalidateQueries({
        queryKey: ["comments"],
      });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message);
    },
  });

  return { isUpdating, updateComment };
}
  