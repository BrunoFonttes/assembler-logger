import { AssemblerLogger, appContext } from '../entities'
import { AllowedLevel, ConcreteLoggerBuilderInterface, TransportsOptions } from '../interfaces'
import { CloudwatchTransport, ConsoleTransport } from '@transports/entities'
import { TransportStrategyFactory } from '@transports/factories'
import { TransportStrategyInterface } from '@transports/interfaces'
import { TransportDirector } from '@transports/transportDirector'

export type LoggerOptions = {
  applicationName: string
  transports: TransportsOptions
  exceptionHandlers: TransportsOptions
  loggerBuilder: ConcreteLoggerBuilderInterface<unknown>
  level?: AllowedLevel
  online?: boolean
  debugMode?: boolean
}

/**
 * Absract Factory: Factory de factories
 * A aplicação seleciona o tipo de estratégia de logging
 * e cria o logger em tempo de execução.
 */
export class LoggerFactory {
  private applicationName: string

  private level: AllowedLevel

  private transportStrategyFactory

  private exceptionTransportBuilder

  private loggerBuilder

  private online: boolean

  constructor(props: LoggerOptions) {
    const level = props.debugMode || !props.level ? 'debug' : props.level
    this.level = level
    this.online = props.online || false
    this.applicationName = props.applicationName
    this.loggerBuilder = props.loggerBuilder

    this.exceptionTransportBuilder = this.createExceptionTransportsBuilder(props.exceptionHandlers)

    this.transportStrategyFactory = this.getTransportStrategyFactory(props.transports)
  }

  private get loggerProps() {
    const loggerProps = {
      level: this.level,
      applicationName: this.applicationName,
    }

    return loggerProps
  }

  createExceptionTransportsBuilder(exceptionHandlers: TransportsOptions) {
    const exceptionStrategyFactory = this.getTransportStrategyFactory(exceptionHandlers)
    const exceptionTransportBuilder = exceptionStrategyFactory.createExceptionTransport()

    return exceptionTransportBuilder
  }

  createIntervalLogger(intervalInSeconds: number) {
    const intervalStrategy =
      this.transportStrategyFactory.createIntervalTransport(intervalInSeconds)
    const assemblerLogger = this.createAssemblerLogger(intervalStrategy)

    return assemblerLogger
  }

  createTraceLogger(traceId: string) {
    const traceTransport = this.transportStrategyFactory.createTraceTransport(traceId)
    const assemblerLogger = this.createAssemblerLogger(traceTransport)

    return assemblerLogger
  }

  private getTransportStrategyFactory(transportsOptions: TransportsOptions) {
    const { cloudwatch, console } = transportsOptions
    const cloudwatchTransport = cloudwatch
      ? new CloudwatchTransport({
          silent: cloudwatch.silent,
          options: cloudwatch,
        })
      : undefined
    const consoleTransport = console
      ? new ConsoleTransport({
          silent: console.silent,
          options: console,
        })
      : undefined
    const transportStrategyFactory = new TransportStrategyFactory({
      cloudwatch: cloudwatchTransport,
      console: consoleTransport,
      online: this.online,
      level: this.level,
    })

    return transportStrategyFactory
  }

  private createAssemblerLogger(transportStrategy: TransportStrategyInterface) {
    const assemblerLogger = new AssemblerLogger({
      ...this.loggerProps,
      transportStrategy,
      exceptionStrategy: this.exceptionTransportBuilder,
      transportDirector: new TransportDirector(this.loggerBuilder),
    })
    appContext.setAssemblerLogger(assemblerLogger)

    return assemblerLogger
  }
}
