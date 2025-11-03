import Index from "@/app/components/SchoolLeadershipTeam";

const Page = async () => {
  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/leadership-team`,
    {
      next: { revalidate: 60 },
    }
  );
  const data = await response.json();
  console.log(data, "hel");
  return (
    <>
      <Index data={data.data} />
    </>
  );
};

export default Page;
