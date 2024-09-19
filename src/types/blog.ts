export interface ArticleType {
  _id?: string;
  title: string;
  subtitle?: string;
  content?: string;
  previewImg: string;
  category?: string;
  readTime?: number;
  tags?: string;
  createdAt?: Date,
  updatedAt?: Date,
  views?: number,
  comments?: CommentType[],
}

export interface CommentType {
  _id: string;
  uid: string;
  articleId: string;
  content: string;
  answerTo: string;
  createdAt?: Date,
  updatedAt?: Date,
  replies: CommentType[];
}