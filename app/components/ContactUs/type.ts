export interface ContactPage {
  firstSection: FirstSection;
  secondSection: SecondSection;
  _id: string;
  __v: number;
  banner: string;
  bannerAlt: string;
  bannerAlt_ar: string;
  metaDescription: string;
  metaTitle: string;
  pageTitle: string;
  pageTitle_ar: string;
}

export interface FirstSection {
  mainTitle: string;
  subTitle: string;
  phone: string;
  email: string;
  map: string;
  description: string;
  address: string;
}

export interface SecondSection {
  title: string;
  description: string;
  title_ar: string;
  description_ar: string;
  items: SchoolItem[];
}

export interface SchoolItem {
  image: string;
  imageAlt: string;
  title: string;
  location: string;
  link: string;
  _id: string;
}
