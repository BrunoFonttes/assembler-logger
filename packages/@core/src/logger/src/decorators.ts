/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { appContext } from './entities/appContext'
import { AssemblerLoggerInterface } from './interfaces/assemblerLogger.interface'

const base62 = require('base62/lib/ascii')

type Constructor = { new (...args: any[]): any }

export function Logger<T extends Constructor>(target: T) {
  return class extends target {
    constructor(...args: any[]) {
      super(args)
      const assemblerLogger = appContext.getAssemblerLogger()

      assemblerLogger.metaData = {
        classData: { name: target.name || 'not-in-a-class' },
        context: {
          traceId: appContext.getTraceId() as string,
        },
      }

      this.assemblerLogger = assemblerLogger
    }
  }
}

export function ioLog() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value

    descriptor.value = function (...args: any[]) {
      const generateSalt = () => Math.floor(Math.random() * 1001) + 1000
      const generateNewIdentifier = () => base62.encode(Date.now() + generateSalt())

      const assemblerLogger = (this as { assemblerLogger: AssemblerLoggerInterface })
        .assemblerLogger

      const child = assemblerLogger.child({
        functionName: propertyKey,
      })

      child.info({
        message: 'input',
        data: args,
        identifier: `I-${generateNewIdentifier()}`,
      })

      const result = original.call(this, ...args)

      child.info({
        message: 'output',
        data: result,
        identifier: `O-${generateNewIdentifier()}`,
      })

      return result
    }

    return descriptor
  }
}
