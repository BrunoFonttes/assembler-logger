import { TransportStrategy } from './transport.strategy'

export class DefaultStrategyTransport extends TransportStrategy {
  hasToCreateNewLogger(): boolean {
    return false
  }

  configureCloudwatchTransport() {
    if (this.cloudwatch) {
      this.cloudwatch = {
        ...this.cloudwatch,
        logStreamName: this.cloudwatch.logStreamName || 'unidentified-stream',
      }
    }
  }
}
