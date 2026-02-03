import InnerBanner from "@/app/components/Common/InnerBanner";
import Main from "./Sections/Main";
import CountrySection from "./Sections/CountrySection";
import StudentTestimonials from "./Sections/StudentTestimonials";
import { AlumniBannerData } from "./data";
import { AlumniPageData } from "./type";

interface Props {
    data: AlumniPageData;
}

const Index = ({ data }: Props) => {
    return (
        <>
            <InnerBanner BannerData={AlumniBannerData} data={data} />
            <Main data={data.mainSection} />
            <CountrySection data={data?.countryCardSection} />
            <StudentTestimonials data={data?.testimonialsSection} />
        </>
    );
};

export default Index;
