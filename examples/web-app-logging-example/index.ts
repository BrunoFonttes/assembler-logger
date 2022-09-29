import express from 'express';
import expressRequestId from 'express-request-id';

import { Hero } from './services/hero';
import { assemblerLogger, assemblerHttpLogger } from './middlewares/assemblerLogger';

const app = express();

app
  .use(express.json())
  /**
   * é necessário usar o middleware expressRequestId ou outro que crie um id
   * por requisição e armazene o mesmo no campo req.id
   * */
  .use(expressRequestId())

  .use(assemblerLogger)
  .use(assemblerHttpLogger)

  .get('/', (req, res) => {
    const hero = new Hero({ name: 'Geralt', armor: 50, hp: 70 });
    hero.takesDamage({ damage: 15 });
    res.sendStatus(200);
  })
  .post('/store/:storeId', (req, res) => {
    const hero = new Hero({ name: 'Geralt', armor: 50, hp: 70 });
    hero.takesDamage({ damage: 15 });
    res.sendStatus(200);
  });

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:${3000}`);
});
