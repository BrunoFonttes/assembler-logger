import { CloudWatchLogs } from '@aws-sdk/client-cloudwatch-logs'

import { AllowedLevel } from './assemblerLogger.interface'

interface DefaultTransportOptions {
  level?: AllowedLevel
  silent?: boolean
}

export interface CloudWatchOptions extends DefaultTransportOptions {
  logGroupName: string
  cloudwatchLogs: CloudWatchLogs
  awsOptions?: {
    awsRegion: string
    awsSecretKey: string
    awsAccessKeyId: string
  }
  logStreamName?: string
}

export interface ConsoleOptions extends DefaultTransportOptions {
  prettyPrint: boolean
}
