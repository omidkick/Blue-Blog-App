"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi2";
import { HiViewGrid } from "react-icons/hi";
import { usePathname } from "next/navigation";

function MobileCategoryList() {
  const [categories, setCategories] = useState([]);

  const pathname = usePathname();
  const currentSlug = pathname?.split("/")[3];

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/category/list`
      );
      const {
        data: { categories },
      } = await res.json();
      setCategories(categories);
    }

    fetchData();
  }, []);

  return (
    <Disclosure>
      {({ open }) => (
        <div>
          {/* Button */}
          <DisclosureButton className="flex items-center justify-between w-full px-4 py-3 font-semibold bg-secondary-100 text-secondary-700 rounded-xl shadow-sm">
            <div className="flex items-center gap-x-2 ">
              <HiViewGrid className="w-5 h-5" />
              <span>دسته‌بندی‌ها</span>
            </div>
            <HiChevronDown
              className={`w-5 h-5 transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </DisclosureButton>

          {/* Panel */}
          <DisclosurePanel className="mt-3 bg-secondary-100 rounded-xl p-4 space-y-2">
            <Link
              href="/blogs"
              className={`block px-4 py-2 rounded-xl text-secondary-800  ${
                !currentSlug ? " !text-primary-700 font-bold" : ""
              }`}
            >
              همه
            </Link>

            {categories.map((cat) => {
              const isActive = cat.slug === currentSlug;
              return (
                <Link
                  key={cat._id}
                  href={`/blogs/category/${cat.slug}`}
                  className={`block px-4 py-2 rounded-xl text-secondary-800  ${
                    isActive ? " !text-primary-700 font-bold" : ""
                  }`}
                >
                  {cat.title}
                </Link>
              );
            })}
          </DisclosurePanel>
        </div>
      )}
    </Disclosure>
  );
}

export default MobileCategoryList;
