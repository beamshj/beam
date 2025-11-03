export type HomeProps = {
    metaTitle: string;
    metaDescription: string;
    bannerSection: {
        items: {
            image: string;
            imageAlt: string;
            title: string;
            highlightText: string;
        }[];
    },
    secondSection:{
        title:string;
    },
    thirdSection:{
        title:string;
        description:string;
        image:string;
        imageAlt:string;
        items:{
            logo:string;
            logoAlt:string;
            title:string;
        }[]
    },
    fourthSection:{
        title:string;
        image:string;
        imageAlt:string;
        videoLink:string;
    },
    fifthSection:{
        title:string;
        image:string;
        imageAlt:string;
        items:{
            logo:string;
            logoAlt:string;
            number:string;
            value:string;
        }[]
    },
    sixthSection:{
        mainTitle:string;
        subTitle:string;
        description:string;
        image:string;
        imageAlt:string;
        name:string;
        designation:string;
    },
    seventhSection:{
        title:string;
        buttonText:string;
        items:{
            image:string;
            imageAlt:string;
            name:string;
            course:string;
        }[]
    },
    eighthSection:{
        title:string;
    },
    ninethSection:{
        items:{
            image:string;
            imageAlt:string;
        }[]
    },
    tenthSection:{
        title:string;
        description:string;
        image:string;
        imageAlt:string;
        buttonText:string;
    }
}