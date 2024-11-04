// @types/express/index.d.ts
import { JwtPayload } from "jsonwebtoken";

declare module "express-serve-static-core" {
  interface Request {
    user?: string | JwtPayload; // Defina o tipo de `user` conforme necessário, dependendo do seu payload JWT
  }
}
