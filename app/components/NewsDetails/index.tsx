import { rsData } from "./data";
import NewsArea from "./sections/NewsArea";
import YouMayLike from "./sections/YouMayLike";
import { NewsItem } from "../PressRelease/type";

type Props = {
  data: NewsItem;
};

const Index = ({ data }: Props) => {
  return (
    <>
      <NewsArea data={data} />
      <YouMayLike rsData={rsData} />
    </>
  );
};

export default Index;
