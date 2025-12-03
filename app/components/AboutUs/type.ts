export type AboutProps = {
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
    mainTitle: string;
    mainTitle_ar: string;
    subTitle: string;
    subTitle_ar: string;
    highlight: string;
    highlight_ar: string;
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
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    items: {
      logo: string;
      logoAlt: string;
      logoAlt_ar: string;
      title: string;
      title_ar: string;
      description: string;
      description_ar: string;
    }[];
  };
  thirdSection: {
    title: string;
    title_ar: string;
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      title: string;
      title_ar: string;
      description: string;
      description_ar: string;
    }[];
  };
  historySection: {
    title: string;
    title_ar: string;
    items: {
      year: string;
      year_ar: string;
      title: string;
      title_ar: string;
      description: string;
      description_ar: string;
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
    }[];
  };
  fifthSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
  };
  sixthSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      title: string;
      title_ar: string;
    }[];
  };
  seventhSection: {
    title: string;
    title_ar: string;
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      title: string;
      title_ar: string;
      link: string;
      link_ar: string;
    }[];
  };
};
