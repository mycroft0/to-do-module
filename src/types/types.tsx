export type User = {
  login: string;
  password: string;
};
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt?: number;
}
