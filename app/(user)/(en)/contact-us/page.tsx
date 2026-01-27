import { Suspense } from "react";
import Index from "@/app/components/ContactUs/Index";

const Page = async () => {
  const contactResponse = await fetch(
    `${process.env.BASE_URL}/api/admin/contact`,
    { next: { revalidate: 60 } }
  );
  const contactData = await contactResponse.json();

  const schoolresponse = await fetch(
    `${process.env.BASE_URL}/api/admin/beam-schools`,
    { next: { revalidate: 60 } }
  );
  const schooldata = await schoolresponse.json();

  return (
    <Suspense fallback={null}>
      <Index
        contactData={contactData.data}
        schooldata={schooldata.data}
      />
    </Suspense>
  );
};

export default Page;
