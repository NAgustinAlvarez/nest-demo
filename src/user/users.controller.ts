import {
  Controller,
  Post,
  Body,
  BadRequestException,
  UseInterceptors,
  Req,
  Get,
  UseGuards,
  Param,
  NotFoundException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "./dto/userBody.dto";
import { DateAdderInterceptor } from "../interceptors/date-adderInterceptor";
import { userDbService } from "./users.db.service";
import { AuthGuard } from "../guards/auth.guard";
import { Roles } from "../decorators/decorator.roles";
import { Role } from "./roles.enum";
import { RolesGuard } from "../guards/roles.guard";
import { User } from "./user.entity";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserSignInDto } from "./dto/userSignin.dto";
@ApiTags("Users")
@Controller("users")
export class UserController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: userDbService,
  ) {}
  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }
  @ApiBearerAuth()
  @Get("admin")
  @UseGuards(AuthGuard, RolesGuard)
  @Roles([Role.Admin])
  getAdmin() {
    return "ruta protegida ";
  }
  @UseGuards(AuthGuard)
  @Get("profile")
  getp(@Req() request: Express.Request & { user: any }) {
    console.log(request.user);
    return "Este endpoint retorna el perfil del usuario";
  }
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<User> {
    try {
      return await this.userService.findOneById(id);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      throw new NotFoundException(error.message);
    }
  }
  @Post("signup")
  @UseInterceptors(DateAdderInterceptor)
  async postUsers(
    @Body() user: UserDto,
    @Req() request: Request & { now: string },
  ) {
    return await this.authService.signUp({
      ...user,
      createdAT: request.now,
      isAdmin: false,
    });
  }

  @Post("signin")
  async signIn(@Body() user: UserSignInDto) {
    const { email, password } = user;
    if (!email || !password) {
      throw new BadRequestException("Email y contraseña son requeridos.");
    }
    return this.authService.signIn(email, password);
  }
}
