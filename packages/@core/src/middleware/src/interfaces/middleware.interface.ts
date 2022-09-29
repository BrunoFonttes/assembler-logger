export type AdapterOptions = 'http' | 'app'
export interface HttpRequest {
  url: string
  method: string
  id?: string
  body?: Record<string, unknown>
  query?: Record<string, unknown>
  params?: Record<string, string>
  path?: unknown
  headers: Record<string, unknown>
}

export interface HttpResponse {
  headers: unknown
  statusCode: number
}

export type AMiddleware = (req: HttpRequest, res: HttpResponse) => void

export type AMiddlewareConfig = {
  adapterMethod: 'http' | 'app'
  middleware: AMiddleware
}
