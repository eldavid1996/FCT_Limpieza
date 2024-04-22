import { User } from "./user.model";

export class UserService{
  private userList: User[] = [
    {
      id: "1",
      birthDate: new Date("2024-12-02"),
      name: "Jose Carlos",
      surname: "Vélez",
      email: "josvelsei@gmail.com",
      phone: "959 45 78 12",
      pc: "21002",
      city: "Huelva"
    },
    {
      id: "2",
      birthDate: new Date("2024-12-02"),
      name: "Jose Carlos",
      surname: "Vélez",
      email: "josvelsei@gmail.com",
      phone: "959 45 78 12",
      pc: "21002",
      city: "Huelva"
    },
    {
      id: "3",
      birthDate: new Date("2024-12-02"),
      name: "Jose Carlos",
      surname: "Vélez",
      email: "josvelsei@gmail.com",
      phone: "959 45 78 12",
      pc: "21002",
      city: "Huelva"
    },
    {
      id: "4",
      birthDate: new Date("2024-12-02"),
      name: "Jose Carlos",
      surname: "Vélez",
      email: "josvelsei@gmail.com",
      phone: "959 45 78 12",
      pc: "21002",
      city: "Huelva"
    }
  ];

  getUsers(){
    return this.userList;
  }
}
