export interface Player {
    id: string;
    firstName: string;
    lastName: string;
    age: number;
    position: string;
    nationality: string;
    imageUrl: string;
    city: string;
    phoneNumber: string;
    dateOfBirth: Date;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}