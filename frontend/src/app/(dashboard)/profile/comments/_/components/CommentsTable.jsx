import Table from "@/ui/Table";
import CommentRow from "./CommentRow";
import Empty from "@/ui/Empty";
import { getAllCommentApi } from "@/services/commentService";

async function CommentsTable() {
  const { comments } = await getAllCommentApi();

  if (!comments.length) return <Empty resourceName="نظری" />;

  // Flatten all comments and answers
  const flatComments = comments.flatMap((comment) => [comment, ...comment.answers]);

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>متن</th>
        <th>نویسنده</th>
        <th>تاریخ ایجاد</th>
        <th>وضعیت</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {flatComments.map((comment, index) => (
          <CommentRow key={comment._id} comment={comment} index={index + 1} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CommentsTable;
