import { prisma } from "@/lib/prisma";
import { ensureDefaultCategories } from "@/lib/admin";

export default async function AdminCategoriesPage() {
  await ensureDefaultCategories();
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });

  return (
    <section className="rounded-3xl border border-gray-200 bg-white p-6">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-gray-500">
        Categories
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-gray-950">
        Fixed category list
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-600">
        Categories are controlled and cannot be created, edited, or deleted in
        the dashboard. They are selected from this fixed list when creating or
        editing a post.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
        <table className="min-w-full divide-y divide-gray-100">
          <thead className="bg-gray-50">
            <tr className="text-left text-xs font-medium uppercase tracking-[0.18em] text-gray-500">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Posts</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-4 font-medium text-gray-950">{category.name}</td>
                <td className="px-4 py-4 text-gray-500">{category.slug}</td>
                <td className="px-4 py-4">{category._count.posts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
