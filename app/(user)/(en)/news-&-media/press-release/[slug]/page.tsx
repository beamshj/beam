import Index from "@/app/components/NewsDetails";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/news?slug=${slug}`,
    { next: { revalidate: 60 } }
  );
  const data = await response.json();
  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default Page;
