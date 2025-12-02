export type BeamSchoolType = {
    metaTitle:string,
    metaDescription:string,
    banner:string,
    bannerAlt:string,
    bannerAlt_ar:string,
    pageTitle:string,
    pageTitle_ar:string,
    firstSection:{
        title:string,
        description:string,
    },
    schools:{
        _id:string,
        title:string,
        location:{
            name:string,
            _id:string,
        },
        address:string,
        category:{
            name:string,
            _id:string,
        },
        image:string,
        imageAlt:string,
        logo:string,
        logoAlt:string,
        link:string,
        specifications:{
            number:string,
            value:string,
        }[],
    }[],
}


export type CategoryType = {
    name:string,
    _id:string,
}

export type LocationType = {
    name:string,
    _id:string,
}
