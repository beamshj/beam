export type SchoolUniquenessProps = {
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
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