"use client";
import Link from "next/link";

function NotFound() {

  return (
    <div className="min-h-screen flex  justify-center px-4">
      <div className="text-center max-w-md sm:max-w-lg md:max-w-xl mx-auto">
        <img
          src="/images/not-found.svg"
          alt="Page not found"
          className="w-60 sm:w-72 mx-auto mb-8"
          style={{
            filter: "invert(0.9) brightness(1.2)",
          }}
        />

        <h4 className="text-xl sm:text-2xl font-semibold text-secondary-700 mb-4">
          پستی که دنبالش بودید، پیدا نشد
        </h4>
        <Link
          href="/blogs"
          className="focus:underline text-secondary-500 flex items-center justify-center w-full sm:w-auto py-2 px-6 mt-8"
          aria-label="بازگشت به صفحه پست‌ها"
        >
          بازگشت به صفحه پست‌ها ؟
         </Link>
      </div>
    </div>
  );
}

export default NotFound;
