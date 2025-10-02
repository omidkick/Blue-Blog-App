import { Suspense } from "react";

import { Spinner } from "@/ui/Spinner";
import PersonalInfo from "./_/_components/PersonalInfo";

async function Page() {
  return (
    <div>
      <h1 className="text-secondary-700 mb-10 font-bold text-xl text-center">
        اطلاعات حساب کاربری
      </h1>

      <Suspense fallback={<Spinner />}>
        <PersonalInfo />
      </Suspense>
    </div>
  );
}

// Disable static generation
export const dynamic = 'force-dynamic';

export default Page;
