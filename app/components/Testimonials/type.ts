export type TestimonialsProps = {
    banner:string;
    bannerAlt:string;
    bannerAlt_ar: string;
    metaTitle:string;
    metaTitle_ar: string;
    metaDescription:string;
    metaDescription_ar: string;
    pageTitle:string;
    pageTitle_ar: string;
    firstSection:{
        title:string;
        description:string;
        items:[{
            title:string;
            description:string;
            designation:string;
        }]
    },
    secondSection:{
        title:string;
        description:string;
        items:[{
            video:string;
            poster:string;
        }]
    },
    thirdSection:{
        title:string;
        items:[{
            video:string;
            poster:string;
            name:string;
            designation:string;
        }]
    }
}