export interface IUser {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  email: string;
  password: string;
  postCount: number;
  isBlocked: boolean;
  isAdmin: boolean;
  role: string;
  viewedBy: string[];
  followers: string[];
  following: string[];
  active: boolean;
  posts: string[];
}
