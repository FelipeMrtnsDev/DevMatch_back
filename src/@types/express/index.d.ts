import { User } from "../../domain/entities/User.js"; 

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
    }
  }
}