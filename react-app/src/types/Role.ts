import { Base } from "./Base";
import { Course } from "./Course";

export interface Role extends Base {
  id: number;
  roleName: "tutor" | "lab-assistant";
  course: Course;
  description?: string;
}
