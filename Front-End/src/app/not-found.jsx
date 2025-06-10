"use client";
import useMoveBack from "@/hooks/useMoveBack";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

function NotFound() {
  const moveBack = useMoveBack();

  return (
    <div className="h-screen flex items-start justify-center">
      <div className="text-center container xl:max-w-screen-xl px-4">
        <img
          src="/images/not-found.svg"
          alt="Page not found"
          className="w-72 mx-auto block dark:invert dark:brightness-150"
        />

        <h1 className="text-xl font-bold text-secondary-700 my-6">
          صفحه‌ای که دنبالش بودید، پیدا نشد
        </h1>

        <button
          onClick={moveBack}
          className="flex items-center gap-x-2 text-secondary-500 justify-center mx-auto"
        >
          <ArrowRightIcon className="w-6 h-6 text-primary-900" />
          <span>برگشت</span>
        </button>
      </div>
    </div>
  );
}

export default NotFound;
