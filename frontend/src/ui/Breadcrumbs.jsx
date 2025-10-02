import Link from "next/link";
import { ChevronLeftIcon } from "@heroicons/react/20/solid"; // optional icon

export default function Breadcrumbs({ breadcrumbs }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-secondary-500">
        {breadcrumbs.map((breadcrumb, index) => {
          const isLast = index === breadcrumbs.length - 1;

          return (
            <li key={breadcrumb.href} className="flex items-center gap-1">
              {!isLast ? (
                <Link
                  href={breadcrumb.href}
                  className="hover:underline hover:text-secondary-700 transition-colors"
                >
                  {breadcrumb.label}
                </Link>
              ) : (
                <span
                  className="text-primary-800 font-medium"
                  aria-current="page"
                >
                  {breadcrumb.label}
                </span>
              )}
              {!isLast && (
                <ChevronLeftIcon className="w-4 h-4 text-secondary-400" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
