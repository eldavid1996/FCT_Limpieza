export interface Task {
  Id?: string;
  User: TaskUser;
  Room: TaskRoom;
  Priority?: string;
  Observations?: string;
  Status?: string;
  createdDate?: Date;
}

export interface TaskUser {
  Id: string;
}

export interface TaskRoom {
  Id: string;
  roomNumber: string;
}
