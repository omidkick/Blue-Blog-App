import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";
import { postTypeStyle } from "@/utils/postTypeStyle";
import truncateText from "@/utils/trancateText";
import { DeletePost, UpdatePost } from "./Buttons";

export default function PostRow({ post, index }) {
  const { title, category, author, createdAt, type } = post;
  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{truncateText(title || "بدون عنوان", 30)}</td>
      <td>{category?.title || "بدون دسته‌بندی"}</td>
      <td>{author.name || "نامشخص"}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <span className={postTypeStyle[type].className}>
          {postTypeStyle[type].label}
        </span>
      </td>
      <td>
        <div className="flex items-center justify-center gap-x-3">
          <DeletePost post={post} />
          <UpdatePost id={post._id} />
        </div>
      </td>
    </Table.Row>
  );
}
