import { Room } from "./room.model";
import { User } from "./user.model";

export interface Task{
  id:string;
  room:Room;
  user:User;
  priority:string;
  observations:string;
  status:string;
}
