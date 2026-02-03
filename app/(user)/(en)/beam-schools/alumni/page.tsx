import Index from "@/app/components/Alumni/Index";

const Page = async () => {
  // const response = await fetch(`${process.env.BASE_URL}/api/admin/school-achievements`, {
  //   next: { revalidate: 60 },
  // });
  // const data = await response.json();

  return (
    <>
      <Index />
    </>
  );
};

export default Page;
