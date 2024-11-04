import { Module } from "@nestjs/common";
import { AppResolver } from "./app.resolver";
import { AppService } from "./app.service";
import { DatabaseModule } from "./database/database.module";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { UsersModule } from "./users/users.module";
import path from "node:path";

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.resolve(process.cwd(), "src/schema.gql"),
    }),
    UsersModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
