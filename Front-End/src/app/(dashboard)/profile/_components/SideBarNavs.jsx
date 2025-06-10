"use client";

// imports
import {
  ChatBubbleBottomCenterIcon,
  DocumentTextIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
  UsersIcon,
  BookmarkSquareIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarNavs = [
  {
    id: 1,
    title: "داشبورد",
    icon: <RectangleGroupIcon className="w-5 h-5" />,
    href: "/profile",
  },
  {
    id: 2,
    title: "پست ها",
    icon: <DocumentTextIcon className="w-5 h-5" />,
    href: "/profile/posts",
  },
  {
    id: 3,
    title: "بلاگ‌های من",
    icon: <BookmarkSquareIcon className="w-5 h-5" />,
    href: "/profile/my-blogs",
  },
  {
    id: 4,
    title: "نظرات",
    icon: <ChatBubbleBottomCenterIcon className="w-5 h-5" />,
    href: "/profile/comments",
  },
  {
    id: 5,
    title: "دسته بندی ها",
    icon: <Squares2X2Icon className="w-5 h-5" />,
    href: "/profile/categories",
  },
  {
    id: 6,
    title: "کاربران",
    icon: <UsersIcon className="w-5 h-5" />,
    href: "/profile/users",
  },
    {
    id: 7,
    title: "اطلاعات کاربری",
    icon: <UserCircleIcon className="w-5 h-5" />,
    href: "/profile/me",
  },
];
export default function SideBarNavs({ onClose }) {
  const pathname = usePathname();

  // find match link
  const activeHref =
    sidebarNavs
      .slice()
      .sort((a, b) => b.href.length - a.href.length)
      .find(
        (nav) => pathname === nav.href || pathname.startsWith(nav.href + "/")
      )?.href || "";

  return (
    <ul className="space-y-2">
      {sidebarNavs.map(({ id, href, icon, title }) => {
        const isActive = href === activeHref;

        return (
          <li key={id}>
            <Link
              onClick={onClose}
              href={href}
              className={classNames(
                "flex items-center gap-x-2 rounded-xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4",
                {
                  "!font-extrabold !text-primary-900 !bg-secondary-100":
                    isActive,
                }
              )}
            >
              {icon}
              {title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

//!old:
// export default function SideBarNavs() {
//   const router = useRouter();
//   return (
//     <ul className="space-y-2">
//       {sidebarNavs.map((nav) => {
//         return (
//           <li key={nav.id}>
//             <Link
//               href={nav.href}
//               className={classNames(
//                 "flex items-center gap-x-2 rounded-2xl font-medium hover:text-primary-900 transition-all duration-200 text-secondary-700 py-3 px-4",
//                 {
//                   "bg-primary-100/40 !font-bold text-primary-900":
//                     router.pathname === nav.href,
//                 }
//               )}
//             >
//               {nav.icon}
//               {nav.title}
//             </Link>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }
