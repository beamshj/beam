import Index from "@/app/components/BeamSchools/Index";

const Page = async () => {
    const schoolResponse = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools`, {
    next: { revalidate: 60 },
  });
  const categoryResponse = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools/category`, {
    next: { revalidate: 60 },
  });
  const locationResponse = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools/location`, {
    next: { revalidate: 60 },
  });
  const schoolData = await schoolResponse.json();
  const categoryData = await categoryResponse.json();
  const locationData = await locationResponse.json();
    return <Index data={schoolData.data} categoryData={categoryData.data} locationData={locationData.data}/>
}

export default Page;
