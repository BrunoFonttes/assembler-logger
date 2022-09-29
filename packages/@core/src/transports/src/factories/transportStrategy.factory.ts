import {
  DefaultStrategyTransport,
  IntervalStrategyTransport,
  TraceStrategyTransport,
  TransportStrategyOptions,
} from '../strategies'

export class TransportStrategyFactory {
  constructor(private options: TransportStrategyOptions) {}

  createIntervalTransport(intervalInSeconds: number) {
    return new IntervalStrategyTransport(this.options, intervalInSeconds)
  }

  createTraceTransport(traceId: string) {
    return new TraceStrategyTransport(this.options, traceId)
  }

  createExceptionTransport() {
    return new DefaultStrategyTransport(this.options)
  }
}
