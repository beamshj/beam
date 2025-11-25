// type.ts

export interface LeadershipItem {
  _id: string;
  name: string;
  image: string;
  imageAlt: string;
  designation: string;
  description: string; // HTML string
}
export interface beamLeadershipItem {
  id: string;
  name: string;
  image: string;
  imageAlt?: string;
  designation?: string;
  description?: string; // HTML string
  bullets?: string[];

}

export interface FirstSection {
  title: string;
  description: string;
  items: LeadershipItem[];
}

export interface LeadershipData {
  _id: string;
  banner: string;
  bannerAlt: string;
  pageTitle: string;
  metaTitle: string;
  metaDescription: string;
  firstSection: FirstSection;
  __v: number;
}

export interface LeadershipApiResponse {
  data: LeadershipData;
  message: string;
}
