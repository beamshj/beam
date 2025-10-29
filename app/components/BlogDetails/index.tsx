 
import NewsArea from "./sections/NewsArea";  
import YouMayLike from "./sections/YouMayLike";  
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
