export interface Post {
  id: number;
  title: string;
  comments: Comment[];
}

export type Comment = {
  id: number;
  content: string;
};

export type Event = {
  type: 'POST_CREATED' | 'COMMENT_CREATED';
  payload: any;
};
