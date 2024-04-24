import { User } from "../components/user-table/user.model";

export class UserService{
  private userList: User[] = [
    {
      "id": "1",
      "name": "Luis",
      "surname": "Martínez",
      "password": "contraseña1",  // Ejemplo de contraseña
      "email": "luis.martinez@example.com",
      "dni": "12345678A",
      "phone": "600 123 456",
      "birthDate": new Date("1992-09-01T00:00:00Z"),
      "pc": "28001",
      "city": "Madrid",
      "admin":0,
      "token": "token1"  // Ejemplo de token
    },
    {
      "id": "2",
      "name": "Ana",
      "surname": "González",
      "password": "contraseña2",  // Ejemplo de contraseña
      "email": "ana.gonzalez@example.com",
      "dni": "87654321B",
      "phone": "600 987 654",
      "birthDate": new Date("1998-02-06T00:00:00Z"),
      "pc": "08001",
      "city": "Barcelona",
      "admin":0,
      "token": "token2"  // Ejemplo de token
    },
    {
      "id": "3",
      "name": "Carlos",
      "surname": "Pérez",
      "password": "contraseña3",  // Ejemplo de contraseña
      "email": "carlos.perez@example.com",
      "dni": "56789012C",
      "phone": "600 111 222",
      "birthDate": new Date("1992-02-06T00:00:00Z"),
      "pc": "41001",
      "city": "Sevilla",
      "admin":0,
      "token": "token3"  // Ejemplo de token
    },
    {
      "id": "4",
      "name": "Elena",
      "surname": "Rodríguez",
      "password": "contraseña4",  // Ejemplo de contraseña
      "email": "elena.rodriguez@example.com",
      "dni": "34567890D",
      "phone": "600 333 444",
      "birthDate": new Date("1995-02-06T00:00:00Z"),
      "pc": "46001",
      "city": "Valencia",
      "admin":0,
      "token": "token4"  // Ejemplo de token
    }
  ];

  getUsers(){
    return this.userList.slice();//Para que devuelva una copia
  }

  getUser(id: string): User | null {
    const filteredUsers = this.userList.filter(user => user.id === id);

    if (filteredUsers.length > 0) {
      return filteredUsers[0]; // Devuelve el primer usuario que cumpla la condición
    } else {
      return null; // Devuelve null si no se encuentra ningún usuario con ese id
    }
  }
}
