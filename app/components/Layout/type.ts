export interface FooterData {
  footerTitle?: string;
  footerTitle_ar?: string;
  addressSection?: {
    lineOne?: string;
    lineOne_ar?: string;
    email?: string;
    lineThree?: string;
    lineThree_ar?: string;
    lineFour?: string;
    lineFour_ar?: string;
  };
  quickLinksSection?: {
    title?: string;
    title_ar?: string;
    quickLinks?: {
      name?: string;
      name_ar?: string;
      link?: string;
    }[];
  };
  socialLinks: {
    links: {
      link?: string;
      icon: string;
      iconAlt?: string;
    }[];
  };
}
