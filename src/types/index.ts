export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  available: boolean;
  addedAt: string;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  name: string;
}

export interface CanteenInfo {
  name: string;
  proprietor: string;
  contact: string;
  queries: string;
}