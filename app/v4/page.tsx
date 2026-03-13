
import Indev4 from "@/app/components/HomeTwo/Indev4";

const Page = async () => {
  
  const response = await fetch(`${process.env.BASE_URL}/api/admin/home`, {
    next: { revalidate: 60 },
  });
  const data = await response.json();

  return (
    <>
      <Indev4 data={data.data} />
    </>
  );
};

export default Page;
