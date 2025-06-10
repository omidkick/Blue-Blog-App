import Table from "@/ui/Table";
import { toLocalDateShort } from "@/utils/dateFormatter";
import { toPersianDigits } from "@/utils/numberFormatter";
import { DeleteCategory, UpdateCategory } from "./Buttons";

export default function CategoryRow({ category, index }) {
  const { title, englishTitle, description, createdAt } = category;

  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{title || "بدون عنوان"}</td>
      <td>{englishTitle || "بدون عنوان انگلیسی"}</td>
      <td>{description || "بدون توضیحات"}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <div className="flex items-center justify-center gap-x-3">
          <DeleteCategory category={category} />
          <UpdateCategory id={category._id} category={category} />
        </div>
      </td>
    </Table.Row>
  );
}
