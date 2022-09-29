import {
  ErrorLogData,
  FunctionErrorLogData,
  FunctionInfoLogData,
  InfoLogData,
  MetaData,
} from '../entities'
import { CloudWatchOptions, ConsoleOptions } from './loggerOptions.interface'

export interface AssemblerLoggerInterface {
  child: (props?: { functionName: string }) => {
    info: (data: InfoLogData) => void
    error: (data: ErrorLogData) => void
    debug: (data: Record<string, any>) => void
  }
  info: (data: FunctionInfoLogData) => void

  error: (data: FunctionErrorLogData) => void

  debug: (data: Record<string, any>) => void

  set metaData(metaData: MetaData)
}

export type AllowedLevel = 'error' | 'info' | 'debug'

export type TransportsOptions = {
  cloudwatch?: CloudWatchOptions
  console?: ConsoleOptions
}

export type ConcreteLogger = {
  info: (data: unknown) => void
  error: (data: unknown) => void
  debug: (data: unknown) => void
}
