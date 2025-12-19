export interface User{
  user : { id: number;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  role: string;
  playerProfile : {
    id: number;
    firstName: string;
    lastName: string;
    imageUrl: string | null;
    position: string;
    age: number;
    phoneNumber: string;
    dateOfBirth : string;
    nationality : string;
    bio: string;
    userId: number;
  }
  }
}