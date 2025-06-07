import { Base } from "./Base";
import { User } from "./User";

export interface Lecturer extends Base {
  id: number;
  user: User;
}
