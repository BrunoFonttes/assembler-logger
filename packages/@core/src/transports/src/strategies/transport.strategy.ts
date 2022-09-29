import { ConsoleTransport } from '../entities'
import { CloudwatchTransport } from '../entities/cloudwatchTransport'
import { TransportStrategyInterface } from '../interfaces/transportStrategy.interface'
import {
  AllowedLevel,
  CloudWatchOptions,
  ConsoleOptions,
  TransportsOptions,
} from '@logger/interfaces'

export type TransportStrategyOptions = {
  cloudwatch?: CloudwatchTransport
  console?: ConsoleTransport
  level: AllowedLevel
  online: boolean
}
export abstract class TransportStrategy implements TransportStrategyInterface {
  protected console?: ConsoleOptions

  protected cloudwatch?: CloudWatchOptions

  constructor(props: TransportStrategyOptions) {
    this.cloudwatch = props.cloudwatch?.getOptions(props.online)
    this.console = props.console?.getOptions(props.online)
  }

  get transports(): TransportsOptions {
    return {
      cloudwatch: this.cloudwatch,
      console: this.console,
    }
  }

  configureTransports() {
    this.configureCloudwatchTransport()
  }

  abstract configureCloudwatchTransport(): void

  abstract hasToCreateNewLogger(): boolean
}
