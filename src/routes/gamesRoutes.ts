import { Router } from 'express';

import { GameController } from '../controllers';

const routes = Router();

routes.get('/games', GameController.findAll);

routes.post('/games', GameController.create);

routes.get('/games/:id/ads', GameController.findAllAdsByGame);

routes.post('/games/:id/ads', GameController.createAdForAGame);

export default routes;
