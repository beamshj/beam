import Index from "@/app/components/ContactUs/Index";

const Page = async () => {
  const contactResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/contact`,
    {
      next: { revalidate: 60 },
    }
  );
  const contactData = await contactResponse.json();

  const schoolresponse = await fetch(
    `${process.env.BASE_URL}/api/admin/beam-schools`,
    {
      next: { revalidate: 60 },
    }
  );
  const schooldata = await schoolresponse.json();

  return (
    <>
      <Index contactData={contactData.data} schooldata={schooldata.data} />
    </>
  );
};

export default Page;
