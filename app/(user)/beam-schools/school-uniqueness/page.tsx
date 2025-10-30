import Index from "@/app/components/SchoolUniqueness";

const Page = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/school-uniqueness`, {
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
