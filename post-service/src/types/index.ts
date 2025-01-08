export interface Post {
  id: number;
  title: string;
}

export type Event = {
  type: string;
  payload: any;
};
