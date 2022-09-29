import { TransportStrategy, TransportStrategyOptions } from './transport.strategy'

export class TraceStrategyTransport extends TransportStrategy {
  private traceId: string

  constructor(props: TransportStrategyOptions, traceId: string) {
    super(props)
    this.traceId = traceId
  }

  hasToCreateNewLogger(): boolean {
    return false
  }

  configureCloudwatchTransport(): void {
    if (this.cloudwatch) {
      this.cloudwatch = {
        ...this.cloudwatch,
        logStreamName: this.traceId,
      }
    }
  }
}
