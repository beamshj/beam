export type GalleryProps = {
    metaTitle: string;
    metaDescription: string;
    banner: string;
    bannerAlt: string;
    pageTitle: string;
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