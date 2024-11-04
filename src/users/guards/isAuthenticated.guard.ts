import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Converte o contexto para um contexto GraphQL
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException("Token not provided");
    }

    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded; // Adiciona o usuário decodificado à requisição
      return true; // Permite o acesso
    } catch (err) {
      throw new UnauthorizedException("Invalid token");
    }
  }
}
