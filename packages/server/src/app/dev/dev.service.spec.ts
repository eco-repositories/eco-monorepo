import { Test } from '@nestjs/testing'
import { DevService } from './dev.service.js'

describe(DevService, () => {
  let service: DevService

  beforeAll(async () => {
    const ref = await Test.createTestingModule({
      providers: [DevService],
    }).compile()

    service = ref.createNestApplication().get(DevService)
  })

  it('should return greeting', async () => {
    const greeting = await service.getGreeting()

    expect(greeting).toEqual('Hello from dev service!')
  })
})
