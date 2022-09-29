import { TransportOptions } from '../concreteLoggerBuilder'
import { AllowedLevel, ConcreteLogger } from './assemblerLogger.interface'
import { CloudWatchOptions, ConsoleOptions } from './loggerOptions.interface'

export interface ConcreteLoggerBuilderInterface<Transport> {
  get transports(): Transport[]

  get exceptionHandlers(): Transport[]
  getLogger(): ConcreteLogger
  reset(): void

  setLevel(level: AllowedLevel): void
  setCloudwatchTransport(type: TransportOptions, options: CloudWatchOptions): void

  setConsoleTransport(type: TransportOptions, options: ConsoleOptions): void
}
