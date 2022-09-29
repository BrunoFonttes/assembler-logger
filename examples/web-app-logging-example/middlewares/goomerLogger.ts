import {
  AbstractMiddlewareFactory,
  LoggerMiddlewareFactory,
  LoggerOptions,
} from '../../../lib';
import { expressAdapter } from '../../../src/adapters';
import { WinstonBuilder } from '../../../src/libs/winston/winstonBuilder';
import { cloudwatchLogs } from '../configs/cloudwatch.config';

const cloudwatchOptions = {
  /**
   * o grupo pode representar a aplicação ou um contexto.
   */
  logGroupName: 'poc-web-app-log-group',
  /**
   * O level aqui é opcional.
   * Caso não seja passado aqui, o level do transporte será herdado da config global.
   * Deixei error por default para checar o funcionamento.
   */
  // level: 'error',
  cloudwatchLogs,
  awsOptions: {
    // se não passar, pega do usuário setado no aws config
    awsRegion: process.env.AWS_DEFAULT_REGION as string,
    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    awsSecretKey: process.env.AWS_SECRET_KEY as string,
  },
};
const loggerOptions: LoggerOptions = {
  /**
   *  o nome do projeto no qual está rodando o logger
   */
  applicationName: (process.env.APPLICATION_NAME as string) || 'unknown-application',
  /**
   * é possível filtrar os logs por levels específicos como error/debug
   * o default é info
   */
  level: 'debug',
  /**
   * aqui configuramos a condição para transportar o logger online(ex.: cloudwatch, elastic )
   *  ou offline apenas(console.log)
   */
  online: true,
  /**
   * aqui configuramos a condição para ativar o modo de debug
   *  por ambiente sem precisar setar o level manualmente
   */
  debugMode: process.env.DEBUG_MODE === 'true',
  transports: {
    cloudwatch: cloudwatchOptions,
    console: {
      prettyPrint: true,
      // prettyPrint: process.env.NODE_ENV !== 'production',
      /**
       * podemos configurar a opção silent para usar esse transporte apenas em
       * determinadas condições.
       */
      // silent: process.env.NODE_ENV === 'production',
    },
  },
  exceptionHandlers: {
    cloudwatch: {
      ...cloudwatchOptions,
      logStreamName: 'UncaughtExceptionsStream',
    },
    console: { prettyPrint: process.env.NODE_ENV !== 'production' },
  },
  loggerBuilder: new WinstonBuilder(),
};

const loggerMiddlewareFactory = new LoggerMiddlewareFactory(loggerOptions);

const abstractMiddlewareFactory = new AbstractMiddlewareFactory(loggerMiddlewareFactory, expressAdapter);

const assemblerLogger = abstractMiddlewareFactory.createTraceLogger();
const assemblerHttpLogger = abstractMiddlewareFactory.createHttpLogger();

export { assemblerLogger, assemblerHttpLogger };
