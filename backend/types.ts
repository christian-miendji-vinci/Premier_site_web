import { Request } from "express";

interface AuthenticatedUser {
  username: string;
  token: string;
}

interface User {
  id: number;
  username: string;
  password: string;
}

interface ProgrammingLanguage {
  id: number;
  description: string;
  name: string;
  image: string;
  text: string;
}

interface Developper {
  id: number;
  name: string;
  registrationNumber: string;
  language: string;
  // Optional Properties
  surname?: string;
  age?: number;
}

interface Products {
  id: number;
  price: number;
  image: string;
  description: string;
  quantityAvailable: number;
}


type NewProogrammingLanguage = Omit<ProgrammingLanguage, "id">;
type NewDevelopper = Omit<Developper, "id">;
type NewProduct = Omit<Products, "id">;
type PotentialUser = Omit<User, "id">;

interface AutenticatedRequest extends Request {
  user?: User;
}

interface JwtPayload {
  username: string;
  exp: number;
  iat: number;
}

export type {
  Developper,
  ProgrammingLanguage,
  Products,
  User,
  JwtPayload,
  AuthenticatedUser,
  NewDevelopper,
  NewProogrammingLanguage,
  NewProduct,
  PotentialUser,
  AutenticatedRequest,
};
