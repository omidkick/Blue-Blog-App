import Avatar from "@/ui/Avatar";
import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";
import Image from "next/image";

export default function UserRow({ user }) {
  const {
    name,
    email,
    createdAt,
    updatedAt,
    bookmarkedPosts,
    likedPosts,
    avatarUrl,
  } = user;

  return (
    <Table.Row>
      <td>
        <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
          <img
            src={avatarUrl || "/images/user-avatar-.png"}
            alt="User Avatar"
            className="w-full h-full rounded-full object-cover ring-2 ring-secondary-300"
          />
        </span>
      </td>
      <td>{name || "بدون نام"}</td>
      <td>{email || "بدون ایمیل"}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>{toLocalDateShort(updatedAt)}</td>
      <td>{toPersianDigits(bookmarkedPosts.length)}</td>
      <td>{toPersianDigits(likedPosts.length)}</td>
    </Table.Row>
  );
}
