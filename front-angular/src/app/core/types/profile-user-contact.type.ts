import {TContact} from "./contact.type";
import { TSearchedUser } from "./search-user.type";


export type TProfileUserContact = TSearchedUser & {
  url: string;
  contacts: TContact[];
}
