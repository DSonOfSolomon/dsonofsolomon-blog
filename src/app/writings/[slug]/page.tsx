type Props = {
    params: Promise<{
      slug: string;
    }>;
  };
  
  export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
  
    return (
      <main className="min-h-screen px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold">
            {slug}
          </h1>
  
          <p className="mt-4 text-gray-700">
            Individual writing post page.
          </p>
        </div>
      </main>
    );
  }