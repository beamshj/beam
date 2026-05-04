import Index from "@/app/components/BeamSchools/Index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/beam-schools`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  const d = data.data;

const title =
  d.metaTitle?.length > 2
    ? d.metaTitle
    : d.pageTitle
    ?? d.bannerSection?.items?.[0]?.title
    ?? d.secondSection?.title
    ?? d.thirdSection?.title
    ?? "BEAM Schools";

const description =
  d.metaDescription?.length > 2
    ? d.metaDescription
    : d.pageTitle
    ?? d.bannerSection?.items?.[0]?.title
    ?? d.secondSection?.title
    ?? d.thirdSection?.title
    ?? "BEAM Schools";

  return { title, description };
}

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
