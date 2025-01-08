export interface Post {
  id: number;
  title: string;
}

export type Event = {
  type: 'POST_CREATED' | 'COMMENT_CREATED';
  payload: any;
};
