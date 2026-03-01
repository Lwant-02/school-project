export type FuelType = "Petrol" | "Diesel" | "Electric" | "Hybrid";
export type GearType = "Automatic" | "Manual";
export type CarStatus = "available" | "sold";

export interface Car {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: FuelType;
  gear: GearType;
  image: string;
  description: string;
  status: CarStatus;
  createdAt: string;
}
