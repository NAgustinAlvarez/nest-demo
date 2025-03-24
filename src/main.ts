import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { loggerGlobal } from "./middlewares/logger.middleware";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { config as auth0Config } from "./config/auth0";
import { auth } from "express-openid-connect";
// import { AuthGuard } from "./guards/auth.guard";
import "module-alias/register";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalGuards(new AuthGuard());
  app.use(loggerGlobal);
  app.use(auth(auth0Config));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constrains: error.constraints };
        });
        return new BadRequestException({
          alert: "Se han detectado los siguientes errores",
          errors: cleanErrors,
        });
      },
    }),
  );
  const swaggerConfig = new DocumentBuilder()
    .setTitle("Demo-nest")
    .setDescription("Esta es una API de ejemplo para backend-henry")
    .addBearerAuth()
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
