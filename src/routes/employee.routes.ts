import { Router } from 'express';
import { listEmployee, saveEmployee, removeEmployee, updateEmployee } from '../controllers/employee.controller';
import authMiddleware from '../middlewares/auth.middleware'

const router = Router();

router.route('/employee')
    .get(listEmployee)
    .post(authMiddleware, saveEmployee)
    .delete(authMiddleware, removeEmployee)
    .put(authMiddleware, updateEmployee)

/*
router.put('/employees/:id', employeeController.editeEmployee);
router.get('/findEmployee', employeeController.findEmployee);
router.get('/employeesTotal', employeeController.totalEmployees);*/

export default router;