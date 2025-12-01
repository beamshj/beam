export type SchoolAchievementsProps = {
    banner: string;
    bannerAlt: string;
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
    bannerAlt_ar: string;
    metaTitle_ar: string;
    metaDescription_ar: string;
    pageTitle_ar: string;
    firstSection: {
        title: string;
        image: string;
        imageAlt: string;
        videoLink: string;
    };
    secondSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
            description: string;
        }[];
    };
};