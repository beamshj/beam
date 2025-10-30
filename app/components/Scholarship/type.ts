export type ScholarshipProps = {
  banner: string;
  bannerAlt: string;
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  firstSection: {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  secondSection: {
    title: string;
    description: string;
    items: {
      title: string;
    }[];
  };
  thirdSection: {
    mainTitle: string;
    firstDescription: string;
    subTitle: string;
    secondDescription: string;
    items: {
      title: string;
      image: string;
      imageAlt: string;
      description: string;
    }[];
  };
  fourthSection: {
    title: string;
    image: string;
    imageAlt: string;
    description: string;
    email: string;
    buttonText: string;
  };
};
