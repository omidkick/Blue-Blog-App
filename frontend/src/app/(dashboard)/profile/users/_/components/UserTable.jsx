import { getAllUsersApi } from "@/services/authService";
import Table from "@/ui/Table";
import setCookieOnReq from "@/utils/setCookieOnReq";
import { cookies } from "next/headers";
import UserRow from "./UserRow";

async function UserTable() {
  const cookieStore = cookies();
  const options = await setCookieOnReq(cookieStore);

  const { users } = await getAllUsersApi(options);
  //   console.log(users);

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>نام</th>
        <th>ایمیل</th>
        <th>تاریخ عضویت</th>
        <th>آخرین آپدیت</th>
        <th>تعداد نشان ها</th>
        <th>تعداد لایک ها</th>
      </Table.Header>
      <Table.Body>
        {users.map((user, index) => (
          <UserRow key={user._id} user={user} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default UserTable;
