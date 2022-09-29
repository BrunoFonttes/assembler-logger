import { MetaData } from './metadata.data'

export type InfoLogData = {
  message: string
  data?: unknown
  identifier: string
}

export type ErrorLogData = {
  message: string
  exceptionName?: string
  stack?: string
  code?: string
}

export type FunctionInfoLogData = InfoLogData & Partial<MetaData>

export type FunctionErrorLogData = ErrorLogData & Partial<MetaData>
