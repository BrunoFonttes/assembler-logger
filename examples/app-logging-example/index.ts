import { LoggerFactory } from '../../lib';
import { LoggerBuilderFactory } from '../../src/configs';
import { cloudwatchLogs } from '../web-app-logging-example/configs/cloudwatch.config';

const cloudwatchOptions = {
  logGroupName: 'poc-app-log-group',
  cloudwatchLogs,
  // level: 'info',
  awsOptions: {
    awsRegion: process.env.AWS_DEFAULT_REGION as string,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    awsSecretKey: process.env.AWS_SECRET_KEY as string,
  },
};
try {
  const assemblerLogger = new LoggerFactory({
    loggerBuilder: LoggerBuilderFactory.createWinstonBuilder(),
    level: 'debug',
    applicationName: 'Teste',
    online: true,
    debugMode: true,
    transports: {
      cloudwatch: cloudwatchOptions,
      console: {
        prettyPrint: true,
        // prettyPrint: process.env.NODE_ENV !== 'production',
        // silent: true,
      },
    },
    exceptionHandlers: {
      cloudwatch: {
        ...cloudwatchOptions,
        logStreamName: 'UncaughtExceptionsStream',
      },
      console: { prettyPrint: process.env.NODE_ENV !== 'production' },
    },
  }).createIntervalLogger(3);

  /** !!!!!!!!!!!!!!
   *
   * Checar documentação/comentários no arquivo:
   * examples/web-app-logging-example/middlewares/assemblerLogger.ts
   */
  const run = () => {
    assemblerLogger.debug({ message: 'hello world4', aeho: '123' });
    setTimeout(() => {
      assemblerLogger.debug({ message: 'olamundo' });
    }, 5000);
    assemblerLogger.info({
      message: 'info',
      identifier: '',
      context: {
        traceId: '',
      },
    });
    assemblerLogger.error({
      message: 'error',
      context: {
        traceId: '',
      },
    });
  };

  void run();
} catch (e) {
  console.log(e);
}
