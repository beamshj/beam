export interface NewsItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  coverImage: string;
  popularNews: string;
  coverImageAlt: string;
  thumbnail: string;
  thumbnailAlt: string;
  date: string;
  content: string;
  createdAt: string;
  metaTitle: string;
  metaDescription: string;
}

export interface Category {
  _id: string;
  name: string;
  news: NewsItem[] | string;
}

export interface BlogResponse {
  _id: string;
  __v: number;
  banner: string;
  bannerAlt: string;
  bannerAlt_ar: string;
  categories: Category[];
  metaDescription: string;
  metaDescription_ar: string;
  metaTitle: string;
  metaTitle_ar: string;
  pageTitle: string;
  pageTitle_ar: string;
}
