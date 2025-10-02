"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Select from "@/ui/Select";

const sortOptions = [
  { label: "تاریخ ایجاد (جدید ترین)", value: "latest" },
  { label: "تاریخ ایجاد (قدیمی ترین)", value: "earliest" },
  { label: "محبوبیت", value: "popular" },
  { label: "زمان مطالعه (نزولی)", value: "time_desc" },
  { label: "زمان مطالعه (صعودی)", value: "time_asc" },
];

function BlogSort() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") || "latest";

  const handleChange = (e) => {
    const newValue = e.target.value;
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("sort", newValue);
    newParams.set("page", "1"); // Reset to first page on new sort

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <Select
      onChange={handleChange}
      value={sort}
      options={sortOptions}
    />
  );
}

export default BlogSort;
