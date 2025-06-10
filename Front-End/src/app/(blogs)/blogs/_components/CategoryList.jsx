import Link from "next/link";

async function CategoryList() {
  // await new Promise((resolve) => setTimeout(() => resolve(), 2000));

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/list`);
  const {
    data: { categories },
  } = await res.json();
  // console.log(categories);
  return (
    <ul className="space-y-2 bg-secondary-100 border border-secondary-100 rounded-2xl p-2 shadow-sm">
      <li>
        <Link
          href="/blogs"
          className="block px-4 py-2 rounded-xl hover:bg-secondary-0 hover:text-primary-900"
        >
          همه
        </Link>
      </li>
      {categories.map((category) => (
        <li key={category._id}>
          <Link
            href={`/blogs/category/${category.slug}`}
            className="block px-4 py-2 rounded-xl hover:bg-secondary-0 hover:text-primary-900"
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
