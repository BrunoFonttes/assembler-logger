import { Transport } from './transport'
import { CloudWatchOptions } from '@logger/interfaces/loggerOptions.interface'

export class CloudwatchTransport extends Transport<CloudWatchOptions> {
  protected get online(): boolean {
    return true
  }
}
