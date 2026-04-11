export type Users = {
  _id: string;
  id?: string;
  name: string;
  username?: string;
  email?: string;
  dateOfBirth?: string;
  gender?: "male" | "female";
  photo?: string;
  cover?: string;
  bookmarks?: string[];
  followers?: string[];
  following?: string[];
  followersCount?: number;
  followingCount?: number;
  bookmarksCount?: number;
  createdAt?: string;
  updatedAt?: string;
};

export type Post = {
  body: string;
  privacy: string;
  user: Users;
  sharedPost: string | null;
  likes: string[];
  _id: string;
  createdAt: string;
  likesCount: number;
  isShare: boolean;
  image?: string[] | string | null;
  comments?: Comment[];
  commentsCount: number;
  sharesCount: number;
  id: string;
  bookmarked?: boolean;
  topComment?: unknown | null;
};
export type Comment = {
  _id: string;
  content: string;
  createdAt: string;
  likesCount?: number;
  commentCreator?: {
    _id: string;
    name: string;
    username?: string;
    photo?: string;
  };
};

export type CreatePostResponse = {
  post: Post;
};
export type SuggestionUser = {
  _id: string;
  name: string;
  email: string;
  photo?: string;
};
export type UserCard ={
  id: number,
  name : string,
  username: string,
  avatar: string,
  followers: number,
} 
export type Tab = {
  name: string;
  path: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};
export type Notification = {
  id: number;
  name: string;
  avatar: string;
  time: string;
  message: string;
  read: boolean;
};


export type SignUpDTO ={
  name: string;
  email: string;
  password: string;
  rePassword: string;
  dateOfBirth: string;
  gender: "male" | "female";
}
export type SignInData = {
  email: string,
  password: string,
}

export type ChangePasswordData = {
  passward:string,
  newpassward: string,
}
export type Asideleft = "feed" | "myposts" | "community" | "saved";
export type Privacy = "public" | "following" | "only_me";
export type NotificationType= "all" | "unread";



