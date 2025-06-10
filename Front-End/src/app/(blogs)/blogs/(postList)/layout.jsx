import { Suspense } from "react";
import CategoryList from "../_components/CategoryList";
import { Spinner } from "@/ui/Spinner";
import Search from "@/ui/Search";
import BlogSort from "../_components/BlogSort";

export const metadata = {
  title: "بلاگ ها",
};

function layout({ children }) {
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-secondary-700 mb-12 items-center">
        <h1 className="text-lg font-bold">لیست بلاگ ها</h1>
        {/* Search */}
        <Search />
        <BlogSort />
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Category List*/}
        <div className="col-span-12 lg:col-span-3 lg:pl-8 text-secondary-500 space-y-4 ">
          <Suspense fallback={<Spinner />}>
            <CategoryList />
          </Suspense>
        </div>

        {/* Main content */}
        <div className="col-span-12 lg:col-span-9 text-secondary-500 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default layout;
