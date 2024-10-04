import { User } from "./User";

export interface Post {
  id: number;
  title: string;
  userId: number;
  body: string;
  user: User | null;
}
