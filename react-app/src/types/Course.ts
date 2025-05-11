import { Base } from "./Base";

export interface Course extends Base {
  id: string;
  code: string; // Format: COSCxxxx
  name: string;
  semester: string;
}
