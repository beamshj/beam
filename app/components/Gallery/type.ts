export type GalleryProps = {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    bannerAlt_ar: string;
    pageTitle: string;
    pageTitle_ar: string;
    firstSection:{
        title:string
    }
    gallery: {
        title: string;
        categories: {
            title: string;
            images: string[];
            description:string;
        }[];
    }[];
}