import { TransportOptions } from '@logger/concreteLoggerBuilder'
import { AllowedLevel, ConcreteLoggerBuilderInterface, TransportsOptions } from '@logger/interfaces'

export class TransportDirector {
  constructor(public readonly loggerBuilder: ConcreteLoggerBuilderInterface<unknown>) {}

  construct(
    transportsOptions: TransportsOptions,
    exceptionOptions: TransportsOptions,
    level: AllowedLevel,
  ) {
    this.setConsoleTransport('default', transportsOptions)
    this.setCloudwatchTransport('default', transportsOptions)
    this.setConsoleTransport('exception', exceptionOptions)
    this.setCloudwatchTransport('exception', exceptionOptions)
    this.loggerBuilder.setLevel(level)
  }

  private setConsoleTransport(type: TransportOptions, transport: TransportsOptions) {
    if (transport.console) {
      this.loggerBuilder.setConsoleTransport(type, transport.console)
    }
  }

  private setCloudwatchTransport(type: TransportOptions, transport: TransportsOptions) {
    if (transport.cloudwatch) {
      this.loggerBuilder.setCloudwatchTransport(type, transport.cloudwatch)
    }
  }
}
