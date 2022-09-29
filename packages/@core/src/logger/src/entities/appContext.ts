import { AsyncLocalStorage } from 'async_hooks'

import { AssemblerLoggerInterface } from '../interfaces/assemblerLogger.interface'

class AppContext {
  private asyncLocalStorage: AsyncLocalStorage<Map<string, unknown>>

  constructor() {
    this.asyncLocalStorage = new AsyncLocalStorage()
  }

  getAsyncLocalStorage() {
    return this.asyncLocalStorage
  }

  getTraceId() {
    return this.get('traceId') || 'unknown-traceId'
  }

  setTraceId(traceId?: string) {
    this.set('traceId', traceId)
  }

  setAssemblerLogger(logger: AssemblerLoggerInterface) {
    this.set('logger', logger)
  }

  getAssemblerLogger() {
    return this.get('logger') as AssemblerLoggerInterface
  }

  private get(key: string) {
    return this.asyncLocalStorage.getStore()?.get(key)
  }

  private set(key: string, value: unknown) {
    this.asyncLocalStorage.getStore()?.set(key, value)
  }
}

export const appContext = new AppContext()
