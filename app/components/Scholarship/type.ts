export type ScholarshipProps = {
  banner: string;
  bannerAlt: string;
  bannerAlt_ar:string;
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageTitle_ar: string;
  firstSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
  };
  secondSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    items: {
      title: string;
      title_ar: string;
    }[];
  };
  thirdSection: {
    mainTitle: string;
    mainTitle_ar: string;
    firstDescription: string;
    firstDescription_ar: string;
    subTitle: string;
    subTitle_ar: string;
    secondDescription: string;
    secondDescription_ar: string;
    items: {
      title: string;
      title_ar: string;
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      description: string;
      description_ar: string;
    }[];
  };
  fourthSection: {
    title: string;
    title_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    description: string;
    description_ar: string;
    email: string;
    email_ar: string;
    buttonText: string;
    buttonText_ar: string;
  };
};
