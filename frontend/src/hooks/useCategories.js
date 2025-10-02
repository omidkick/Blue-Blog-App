import { getCategoryApi } from "@/services/categoryService";
import { useQuery } from "@tanstack/react-query";

export function useCategories() {
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoryApi,
  });

  // {_id,title, englishTitle, ...}
  const { categories: rawCategories = [] } = data || {};

  // we have to pass an oject containing {value, label} to RHF
  const categories = rawCategories.map((item) => ({
    label: item.title,
    value: item._id,
  }));

  // {title, englishTile}
  const transformedCategories = rawCategories.map((item) => ({
    label: item.title,
    value: item.englishTitle,
  }));

  return { isLoading, categories, transformedCategories, rawCategories };
}
