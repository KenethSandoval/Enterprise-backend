import { Router } from 'express';

import employeeRoute from './employee.routes';
import enterpriseRoute from './enterprise.routes';
import searchRoute from './search.routes';

const routes = Router();

routes.use('/', employeeRoute);
routes.use('/', enterpriseRoute);
routes.use('/todo', searchRoute);

export default routes;