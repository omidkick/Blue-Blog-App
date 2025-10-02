import { getPosts } from "@/services/postServices";
import Empty from "@/ui/Empty";
import Table from "@/ui/Table";
import PostRow from "./PostRow";

async function PostsTable({ query = "" }) {
  // Fetch Posts:
  const {posts} = await getPosts(query);

  if (!posts.length) return <Empty resourceName="پستی" />;

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>عنوان</th>
        <th>دسته بندی</th>
        <th>نویسنده</th>
        <th>تاریخ ایجاد</th>
        <th>نوع</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {posts.map((post, index) => (
          <PostRow key={post._id} post={post} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default PostsTable;
