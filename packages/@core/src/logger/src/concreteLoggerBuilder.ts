import {
  AllowedLevel,
  CloudWatchOptions,
  ConcreteLogger,
  ConcreteLoggerBuilderInterface,
  ConsoleOptions,
} from './interfaces'

export type TransportOptions = 'exception' | 'default'

export abstract class ConcreteLoggerBuilder<Transport>
  implements ConcreteLoggerBuilderInterface<Transport>
{
  protected _transports: Transport[] = []

  protected _exceptionHandlers: Transport[] = []

  protected level: AllowedLevel = 'debug'

  protected abstract levelsConfig: Record<AllowedLevel, number>

  get transports(): Transport[] {
    return this._transports
  }

  get exceptionHandlers(): Transport[] {
    return this._exceptionHandlers
  }

  public reset() {
    this._transports = []
    this._exceptionHandlers = []
  }

  public setLevel(level: AllowedLevel) {
    this.level = level
  }

  protected getTransportLevel(level?: AllowedLevel) {
    return level && this.levelsConfig[level] <= this.levelsConfig[this.level] ? level : this.level
  }

  protected addTransport(type: TransportOptions, transport: Transport) {
    const handler: Record<TransportOptions, () => void> = {
      exception: () => this._exceptionHandlers.push(transport),
      default: () => this._transports.push(transport),
    }
    handler[type]()
  }

  abstract getLogger(): ConcreteLogger

  abstract setCloudwatchTransport(type: TransportOptions, options: CloudWatchOptions): void

  abstract setConsoleTransport(type: TransportOptions, options: ConsoleOptions): void
}
