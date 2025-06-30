import Breadcrumbs from "@/ui/Breadcrumbs";
import CreateCategoryForm from "./_/CreateCategoryForm";
// import CreatePostForm from "./_/CreatePostForm";

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
            label: "دسته بندی ها",
            href: "/profile/categories",
          },
          {
            label: "ایجاد دسته بندی",
            href: "/profile/categories/create",
            active: true,
          },
        ]}
      />
      <CreateCategoryForm />
    </div>
  );
}

export default Page;
