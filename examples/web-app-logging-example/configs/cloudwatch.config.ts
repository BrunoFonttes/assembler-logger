import { CloudWatchLogs } from '@aws-sdk/client-cloudwatch-logs';

export const cloudwatchLogs = new CloudWatchLogs({
  apiVersion: '2014-03-28',
  region: 'us-east-2',
});
