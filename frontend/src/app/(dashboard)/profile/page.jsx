import PostsTable from "./posts/_/components/PostsTable";
import { SparklesIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { Suspense } from "react";
import CardsWrapper from "./_components/CardsWrapper";
import Fallback from "@/ui/Fallback";
import LatestPosts from "./_components/LatestPosts";

async function Profile() {
  return (
    <div className="py-4">
      {/* Card Stats Section */}
      <div className="mb-6 md:mb-10">
        <h2 className="text-lg md:text-xl font-bold text-secondary-700 flex items-center gap-x-2 mb-6">
          <UserGroupIcon className="w-6 h-6 text-primary-900" />
          آمار کلی پنل
        </h2>
        <Suspense fallback={<Fallback />}>
          <CardsWrapper />
        </Suspense>
      </div>

      {/* Latest Posts Table */}
      <div className="mt-14 md:mt-20">
        <h2 className="text-lg md:text-xl font-bold text-secondary-700 flex items-center gap-x-2 mb-6">
          <SparklesIcon className="w-6 h-6 text-primary-900" />
          جدیدترین پست‌ها
        </h2>
        <Suspense fallback={<Fallback />}>
          <LatestPosts />
        </Suspense>
      </div>
    </div>
  );
}

export default Profile;
