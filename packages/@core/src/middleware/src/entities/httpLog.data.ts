import { AppContextData } from './appContext.data'

export type HttpData = {
  url: string
  method: string
  requestHeaders: string
  responseHeaders: string
  requestBody: unknown
  pathParameters?: Record<string, string>
  queryParameters?: Record<string, string>
  statusCode: string
}

export type HttpLogData = HttpData & {
  context: AppContextData
}
