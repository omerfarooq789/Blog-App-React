export type BlogType = {
  id: number;
  title: string;
  body: string;
  userId: number;
};
export type NewBlog = {
  title: string;
  body: string;
  userId: number;
};
export type GetPostProp = {
  post: BlogType;
  limit?: number;
};
