import { ApiTester } from './api-tester/api-tester.tsx'
import { Counter } from './counter/counter.tsx'

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
