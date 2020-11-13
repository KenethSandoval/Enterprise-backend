import { Router } from 'express';

import employeeRoute from './employee.routes';
import enterpriseRoute from './enterprise.routes';

const routes = Router();

routes.use('/', employeeRoute);
routes.use('/', enterpriseRoute);

export default routes;