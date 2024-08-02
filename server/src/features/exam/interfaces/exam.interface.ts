import { userInterface } from "src/features/user/Interfaces/user.interface";

export interface examInterface {
  id: number;
  statement: string;
  name: string;
  questions: Array<>;
  user: object;
}