import { useQuery } from "@tanstack/react-query";
import { getUserApi } from "@/services/authService";

export default function useUser() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
    retry: false,
  });
  const user = data?.user;

  return { user, isLoading, error };
}
