 
import { 
  rsData, 
} from "./data"; 
import NewsArea from "./sections/NewsArea";  
import YouMayLike from "./sections/YouMayLike";  


const Index = () => {
  return (
    <> 
      <NewsArea  />   
      <YouMayLike rsData ={rsData} />
    </>
  );
};

export default Index;
