import Index from "@/app/components/FounderMessage/Index";

const Page = async () => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/founders-message`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();

  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default Page;
