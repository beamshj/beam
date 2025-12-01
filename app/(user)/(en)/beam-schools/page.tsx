import Index from "@/app/components/BeamSchools/Index";

const Page = async () => {
  const schoolresponse = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools`, {
    next: { revalidate: 60 },
  });
  const data = await schoolresponse.json();

  const categoryresponse = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools/category`, {
    next: { revalidate: 60 },
  });
  const categorydata = await categoryresponse.json();

  const locationresponse = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools/location`, {
    next: { revalidate: 60 },
  });
  const locationdata = await locationresponse.json();

  return (
    <>
      <Index data={data.data} categorydata={categorydata.data} locationdata={locationdata.data} />
    </>
  );
};

export default Page;
