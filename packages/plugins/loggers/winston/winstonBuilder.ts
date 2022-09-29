import { ConcreteLoggerBuilder, TransportOptions } from '@logger/concreteLoggerBuilder'
import { AllowedLevel, CloudWatchOptions, ConcreteLogger, ConsoleOptions } from '@logger/interfaces'
import { addColors, createLogger, format, transports } from 'winston'
import WinstonCloudWatch from 'winston-cloudwatch'
import TransportStream from 'winston-transport'

export class WinstonBuilder extends ConcreteLoggerBuilder<TransportStream> {
  protected levelsConfig: Record<AllowedLevel, number> = {
    error: 0,
    info: 1,
    debug: 10,
  }

  private levelColors: Record<AllowedLevel, string> = {
    error: 'bold red',
    info: 'bold green',
    debug: 'bold cyan',
  }

  private consolePrettyFormat = format.printf(({ level, message, timestamp, ...metadata }) => {
    const msg = `${timestamp} ${level}: ${JSON.stringify(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      metadata ? { ...metadata, message } : message,
      null,
      4,
    )}\n`

    return msg
  })

  private consoleRawFormat = format.printf(({ level, message, timestamp, ...metadata }) => {
    const msg = `${timestamp} ${level}: ${JSON.stringify(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      metadata ? { ...metadata, message } : message,
    )}\n`

    return msg
  })

  getLogger(): ConcreteLogger {
    const logger = createLogger({
      format: format.combine(format.timestamp(), format.json()),
      level: this.level,
      levels: this.levelsConfig,
      transports: this._transports,
      handleExceptions: true,
      exceptionHandlers: this._exceptionHandlers,
    })
    addColors(this.levelColors)

    return logger
  }

  setCloudwatchTransport(type: TransportOptions, options: CloudWatchOptions) {
    const cloudwatchTransport = new WinstonCloudWatch({
      name: 'Cloudwatch',
      level: this.getTransportLevel(options.level),
      ensureLogGroup: true,
      logGroupName: options.logGroupName,
      logStreamName: options.logStreamName,
      jsonMessage: true,
      ...options.awsOptions,
    })
    this.addTransport(type, cloudwatchTransport)
  }

  setConsoleTransport(type: TransportOptions, options: ConsoleOptions) {
    const consoleTransport = new transports.Console({
      format: this.getFormat(options.prettyPrint),
      level: this.getTransportLevel(options.level),
    })
    this.addTransport(type, consoleTransport)
  }

  private getFormat(isPrettyPrint: boolean) {
    if (isPrettyPrint) {
      return format.combine(format.prettyPrint(), format.colorize(), this.consolePrettyFormat)
    }

    return this.consoleRawFormat
  }
}
