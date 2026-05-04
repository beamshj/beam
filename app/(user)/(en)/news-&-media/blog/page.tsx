import Index from "@/app/components/blog/Index";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const response = await fetch(`${process.env.BASE_URL}/api/admin/blogs`, {
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
    const response = await fetch(`${process.env.BASE_URL}/api/admin/blogs`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
    return <Index data={data.data}/>
}

export default Page;
