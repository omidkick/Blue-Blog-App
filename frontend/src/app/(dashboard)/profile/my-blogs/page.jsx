import MyPostsTableWrapper from "./_components/MyPostsTableWrapper";
import { Suspense } from "react";
import { Spinner } from "@/ui/Spinner";

export default function MyBlogsPage({ searchParams }) {
  return (
    <section>
      <h1 className="text-2xl font-bold mb-6">بلاگ‌های من</h1>
      <Suspense fallback={<Spinner />}>
        <MyPostsTableWrapper searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
