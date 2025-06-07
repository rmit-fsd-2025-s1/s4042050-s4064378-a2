import { Base } from "./Base";
import { User } from "./User";

export interface Candidate extends Base {
  id: number;
  user: User;
}
