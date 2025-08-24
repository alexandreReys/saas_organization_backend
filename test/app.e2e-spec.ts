import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
// ...existing code...
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const server: any = app.getHttpServer();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const response = await request(server).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('Hello World!');
  });
});
