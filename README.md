# Assembler Log

Executar exemplo de implementação de logging de app seguindo a estratégia de logging por intervalo de tempo:

```
npm run start:dev:app
```

Executar exemplo de implementação de logging de webApp seguindo a estratégia de logging por request id:

```
npm run start:dev:web-app
```

Para ver os resultados, basta ir na conta da aws vinculada ao usuário passado por parâmetro nas envs ou na de seu usuário de máquina(configurado em .aws) e acessar os logGroups:

1. npm run start:dev:app - (cloudwatch link)[https://us-east-2.console.aws.amazon.com/cloudwatch/home?region=us-east-2#logsV2:log-groups/log-group/poc-app-log-group]
2. npm run start:dev:web-app - (cloudwatch link)[https://us-east-2.console.aws.amazon.com/cloudwatch/home?region=us-east-2#logsV2:log-groups/log-group/poc-web-app-log-group]

O primeiro irá criar os logs dentro de uma stream de log a cada x minutos definidos na configuração do logger. As logStreams são criadas apenas durante a execução do program, ou seja, caso haja um período ocioso, não são cridas logstreams desnecessariamente. Ex.:

config: logstream que comporta 5 min
10:00 - cria e loga na logstream 01
10:03 - loga na logstream 01
10:06 - cria e loga na logstream 02
... nesse período ocioso não é criada nenhuma logstream
11:00 - cria e loga na logstream 03

Já o segundo exemplo irá criar ou apenas logar, caso a stream já exista, em uma logStream por requisição.

Explicação sobre os parâmetros nos exemplos do projeto existentes na pasta ./examples.


## Manutenção

Parar criar novas estratégias de logging basta estender a classe TransportStrategy(src/main/transports) e criar uma nova estratégia na pasta src/strategies

Para adicionar a nova estratégia aos loggers, basta adicionar uma implementação dessa nova estratégia em  src/factories/loggerStrategies.

Para criar uma nova implementação de logger basta criar uma nova config em src/configs/{logger-name} e adicionar a mesma em src/configs/loggerConfigs.ts


