import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { random } from '@@shared/random/random.js'
import { randomChoice } from '@@shared/random/random-choice.js'
import { BalanceEvent } from './balance-event.model.js'
import { Category } from './category.model.js'
import { User } from './user.model.js'

export interface Data {
  readonly user: User
  readonly category: Category
  readonly balanceEvent: BalanceEvent
}

export interface DataList {
  readonly users: User[]
  readonly categories: Category[]
  readonly balanceEvents: BalanceEvent[]
}

@Injectable()
export class TestService {
  protected readonly firstNames = [
    'Alexander',
    'Amelia',
    'Ava',
    'Benjamin',
    'Charlotte',
    'Elijah',
    'Emily',
    'Emma',
    'Ethan',
    'Harper',
    'Henry',
    'Isabella',
    'Jackson',
    'Liam',
    'Lucas',
    'Mia',
    'Noah',
    'Olivia',
    'Samuel',
    'Sophia',
  ] as const

  protected readonly lastNames = [
    'Adams',
    'Anderson',
    'Brown',
    'Clark',
    'Davis',
    'Gonzalez',
    'Hall',
    'Hernandez',
    'Johnson',
    'Lee',
    'Lewis',
    'Martinez',
    'Rodriguez',
    'Smith',
    'Taylor',
    'Turner',
    'Walker',
    'White',
    'Wilson',
    'Wright',
  ] as const

  constructor(
    @InjectModel(BalanceEvent)
    protected readonly balanceEventModel: typeof BalanceEvent,

    @InjectModel(Category)
    protected readonly categoryModel: typeof Category,

    @InjectModel(User)
    protected readonly userModel: typeof User,
  ) {}

  async createRandomUser(): Promise<User> {
    const name = `${randomChoice(this.lastNames)} ${randomChoice(this.firstNames)}` as const
    const user = await this.userModel.create({
      name,
      isActive: true,
    })

    return user
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.findAll()

    return users
  }

  async createRandomBalanceEvent(): Promise<BalanceEvent> {
    const balanceEvent = await this.balanceEventModel.create({
      timestamp: Date.now(),
      entityBalance: random(100),
    })

    return balanceEvent
  }

  async getAllBalanceEvents(): Promise<BalanceEvent[]> {
    const users = await this.balanceEventModel.findAll()

    return users
  }

  async createRandomCategory(): Promise<Category> {
    const category = await this.categoryModel.create({
      name: `whatever-${Date.now()}`,
      type: randomChoice(['expense', 'income'] as const),
    })

    return category
  }

  async getAllCategories(): Promise<Category[]> {
    const users = await this.categoryModel.findAll()

    return users
  }

  async createRandomData(): Promise<Data> {
    const [
      balanceEvent,
      category,
      user,
    ] = await Promise.all([
      this.createRandomBalanceEvent(),
      this.createRandomCategory(),
      this.createRandomUser(),
    ])

    return {
      balanceEvent,
      category,
      user,
    }
  }

  async getAllData(): Promise<DataList> {
    const [
      balanceEvents,
      categories,
      users,
    ] = await Promise.all([
      this.getAllBalanceEvents(),
      this.getAllCategories(),
      this.getAllUsers(),
    ])

    return {
      balanceEvents,
      categories,
      users,
    }
  }
}
