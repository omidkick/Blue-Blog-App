// "use client";

// import { useCategories } from "@/hooks/useCategories";
import Table from "@/ui/Table";
import CategoryRow from "./CategoryRow";
import { getCategoryApi } from "@/services/categoryService";

async function CategoryTable() {
  const { categories } = await getCategoryApi();

  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>عنوان</th>
        <th>عنوان انگلیسی</th>
        <th>توضیحات</th>
        <th>تاریخ ایجاد</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {categories.map((category, index) => (
          <CategoryRow key={category._id} category={category} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default CategoryTable;
