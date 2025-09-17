import { INestApplication } from '@nestjs/common'
import { Test } from '@nestjs/testing'
import request from 'supertest'
import { HealthController } from './health.controller.js'
import { HealthModule } from './health.module.js'

describe(HealthController, () => {
  let app: INestApplication

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      imports: [HealthModule],
    })
      .compile()

    app = ref.createNestApplication()

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  describe('/health', () => {
    test('GET', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/health')
        .expect(200)

      expect(body).toEqual({
        result: expect.objectContaining({
          status: 'ok',
          details: {
            app: {
              status: 'up',
            },
            db: {
              status: 'up',
            },
          },
        }),
      })
    })
  })
})
