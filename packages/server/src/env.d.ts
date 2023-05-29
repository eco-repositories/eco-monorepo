import 'vitest/globals'

declare global {
  namespace ServerApp {
    interface HttpResponse<Result> {
      readonly result: Result
    }
  }
}
