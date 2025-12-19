export interface Booking {
  id: string;
  session: string;
  totalAmount: string;
  services: {
    price: number;
    serviceName: string;
  }[];
  groupNumber: number;
  event: {
    venue: string;
    city: string;
  };
}
