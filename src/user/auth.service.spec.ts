import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { userDbService } from "./users.db.service";
import { User } from "./user.entity";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
describe("authservice", () => {
  const mockUser: Omit<User, "id"> = {
    name: "Fab",
    createdAT: "01/01/2025",
    email: "dfas@gmail.com",
    password: "12345",
    isAdmin: false,
  };
  let authService: AuthService;
  let mockUserService: Partial<userDbService>; // Declaramos mockUserService en el ámbito superior

  beforeEach(async () => {
    // Asignamos un valor a mockUserService antes de usarlo
    mockUserService = {
      getUserByEmail: () => Promise.resolve(null),
      saveUser: (user: Omit<User, "id">): Promise<User> =>
        Promise.resolve({
          ...user,
          isAdmin: false,
          id: "1234fs-234sd-24csfd-34sdf",
        } as User),
    };
    const mockJwtService = {
      sign: (payload) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        return jwt.sign(payload, "secret123");
      },
    };
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: mockJwtService },
        { provide: userDbService, useValue: mockUserService },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it("Create an instance of AuthService", () => {
    expect(authService).toBeDefined();
  });

  it("signUp() creates a new encrypted password", async () => {
    const user = await authService.signUp(mockUser);
    expect(user).toBeDefined();
    expect(user.password).not.toEqual(mockUser.password);
  });

  it("signUp() throws an error when email is already in use", async () => {
    // Modificamos el método getUserByEmail para simular que el email ya está en uso
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockUserService.getUserByEmail = (email: string) =>
      Promise.resolve(mockUser as User);

    try {
      await authService.signUp(mockUser);
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(error.message).toEqual("Ya existe un usuario con este correo.");
    }
  });
  it("signIn() return an error if the password is invalid", async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockUserService.getUserByEmail = (email: string) =>
      Promise.resolve(mockUser as User);
    try {
      await authService.signIn(mockUser.email, "invalid password");
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      expect(error.message).toBe("Contraseña inválida.");
    }
  });
  it("signIn() return a message and a token if the user is found and the password is valid", async () => {
    const mockUserVariant = {
      ...mockUser,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      password: await bcrypt.hash(mockUser.password, 10),
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mockUserService.getUserByEmail = (email: string) =>
      Promise.resolve(mockUserVariant as User);
    const response = await authService.signIn(
      mockUser.email,
      mockUser.password,
    );
    expect(response).toBeDefined();
    expect(response.token).toBeDefined();
    expect(response.success).toEqual("Usuario logueado correctamente.");
  });
});
