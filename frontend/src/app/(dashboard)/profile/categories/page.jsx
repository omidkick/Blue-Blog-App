import { Suspense } from "react";
import { Spinner } from "@/ui/Spinner";
import CategoryTable from "./_/components/CategoryTable";
import { CreateCategory } from "./_/components/Buttons";

async function CategoryPage() {
  return (
    <div>
      {/* Categories Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-secondary-700 mb-12 items-center justify-between">
        <h1 className="font-bold text-xl">لیست دسته بندی ها</h1>
        <CreateCategory />
      </div>

      {/* Categories List */}
      <Suspense fallback={<Spinner />}>
        <CategoryTable />
      </Suspense>
    </div>
  );
}

export default CategoryPage;
