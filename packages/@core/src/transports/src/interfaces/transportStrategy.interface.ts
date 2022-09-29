import { TransportsOptions } from '@logger/interfaces/assemblerLogger.interface'

export interface TransportStrategyInterface {
  configureCloudwatchTransport: () => void
  configureTransports(): void
  get transports(): TransportsOptions
  hasToCreateNewLogger(): boolean
}
