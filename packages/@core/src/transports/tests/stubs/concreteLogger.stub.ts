/* eslint-disable @typescript-eslint/no-unused-vars */
import { ConcreteLogger } from '@logger/interfaces/assemblerLogger.interface'

export const concreteLoggerStub: ConcreteLogger = {
  info: (data: unknown): void => {},
  error: (data: unknown): void => {},
  debug: (data: unknown): void => {},
}
