import { AppContextData } from './appContext.data'

export type HttpWorkerData = {
  requestBody: unknown
  statusCode: string
  origin: string
}

export type HttpWorkerLogData = HttpWorkerData & {
  context: AppContextData
}
