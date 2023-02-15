import { IUser } from './user.interface';
import { IPost } from './post.interface';
import { IComment } from './comment.interface';
import { ICategory } from './category.interface';

export interface IServiceResponse {
  status: number;
  success: boolean;
  message?: string | Error[];
  data?: IUser | IUser[] | IPost | IPost[] | IComment | IComment[] | ICategory | ICategory[] | unknown;
  token?: string;
}
