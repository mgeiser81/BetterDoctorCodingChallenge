import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import DoctorRouter from './routes/doctorRouter';

class app {

  public express: express.Application;

  constructor() {
    this.express = express();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    let router = express.Router();

    router.get('/', (req, res, next) => {
      res.json({
        message: 'Hello and welcome to the Better Doctor coding challenge...'
      });
    });

    this.express.use('/', router);
    this.express.use('/api/v1/doctors', DoctorRouter);
  }

}

export default new app().express;