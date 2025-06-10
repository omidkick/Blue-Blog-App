import Breadcrumbs from "@/ui/Breadcrumbs";
import CreatePostForm from "./_/CreatePostForm";

function Page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: "پروفایل",
            href: "/profile",
          },
          {
            label: "پست ها",
            href: "/profile/posts",
          },
          {
            label: "ایجاد پست",
            href: "/profile/posts/create",
            active: true,
          },
        ]}
      />
     <CreatePostForm/>
    </div>
  );
}

export default Page;
