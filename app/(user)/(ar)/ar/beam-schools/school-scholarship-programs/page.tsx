import Index from "@/app/components/Scholarship";

const Page = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/scholarship-programs`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default Page;
