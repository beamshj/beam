export interface ContactPage {
  firstSection: FirstSection;
  secondSection: SecondSection;
  _id: string;
  __v: number;
  banner: string;
  bannerAlt: string;
  metaDescription: string;
  metaTitle: string;
  pageTitle: string;
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
