import { v4 as uuid } from 'uuid'

import { TransportStrategy, TransportStrategyOptions } from './transport.strategy'

export class IntervalStrategyTransport extends TransportStrategy {
  private changed = false

  private lastLogInfo = {
    streamName: '',
    date: new Date(+0),
  }

  private intervalInSeconds: number

  constructor(props: TransportStrategyOptions, intervalInSeconds: number) {
    super(props)
    this.intervalInSeconds = intervalInSeconds
  }

  hasToCreateNewLogger(): boolean {
    const hasToCreateNewLogger = this.changed
    this.changed = false

    return hasToCreateNewLogger
  }

  configureCloudwatchTransport() {
    if (this.cloudwatch) {
      const now = new Date()

      if (!this.isInLastLogStreamInterval(now)) {
        this.updateLastLogInfo(now)
        this.changed = true
      }

      this.cloudwatch = {
        ...this.cloudwatch,
        logStreamName: this.lastLogInfo.streamName,
      }
    }
  }

  private isInLastLogStreamInterval(date: Date) {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const SECONDS_IN_MILISECONDS = 1000

    return (
      date.getTime() - this.lastLogInfo.date.getTime() <
      this.intervalInSeconds * SECONDS_IN_MILISECONDS
    )
  }

  private updateLastLogInfo(date: Date) {
    this.lastLogInfo = {
      streamName: `i-${uuid()}`,
      date,
    }
  }
}
