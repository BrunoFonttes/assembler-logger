/* eslint-disable @typescript-eslint/no-unused-vars */
import { concreteLoggerStub } from './concreteLogger.stub'
import { ConcreteLoggerBuilder, TransportOptions } from '@logger/concreteLoggerBuilder'
import { AllowedLevel, ConcreteLogger } from '@logger/interfaces/assemblerLogger.interface'
import { CloudWatchOptions, ConsoleOptions } from '@logger/interfaces/loggerOptions.interface'

export class ConcreteLoggerBuilderStub extends ConcreteLoggerBuilder<unknown> {
  protected levelsConfig: Record<AllowedLevel, number> = {
    error: 0,
    info: 1,
    debug: 10,
  }

  getLogger(): ConcreteLogger {
    return concreteLoggerStub
  }

  setCloudwatchTransport(type: TransportOptions, options: CloudWatchOptions): void {
    const transport = 'mockedCloudwatchTransport'
    this.addTransport(type, transport)
  }

  setConsoleTransport(type: TransportOptions, options: ConsoleOptions): void {
    const transport = 'mockedConsoleTransport'
    this.addTransport(type, transport)
  }
}
