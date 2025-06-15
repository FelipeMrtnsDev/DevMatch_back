import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface Payload {
  userId: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: "Token ausente" });
    return;
  }

  const [, token] = authHeader.split(" ");

  try {
    console.log("SEGREDO NA VERIFICAÇÃO:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Payload;

    req.user = {
      id: decoded.userId,
    };

    next();
  } catch (error) {
    res.status(401).json({ message: "Token inválido" });
  }
}