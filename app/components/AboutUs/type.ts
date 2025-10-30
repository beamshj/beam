export type AboutProps = {
    banner: string;
    bannerAlt: string;
    pageTitle: string;
    metaTitle: string;
    metaDescription: string;
    firstSection: {
        mainTitle: string;
        subTitle: string;
        highlight: string;
        description: string;
        image: string;
        imageAlt: string;
    },
    secondSection:{
        title: string;
        description: string;
        image: string;
        imageAlt: string;
        items: {
            logo: string;
            logoAlt: string;
            title: string;
            description: string;
        }[]
    },
    thirdSection:{
        title:string;
        items:{
            image:string;
            imageAlt:string;
            title:string;
            description:string
        }[]
    },
    historySection:{
        title:string;
        items:{
            year:string;
            title:string;
            description:string;
            image:string;
            imageAlt:string
        }[]
    },
    fifthSection:{
        title:string;
        description:string;
        image:string;
        imageAlt:string
    },
    sixthSection:{
        title:string;
        description:string;
        items:{
            image:string;
            imageAlt:string;
            title:string
        }[]
    },
    seventhSection:{
        title:string;
        items:{
            image:string;
            imageAlt:string;
            title:string;
            link:string
        }[]
    }
}