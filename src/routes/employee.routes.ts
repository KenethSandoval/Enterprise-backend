import { Router } from 'express';
import { listEmployee, saveEmployee, removeEmployee, updateEmployee } from '../controllers/employee.controller';

const router = Router();

router.route('/employee')
    .get(listEmployee)
    .post(saveEmployee)
    .delete(removeEmployee)
    .put(updateEmployee)

/*
router.put('/employees/:id', employeeController.editeEmployee);
router.get('/findEmployee', employeeController.findEmployee);
router.get('/employeesTotal', employeeController.totalEmployees);*/

export default router;