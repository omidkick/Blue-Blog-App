import { toLocalDateShort } from "@/utils/dateFormatter";
import truncateText from "@/utils/trancateText";
import { DeleteComment, UpdateComment } from "./Buttons";
import Table from "@/ui/Table";

const statusStyle = [
  {
    label: "رد شده",
    className: "badge--danger",
  },
  {
    label: "در انتظار تایید",
    className: "badge--secondary",
  },
  {
    label: "تایید شده",
    className: "badge--success",
  },
];

function CommentRow({ index, comment }) {



  const {
    content: { text },
    user,
    status,
    createdAt,
  } = comment;
  return (
    <Table.Row>
      <td>{index}</td>
      <td>{truncateText(text, 30)}</td>
      <td> {user.name}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <span className={`badge ${statusStyle[status].className}`}>
          {statusStyle[status].label}
        </span>
      </td>
      <td>
        <div className="flex items-center justify-center gap-x-3">
          <DeleteComment comment={comment} />
          <UpdateComment comment={comment} />
        </div>
      </td>
    </Table.Row>
  );
}
export default CommentRow;
