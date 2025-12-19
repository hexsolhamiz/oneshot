export interface Trial {
  id: string;
  city: string;
  eventDate: Date;
  amSessionStartTime: string;
  amSessionEndTime: string;
  pmSessionStartTime: string;
  venue: string;
  participants: number;
  pmSessionEndTime: string;
  totalCapacity: number;
  amCapacity: number;
  pmCapacity: number;
  standardPrice: number;
  videoPackage: boolean;
  cvCreationPackage: boolean;
  photoPackage: boolean;
  proPlayerPackage: boolean;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  bookings: {
    session: string;
    player: {
      firstName: string;
      lastName: string;
      age: number;
      position: string;
    };
  }[];
}
