



import Index from "@/app/components/HomeTwo/Index";

const Page = async () => {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  const schoolresponse = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools`, {
    next: { revalidate: 60 },
  });
  const schooldata = await schoolresponse.json();

  const categoryresponse = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools/category`, {
    next: { revalidate: 60 },
  });
  const categorydata = await categoryresponse.json();

  const locationresponse = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools/location`, {
    next: { revalidate: 60 },
  });
  const locationdata = await locationresponse.json();

  const blogresponse = await fetch(`${process.env.BASE_URL}/api/admin/blogs`, {
    next: { revalidate: 60 },
  });
  const blogdata = await blogresponse.json();

  const newsresponse = await fetch(`${process.env.BASE_URL}/api/admin/news`, {
    next: { revalidate: 60 },
  });
  const newsdata = await newsresponse.json();

  const galleryresponse = await fetch(`${process.env.BASE_URL}/api/admin/gallery`, {
    next: { revalidate: 60 },
  });
  const gallerydata = await galleryresponse.json();

  return (
    <>
      <Index data={data.data} schooldata={schooldata.data} categorydata={categorydata.data} locationdata={locationdata.data} blogdata={blogdata.data} newsdata={newsdata.data} gallerydata={gallerydata.data} />
    </>
  );
};

export default Page;
