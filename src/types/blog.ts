export interface ArticleType {
  _id: string;
  title: string;
  subtitle?: string;
  content?: string;
  previewImg: string;
  category?: string;
  readTime?: number;
  tags?: string;
}
