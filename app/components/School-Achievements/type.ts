export type SchoolAchievementsProps = {
    banner: string;
    bannerAlt: string;
    metaTitle: string;
    metaDescription: string;
    pageTitle: string;
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