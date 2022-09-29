import { HttpData, HttpWorkerData } from '../entities'
import { AMiddlewareConfig, HttpRequest, HttpResponse } from '../interfaces/middleware.interface'
import { appContext } from '@logger/entities/appContext'
import { LoggerFactory, LoggerOptions } from '@logger/factories'

export class LoggerMiddlewareFactory {
  constructor(private loggerOptions: LoggerOptions) {}

  createTraceMiddleware(): AMiddlewareConfig {
    return {
      adapterMethod: 'app',
      middleware: (req: HttpRequest) => {
        const loggerFactory = new LoggerFactory(this.loggerOptions)
        loggerFactory.createTraceLogger(this.getTraceId(req))
        appContext.setTraceId(this.getTraceId(req))
      },
    }
  }

  createIntervalMiddleware(intervalInSeconds: number): AMiddlewareConfig {
    return {
      adapterMethod: 'app',
      middleware: (req: HttpRequest) => {
        const loggerFactory = new LoggerFactory(this.loggerOptions)
        loggerFactory.createIntervalLogger(intervalInSeconds)

        appContext.setTraceId(this.getTraceId(req))
      },
    }
  }

  createHttpMiddleware(): AMiddlewareConfig {
    return {
      adapterMethod: 'http',
      middleware: (req: HttpRequest, res: HttpResponse) => {
        const loggerFactory = new LoggerFactory(this.loggerOptions)

        const assemblerLogger = loggerFactory.createTraceLogger(this.getTraceId(req))

        const httpData: HttpData = {
          url: req.url,
          method: req.method,
          requestHeaders: JSON.stringify(req.headers),
          responseHeaders: JSON.stringify(res.headers),
          requestBody: req.body,
          pathParameters: req.params,
          queryParameters: req.query as Record<string, string>,
          statusCode: res.statusCode.toString(),
        }

        assemblerLogger.info({
          message: 'web app request-response log',
          identifier: 'trace',
          data: httpData,
          context: {
            traceId: this.getTraceId(req),
          },
        })
      },
    }
  }

  createHttpWorkerMiddleware(): AMiddlewareConfig {
    return {
      adapterMethod: 'http',
      middleware: (req: HttpRequest, res: HttpResponse) => {
        const loggerFactory = new LoggerFactory(this.loggerOptions)
        const assemblerLogger = loggerFactory.createTraceLogger(this.getTraceId(req))

        const httpWorkerData: HttpWorkerData = {
          origin: (req.body?.origin as string) || 'unknown-origin',
          requestBody: req.body,
          statusCode: res.statusCode.toString(),
        }

        assemblerLogger.info({
          message: 'worker request-response log',
          identifier: 'trace',
          data: httpWorkerData,
          context: {
            traceId: this.getTraceId(req),
          },
        })
      },
    }
  }

  private getTraceId(req: HttpRequest) {
    const traceId =
      req.id || (req.body?.traceId as string) || (req.headers?.['x-request-id'] as string)

    if (!traceId) {
      throw new Error('traceId required')
    }

    return `${traceId}`
  }
}
