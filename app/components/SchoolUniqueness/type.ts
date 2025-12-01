export type SchoolUniquenessProps = {
    banner: string;
    bannerAlt: string;
    bannerAlt_ar: string;
    pageTitle: string;
    pageTitle_ar: string;
    metaTitle: string;
    metaTitle_ar: string;
    metaDescription: string;
    metaDescription_ar: string;
    firstSection: {
        title: string;
        description: string;
        items: {
            image: string;
            imageAlt: string;
            title: string;
        }[];
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
}