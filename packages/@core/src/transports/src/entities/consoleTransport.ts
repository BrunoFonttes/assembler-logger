import { Transport } from './transport'
import { ConsoleOptions } from '@logger/interfaces/loggerOptions.interface'

export class ConsoleTransport extends Transport<ConsoleOptions> {
  protected get online(): boolean {
    return false
  }
}
