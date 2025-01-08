export type CommentStatus = 'Pending' | 'Approved' | 'Rejected';

export type Comment = {
  id: number;
  postId: number;
  content: string;
  status: CommentStatus;
};

export type Post = {
  id: number;
  title: string;
  comments: Comment[];
};

export type Event<T extends string, P> = {
  type: T;
  payload: P;
};

export type PostCreatedEvent = Event<'POST_CREATED', Post>;
export type CommentCreatedEvent = Event<'COMMENT_CREATED', Comment>;
export type CommentModeratedEvent = Event<'COMMENT_MODERATED', Comment>;
export type CommentUpdatedEvent = Event<'COMMENT_UPDATED', Comment>;
export type AllEvents = PostCreatedEvent | CommentCreatedEvent | CommentModeratedEvent | CommentUpdatedEvent;
