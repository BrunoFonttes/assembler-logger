import { appContext } from '@logger/entities'
import { AMiddleware, FrameworkAdapterInterface } from '@middleware/interfaces'
import { NextFunction, Request, Response } from 'express'

type ExpressMiddleware = (req: Request, res: Response, next: NextFunction) => void

export const expressAdapter: FrameworkAdapterInterface<ExpressMiddleware> = {
  app: (middleware: AMiddleware) => (req: Request, res: Response, next: NextFunction) => {
    appContext.getAsyncLocalStorage().run(new Map(), () => {
      middleware(req, { ...res, headers: res.getHeaders() })
      next()
    })
  },
  http: (middleware: AMiddleware) => (req: Request, res: Response, next: NextFunction) => {
    res.on('finish', () => {
      middleware(req, { ...res, headers: res.getHeaders() })
    })

    next()
  },
}
