//  "use client";
//  import dynamic from "next/dynamic";
import NewsArea from "./sections/NewsArea";  
import YouMayLike from "./sections/YouMayLike";  
// const NewsArea = dynamic(() => import("./sections/NewsArea"), {
//   ssr: false,
//   loading: () => <div className="container py-10 lg:py-15 xl:py-[135px]">Loading...</div>,
// });

// const YouMayLike = dynamic(() => import("./sections/YouMayLike"), {
//   ssr: true,
//   loading: () => <div className="container py-10 lg:py-15 xl:py-[135px]">Loading...</div>,
// });



import { BlogType } from "../blog/type"; 


const Index = ({data,allBlogData}: {data: BlogType['categories'][number]['blogs'][number], allBlogData: BlogType}) => {
  return (
    <> 
      <NewsArea  data={data}/>   
      <YouMayLike rsData ={allBlogData.categories.flatMap((category) => category.blogs)} />
    </>
  );
};

export default Index;
