import { ConcreteLoggerBuilderStub } from './stubs/concreteLoggerBuilder.stub'
import { CloudWatchOptions } from '@logger/interfaces/loggerOptions.interface'

const sut = new ConcreteLoggerBuilderStub()
const cloudwatchOptions = {} as CloudWatchOptions

describe('tests concrete logger builder', () => {
  it('should build a cloudwatch transport', () => {
    sut.setCloudwatchTransport('default', cloudwatchOptions)
    expect(sut.transports).toStrictEqual(['mockedCloudwatchTransport'])
    expect(sut.exceptionHandlers).toStrictEqual([])
  })

  it('should build a console transport', () => {
    sut.setConsoleTransport('default', { prettyPrint: true })
    expect(sut.transports).toStrictEqual(['mockedCloudwatchTransport', 'mockedConsoleTransport'])
    expect(sut.exceptionHandlers).toStrictEqual([])
  })

  it('should build a cloudwatch exceptionHandler', () => {
    sut.setCloudwatchTransport('exception', cloudwatchOptions)
    expect(sut.transports).toStrictEqual(['mockedCloudwatchTransport', 'mockedConsoleTransport'])
    expect(sut.exceptionHandlers).toStrictEqual(['mockedCloudwatchTransport'])
  })

  it('should build a console exceptionHandler', () => {
    sut.setConsoleTransport('exception', { prettyPrint: true })
    expect(sut.transports).toStrictEqual(['mockedCloudwatchTransport', 'mockedConsoleTransport'])

    expect(sut.exceptionHandlers).toStrictEqual([
      'mockedCloudwatchTransport',
      'mockedConsoleTransport',
    ])
  })

  it('should reset the transports added previously', () => {
    sut.reset()
    expect(sut.transports).toStrictEqual([])
    expect(sut.exceptionHandlers).toStrictEqual([])
  })
})
