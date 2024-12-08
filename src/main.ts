import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { ExpressAdapter } from "@nestjs/platform-express";
import express from "express";
import createServer from "@vendia/serverless-express";
// Criação do app Express
const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Configuração global de validação
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      errorHttpStatusCode: 422,
    }),
  );

  // Habilitar CORS, se necessário
  app.enableCors();

  // Inicializa o app NestJS
  await app.init();
}

// Inicializa o bootstrap
bootstrap();

// Exporta o handler para o ambiente serverless
export const handler = createServer({ app: expressApp });
