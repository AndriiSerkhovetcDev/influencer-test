import { TContact } from "./contact.type";


export type TProfileUserContact = {
  user_id: string;
  username: string;
  url: string;
  picture: string;
  fullname: string;
  contacts: TContact[];
}
