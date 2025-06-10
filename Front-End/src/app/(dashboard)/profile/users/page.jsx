import { Suspense } from "react";
import { Spinner } from "@/ui/Spinner";
import UserTable from "./_/components/UserTable";

async function CategoryPage() {
  return (
    <div>
      <h1 className="font-bold text-xl mb-12">لیست کاربران </h1>

      {/* Categories List */}
      <Suspense fallback={<Spinner />}>
        <UserTable />
      </Suspense>
    </div>
  );
}

export default CategoryPage;
