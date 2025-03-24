import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "./../src/app.module";

describe("AppController (e2e)", () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it("get /users return an array of users with an okey status code", async () => {
    const req = await request(app.getHttpServer()).get("/users");
    console.log(req.body);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Array);
  });
  it("get /users/:id returns with an ok status code", async () => {
    const req = await request(app.getHttpServer()).get(
      "/users/17677128-6f74-4484-9459-8e031da5162f",
    );
    console.log(req.body);
    expect(req.status).toBe(200);
    expect(req.body).toBeInstanceOf(Object);
  });
  it("get /users/:id returns with an notFoundException message", async () => {
    const req = await request(app.getHttpServer()).get(
      "/users/17677128-6f74-4484-9259-8e031da5162f",
    );
    console.log(req.body);
    expect(req.status).toBe(404);
    expect(req.body).toBeInstanceOf(Object);
  });
});
