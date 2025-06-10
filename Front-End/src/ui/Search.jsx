"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const formSubmit = (e) => {
    e.preventDefault();
    const search = e.target.search;
    const searchValue = search.value;
    // Make new URL
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", "1"); // Reset to first page on new sort

    if (searchValue) {
      newParams.set("search", searchValue);
    } else {
      newParams.delete("search");
    }
    // navigate to a new URL
    router.push(`${pathName}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <form className="relative" onSubmit={formSubmit}>
      <input
        type="text"
        name="search"
        placeholder="جستجو ..."
        autoComplete="off"
        className="textField__input py-3 text-xs bg-secondary-0"
      />
      <button
        type="submit"
        className="absolute left-0 top-0 ml-3 flex h-full items-center"
      >
        <MagnifyingGlassIcon className="h-4 text-secondary-400" />
      </button>
    </form>
  );
}
