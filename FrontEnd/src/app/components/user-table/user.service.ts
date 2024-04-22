import { User } from "./user.model";

export class UserService{
  private userList: User[] = [
    {
      id: "1",
      birthDate: new Date("1990-05-15"),
      name: "Luis",
      surname: "Martínez",
      email: "luis.martinez@example.com",
      phone: "600 123 456",
      pc: "28001",
      city: "Madrid"
    },
    {
      id: "2",
      birthDate: new Date("1985-08-20"),
      name: "Ana",
      surname: "González",
      email: "ana.gonzalez@example.com",
      phone: "600 987 654",
      pc: "08001",
      city: "Barcelona"
    },
    {
      id: "3",
      birthDate: new Date("1993-03-10"),
      name: "Carlos",
      surname: "Pérez",
      email: "carlos.perez@example.com",
      phone: "600 111 222",
      pc: "41001",
      city: "Sevilla"
    },
    {
      id: "4",
      birthDate: new Date("1988-11-25"),
      name: "Elena",
      surname: "Rodríguez",
      email: "elena.rodriguez@example.com",
      phone: "600 333 444",
      pc: "46001",
      city: "Valencia"
    }
  ];

  getUsers(){
    return this.userList.slice();//Para que devuelva una copia
  }
}
