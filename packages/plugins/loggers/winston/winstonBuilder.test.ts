/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CloudWatchLogs } from '@aws-sdk/client-cloudwatch-logs'
import * as winston from 'winston'
import WinstonCloudWatch from 'winston-cloudwatch'

import { WinstonBuilder } from './winstonBuilder'

jest.mock('winston', () => {
  const originalModule = jest.requireActual('winston')

  return {
    __esModule: true,
    ...originalModule,
  }
})

const createLoggerSpy = jest
  .spyOn(winston, 'createLogger')
  .mockReturnValue({} as unknown as winston.Logger)

const consoleRawFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  const msg = `${timestamp} ${level}: ${JSON.stringify(
    metadata ? { ...metadata, message } : message,
  )}\n`

  return msg
})

const consolePrettyFormat = winston.format.printf(({ level, message, timestamp, ...metadata }) => {
  const msg = `${timestamp} ${level}: ${JSON.stringify(
    metadata ? { ...metadata, message } : message,
    null,
    4,
  )}\n`

  return msg
})

const prettyPrintFormat = winston.format.combine(
  winston.format.prettyPrint(),
  winston.format.colorize(),
  consolePrettyFormat,
)

const sut = new WinstonBuilder()
sut.setLevel('error')

beforeEach(() => {
  sut.reset()
})

describe('tests winstonBuilder', () => {
  describe('tests level hierarchy', () => {
    describe('given a debug level for the transport', () => {
      it('should build a console transport with pretty print and the main level config (error) ', () => {
        sut.setConsoleTransport('default', {
          prettyPrint: true,
          level: 'debug',
        })

        expect(JSON.stringify(sut.transports)).toStrictEqual(
          JSON.stringify([
            new winston.transports.Console({
              format: prettyPrintFormat,
              level: 'error',
            }),
          ]),
        )
      })

      it('should build a console transport with raw print and the main level config (error) ', () => {
        sut.setConsoleTransport('default', {
          prettyPrint: false,
          level: 'debug',
        })

        expect(JSON.stringify(sut.transports)).toStrictEqual(
          JSON.stringify([
            new winston.transports.Console({
              format: consoleRawFormat,
              level: 'error',
            }),
          ]),
        )
      })

      it('should build a cloudwatch transport with the main level config (error) ', () => {
        sut.setCloudwatchTransport('default', {
          logGroupName: 'logGroupNameTeste',
          logStreamName: 'logStreamNameTeste',
          level: 'debug',
          cloudwatchLogs: new CloudWatchLogs({
            apiVersion: '2014-03-28',
            region: 'us-east-2',
          }),
          awsOptions: {
            awsRegion: 'region',
            awsSecretKey: 'secret',
            awsAccessKeyId: 'key',
          },
        })

        expect(JSON.stringify(sut.transports)).toStrictEqual(
          JSON.stringify([
            new WinstonCloudWatch({
              name: 'Cloudwatch',
              level: 'error',
              ensureLogGroup: true,
              logGroupName: 'logGroupNameTeste',
              logStreamName: 'logStreamNameTeste',
              jsonMessage: true,
              awsRegion: 'region',
              awsSecretKey: 'secret',
              awsAccessKeyId: 'key',
            }),
          ]),
        )
      })

      it('should build a cloudwatch transport with the transport level config (info)', () => {
        const debugSut = new WinstonBuilder()
        debugSut.setLevel('debug')

        debugSut.setCloudwatchTransport('default', {
          logGroupName: 'logGroupNameTeste',
          logStreamName: 'logStreamNameTeste',
          level: 'info',
          cloudwatchLogs: new CloudWatchLogs({
            apiVersion: '2014-03-28',
            region: 'us-east-2',
          }),
          awsOptions: {
            awsRegion: 'region',
            awsSecretKey: 'secret',
            awsAccessKeyId: 'key',
          },
        })

        expect(JSON.stringify(debugSut.transports)).toStrictEqual(
          JSON.stringify([
            new WinstonCloudWatch({
              name: 'Cloudwatch',
              level: 'info',
              ensureLogGroup: true,
              logGroupName: 'logGroupNameTeste',
              logStreamName: 'logStreamNameTeste',
              jsonMessage: true,
              awsRegion: 'region',
              awsSecretKey: 'secret',
              awsAccessKeyId: 'key',
            }),
          ]),
        )
      })
    })
  })

  it('should return logger properly', () => {
    const debugSut = new WinstonBuilder()
    debugSut.setLevel('debug')

    debugSut.setConsoleTransport('default', {
      prettyPrint: true,
      level: 'debug',
    })

    debugSut.setConsoleTransport('exception', {
      prettyPrint: true,
      level: 'error',
    })

    debugSut.setCloudwatchTransport('default', {
      logGroupName: 'logGroupNameTeste',
      logStreamName: 'logStreamNameTeste',
      level: 'error',
      cloudwatchLogs: new CloudWatchLogs({
        apiVersion: '2014-03-28',
        region: 'us-east-2',
      }),
      awsOptions: {
        awsRegion: 'region',
        awsSecretKey: 'secret',
        awsAccessKeyId: 'key',
      },
    })

    debugSut.getLogger()

    expect(JSON.stringify(createLoggerSpy.mock.calls[0][0])).toStrictEqual(
      JSON.stringify({
        format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
        level: 'debug',
        levels: {
          error: 0,
          info: 1,
          debug: 10,
        },
        transports: debugSut.transports,
        handleExceptions: true,
        exceptionHandlers: debugSut.exceptionHandlers,
      }),
    )
  })
})
