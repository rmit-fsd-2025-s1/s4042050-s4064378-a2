import { Base } from "./Base";

export interface Course extends Base {
  id: number;
  code: string; // Format: COSCxxxx
  name: string;
  // semester: string;
}
