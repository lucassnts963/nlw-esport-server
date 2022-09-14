import { Router } from 'express';

import { AdController } from '../controllers';

const routes = Router();

routes.get('/ads/:id/discord', AdController.getDiscord);

export default routes;
