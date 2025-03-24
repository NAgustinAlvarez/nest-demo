import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import typeOrmConfig from "./config/typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DataSourceOptions } from "typeorm";
import { TodosModule } from "./todos/todos.module";
import { UserModule } from "./user/users.module";
// import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
      envFilePath: ".env.development",
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DataSourceOptions>("typeorm");
        if (!config) {
          throw new Error("No se encontró la configuración de TypeORM.");
        }
        console.log(process.env.JWT_KEY); // Verifica que JWT_KEY esté disponible
        return config;
      },
    }),
    TodosModule,
    UserModule,
    // JwtModule.registerAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     // Verifica el valor de JWT_KEY
    //     const jwtKey = configService.get<string>("JWT_KEY");
    //     console.log("JWT_KEY desde ConfigService:", jwtKey);

    //     if (!jwtKey) {
    //       throw new Error(
    //         "JWT_KEY no está definido en las variables de entorno.",
    //       );
    //     }

    //     // Devuelve la configuración
    //     return {
    //       global: true,
    //       secret: jwtKey, // Usa el valor obtenido
    //       signOptions: { expiresIn: "1h" },
    //     };
    //   },
    // }),
  ],
  providers: [],
})
export class AppModule {}
