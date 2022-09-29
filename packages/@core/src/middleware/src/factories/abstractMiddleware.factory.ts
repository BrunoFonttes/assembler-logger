import { FrameworkAdapterInterface } from '../interfaces'
import { LoggerMiddlewareFactory } from './loggerMiddleware.factory'

export class AbstractMiddlewareFactory<T> {
  constructor(
    private loggerMiddlewareFactory: LoggerMiddlewareFactory,
    private adapter: FrameworkAdapterInterface<T>,
  ) {}

  public createTraceLogger() {
    const { adapterMethod: method, middleware } =
      this.loggerMiddlewareFactory.createTraceMiddleware()

    return this.adapter[method](middleware)
  }

  public createHttpLogger() {
    const { adapterMethod: method, middleware } =
      this.loggerMiddlewareFactory.createHttpMiddleware()

    return this.adapter[method](middleware)
  }

  public createHttpWorkerLogger() {
    const { adapterMethod: method, middleware } =
      this.loggerMiddlewareFactory.createHttpWorkerMiddleware()

    return this.adapter[method](middleware)
  }

  public createIntervalLogger(intervalInSeconds: number) {
    const { adapterMethod: method, middleware } =
      this.loggerMiddlewareFactory.createIntervalMiddleware(intervalInSeconds)

    return this.adapter[method](middleware)
  }
}
