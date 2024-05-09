export interface Task {
  Id?: string;
  User: TaskUser;
  Room: TaskRoom;
  Priority?: string;
  Observations?: string;
  Status?: string;
  createdDate?: Date;
}

interface TaskUser {
  Id: string;
}

interface TaskRoom {
  Id: string;
  roomNumber: string;
}
