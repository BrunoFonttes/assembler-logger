import { AMiddleware } from './middleware.interface'

export interface FrameworkAdapterInterface<T> {
  app: (middleware: AMiddleware) => T
  http: (middleware: AMiddleware) => T
}
