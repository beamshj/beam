import Index from "@/app/components/BlogDetails";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const slug = (await params).slug;
  const response = await fetch(`${process.env.BASE_URL}/api/admin/blogs?slug=${slug}`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();
  const d = data.data;

const title =
  d.metaTitle?.length > 2
    ? d.metaTitle
    : d.pageTitle
    ?? d.bannerSection?.items?.[0]?.title
    ?? d.title
    ?? d.secondSection?.title
    ?? d.thirdSection?.title
    ?? "BEAM Schools";

const description =
  d.metaDescription?.length > 2
    ? d.metaDescription
    : d.pageTitle
    ?? d.bannerSection?.items?.[0]?.title
    ?? d.title
    ?? d.secondSection?.title
    ?? d.thirdSection?.title
    ?? "BEAM Schools";

  return { title, description };
}

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const slug = (await params).slug;
  const response = await fetch(
    `${process.env.BASE_URL}/api/admin/blogs?slug=${slug}`,
    { next: { revalidate: 60 } }
  );

  const allBlogResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/blogs`,
    { next: { revalidate: 60 } }
  );

  const allBlogData = await allBlogResponse.json();
  const data = await response.json();
  console.log(data.data);
  return <Index data={data.data} allBlogData={allBlogData.data} />;
};

export default Page;
