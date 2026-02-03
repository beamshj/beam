export interface AlumniMainSection {
  title: string;
  description: string;
  imageAlt: string;
  title_ar: string;
  description_ar: string;
  imageAlt_ar: string;
  image: string;
}

export interface AlumniCountryItem {
  _id: string;
  name: string;
  name_ar: string;
  flag: string;
  flagAlt: string;
  flagAlt_ar: string;
  universities: string;
  universities_ar: string;
}

export interface AlumniCountryCardSection {
  items: AlumniCountryItem[];
}

export interface AlumniTestimonialItem {
  _id: string;
  name: string;
  name_ar: string;
  content: string;
  content_ar: string;
  profileImage: string;
  profileImageAlt: string;
  profileImageAlt_ar: string;
}

export interface AlumniTestimonialsSection {
  headingOne: string;
  headingTwo: string;
  headingOne_ar: string;
  headingTwo_ar: string;
  items: AlumniTestimonialItem[];
}

export interface AlumniPageData {
  _id: string;
  mainSection: AlumniMainSection;
  countryCardSection: AlumniCountryCardSection;
  testimonialsSection?: AlumniTestimonialsSection;
  banner: string;
  bannerAlt: string;
  metaTitle: string;
  metaTitle_ar: string;
  metaDescription: string;
  metaDescription_ar: string;
  pageTitle: string;
  __v?: number;
}
