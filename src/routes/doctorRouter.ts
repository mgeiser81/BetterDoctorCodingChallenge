import { Router, Request, Response, NextFunction } from 'express';
import BetterDoctorApi from '../better-doctor';
import EsConfig from '../elastic';
import * as requestify from 'requestify';

class DoctorRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  public elastic(req: Request, res: Response, next: NextFunction) {
    const es = new EsConfig();
    es.matchAll('doctors', 'doctor')
        .then(data => {
            res.json(data);
            res.end();
        });
  }
  
  public search(req: Request, res: Response, next: NextFunction) {
    let query = req.query.name;
    if (!query) {
        res.sendStatus(422);
        return res.end();
    }

    const es = new EsConfig();
    const api = new BetterDoctorApi();

    api.doctorSearch(query, 0, 10)
        .then(results => {
            for (var d in results.data) {
                var item = results.data[d];
                es.addDoctorDocument(item.uid, item);
            }

            res.json(results.data);
            return res.end();
        })
        .catch(err => {
            console.error(err)
            res.sendStatus(401);
            return res.end();
        });
  }

  init() {
    this.router.get('/search', this.search);
    this.router.get('/elastic', this.elastic);
  }
}

const doctorRoutes = new DoctorRouter();
doctorRoutes.init();

export default doctorRoutes.router;