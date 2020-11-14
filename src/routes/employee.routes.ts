import { Router } from 'express';
import { listEmployee, saveEmployee, removeEmployee, updateEmployee } from '../controllers/employee.controller';
import authMiddleware from '../middlewares/auth.middleware'

const router = Router();

router.route('/employee')
    .get(listEmployee)
    .post(authMiddleware, saveEmployee)
    .delete(authMiddleware, removeEmployee)
    .put(authMiddleware, updateEmployee)

export default router;