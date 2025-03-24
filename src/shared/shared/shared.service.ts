import { Global, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
@Global()
@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      // eslint-disable-next-line @typescript-eslint/require-await
      useFactory: async (ConfigService: ConfigService) => {
        console.log("JWT_KEY:", process.env.JWT_KEY);
        const secret = ConfigService.get<string>("JWT_KEY");
        if (!secret) {
          throw new Error("no hay secret");
        }
        return { secret, signOptions: { expiresIn: "1h" } };
      },
    }),
  ],
  exports: [JwtModule],
})
export class SharedModule {}
