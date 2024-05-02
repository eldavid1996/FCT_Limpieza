export interface Task {
  room: {
    roomNumber: string,
    floor: string,
    type: string,
    status: string,
    id: string,
    createdDate: Date
  },
  user: {
    name: string;
    surname: string;
    username: string;
    birthDate: Date;
    password: string;
    email: string;
    phoneNumber: string;
    cp: string;
    city: string;
    id: string,
  },
  priority: string,
  observations: string,
  id: string,
  createdDate: Date
}
