import { Suspense } from "react";
import CommentsTable from "./_/components/CommentsTable";
import Fallback from "@/ui/Fallback";
import { Spinner } from "@/ui/Spinner";

async function CommentPage() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-secondary-700 mb-8 font-bold text-xl">
          لیست نظرات
        </h1>
      </div>
      <Suspense fallback={<Spinner />}>
        <CommentsTable />
      </Suspense>
    </div>
  );
}
export default CommentPage;
