import { ApiTester } from './api-tester/api-tester.js'
import { Counter } from './counter/counter.js'

export const Home: React.FC = () => {
  return (
    <main>
      <section>
        <Counter/>
      </section>
      <section>
        <ApiTester/>
      </section>
    </main>
  )
}
