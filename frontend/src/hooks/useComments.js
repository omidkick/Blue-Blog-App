// import { getAllCommentApi } from "@/services/commentService";
// import { useQuery } from "@tanstack/react-query";

// export default function useComments() {
//   const { data, isLoading } = useQuery({
//     queryKey: ["comments"],
//     queryFn: getAllCommentApi,
//   });

//   const { comments } = data || {};
//   return { isLoading, comments };
// }

import { getAllCommentApi } from "@/services/commentService";
import { useQuery } from "@tanstack/react-query";

export default function useComments() {
  const { data, isLoading } = useQuery({
    queryKey: ["comments"],
    queryFn: getAllCommentApi,
  });

  const { comments } = data || {};
  // Return an empty array if comments is undefined
  return { isLoading, comments: comments || [] };
}
