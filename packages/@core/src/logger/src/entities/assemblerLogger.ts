/* eslint-disable import/no-named-as-default-member */
import { ErrorLogData, FunctionErrorLogData, FunctionInfoLogData, InfoLogData, MetaData } from '.'
import { AllowedLevel, AssemblerLoggerInterface, ConcreteLogger } from '../interfaces'
import { TransportStrategyInterface } from '@transports/interfaces'
import { TransportDirector } from '@transports/transportDirector'

export class AssemblerLogger implements AssemblerLoggerInterface {
  private level: AllowedLevel

  private applicationName: string

  private _logger?: ConcreteLogger

  private step = 0

  private transportStrategy: TransportStrategyInterface

  private exceptionStrategy: TransportStrategyInterface

  private transportDirector: TransportDirector

  private _metaData?: MetaData

  constructor(props: {
    level: AllowedLevel
    applicationName: string
    transportStrategy: TransportStrategyInterface
    exceptionStrategy: TransportStrategyInterface
    transportDirector: TransportDirector
  }) {
    this.level = props.level
    this.applicationName = props.applicationName
    this.exceptionStrategy = props.exceptionStrategy
    this.transportStrategy = props.transportStrategy
    this.transportDirector = props.transportDirector
  }

  get logger(): ConcreteLogger {
    this.transportStrategy.configureTransports()

    if (!this._logger || this.transportStrategy.hasToCreateNewLogger()) {
      this.transportDirector.loggerBuilder.reset()

      this.transportDirector.construct(
        this.transportStrategy.transports,
        this.exceptionStrategy.transports,
        this.level,
      )

      this._logger = this.transportDirector.loggerBuilder.getLogger()
    }

    return this._logger
  }

  set metaData(metaData: MetaData) {
    this._metaData = metaData
  }

  child(props?: { functionName: string }) {
    const metaData: MetaData = {
      ...this._metaData,
      functionName: props?.functionName,
      application: { name: this.applicationName },
    }

    return {
      info: (data: InfoLogData) => this.info({ ...metaData, ...data }),
      error: (data: ErrorLogData) => this.error({ ...metaData, ...data }),
      debug: (data: Record<string, unknown>) => this.debug({ ...metaData, ...data }),
    }
  }

  info(data: FunctionInfoLogData) {
    this.log('info', data)
  }

  error(data: FunctionErrorLogData) {
    this.log('error', data)
  }

  debug(data: Record<string, any>) {
    this.log('debug', data)
  }

  private log(level: AllowedLevel, data: any) {
    this.logger[level]({ ...data, step: this.step })
    this.step += 1
  }
}
