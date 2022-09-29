import { TransportDirector } from '../src/transportDirector'
import { ConcreteLoggerBuilderStub } from './stubs/concreteLoggerBuilder.stub'
import { TransportsOptions } from '@logger/interfaces/assemblerLogger.interface'
import { CloudWatchOptions } from '@logger/interfaces/loggerOptions.interface'

const loggerBuilder = new ConcreteLoggerBuilderStub()
const sut = new TransportDirector(loggerBuilder)
const cloudwatchOptions = {} as CloudWatchOptions

beforeEach(() => {
  sut.loggerBuilder.reset()
})

describe('tests transportDirector', () => {
  it('should build only cloudwatch transports', () => {
    const transportsOptions: TransportsOptions = {
      cloudwatch: cloudwatchOptions,
    }
    sut.construct(transportsOptions, {}, 'debug')
    expect(sut.loggerBuilder.exceptionHandlers).toStrictEqual([])
    expect(sut.loggerBuilder.transports).toStrictEqual(['mockedCloudwatchTransport'])
  })

  it('should build only console transports', () => {
    const transportsOptions: TransportsOptions = {
      console: { prettyPrint: true },
    }
    sut.construct(transportsOptions, {}, 'debug')
    expect(sut.loggerBuilder.exceptionHandlers).toStrictEqual([])
    expect(sut.loggerBuilder.transports).toStrictEqual(['mockedConsoleTransport'])
  })

  it('should build only console exception handlers', () => {
    const exceptionHandlers: TransportsOptions = {
      console: { prettyPrint: true },
    }
    sut.construct({}, exceptionHandlers, 'debug')
    expect(sut.loggerBuilder.transports).toStrictEqual([])
    expect(sut.loggerBuilder.exceptionHandlers).toStrictEqual(['mockedConsoleTransport'])
  })

  it('should build only cloudwatch exception handlers', () => {
    const exceptionHandlers: TransportsOptions = {
      cloudwatch: cloudwatchOptions,
    }
    sut.construct({}, exceptionHandlers, 'debug')
    expect(sut.loggerBuilder.transports).toStrictEqual([])
    expect(sut.loggerBuilder.exceptionHandlers).toStrictEqual(['mockedCloudwatchTransport'])
  })
})
