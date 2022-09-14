import { Router } from 'express';

import gamesRoutes from './gamesRoutes';
import adsRoutes from './adsRoutes';

const routes = Router();

routes.use(gamesRoutes, adsRoutes);

export default routes;
