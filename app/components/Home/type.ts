export type HomeProps = {
  metaTitle: string;
  metaTitle_ar: string;
  metaDescription: string;
  metaDescription_ar: string;
  bannerSection: {
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      title: string;
      title_ar: string;
      highlightText: string;
      highlightText_ar: string;
    }[];
  };
  secondSection: {
    title: string;
    title_ar: string;
  };
  thirdSection: {
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
    }[];
  };
  fourthSection: {
    title: string;
    title_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    videoLink: string;
  };
  fifthSection: {
    title: string;
    title_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    items: {
      logo: string;
      logoAlt: string;
      logoAlt_ar: string;
      number: string;
      number_ar: string;
      value: string;
      value_ar: string;
    }[];
  };
  sixthSection: {
    mainTitle: string;
    mainTitle_ar: string;
    subTitle: string;
    subTitle_ar: string;
    description: string;
    description_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    name: string;
    name_ar: string;
    designation: string;
    designation_ar: string;
  };
  seventhSection: {
    title: string;
    title_ar: string;
    buttonText: string;
    buttonText_ar: string;
    link: string;
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
      name: string;
      name_ar: string;
      course: string;
      course_ar: string;
    }[];
  };
  eighthSection: {
    title: string;
    title_ar: string;
  };
  ninethSection: {
    items: {
      image: string;
      imageAlt: string;
      imageAlt_ar: string;
    }[];
  };
  tenthSection: {
    title: string;
    title_ar: string;
    description: string;
    description_ar: string;
    image: string;
    imageAlt: string;
    imageAlt_ar: string;
    buttonText: string;
    buttonText_ar: string;
  };
};
