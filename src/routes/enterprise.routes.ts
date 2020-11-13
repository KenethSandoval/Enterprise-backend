import { Router } from 'express';
import { saveEnterprise, listEnterprise, login, removeEnterprise, updateEnterprse } from '../controllers/enterprise.controller';
import authMiddleware from '../middlewares/auth.middleware';

const router = Router();

router.route('/enterprise')
    .post(saveEnterprise)
    .get(listEnterprise)
    .delete(authMiddleware, removeEnterprise)
    .put(authMiddleware, updateEnterprse)

router.route('/enterprise/signin')
    .post(login)

export default router;

/*
api.delete('/deleteEnterprice/:id',middlewareAuth.ensureAuth, enterpriseController.deleteEnterprise);
api.put('/updateEnterprise/:id',middlewareAuth.ensureAuth, enterpriseController.updateEnterprise);

//Empleados dentro de la empresa
api.put('/addEmployee/:idEmpresa', middlewareAuth.ensureAuth, enterpriseController.addEmployee);
api.put('/updateEidmployee/:idEn/:idEm', middlewareAuth.ensureAuth, enterpriseController.updateEmployee);
api.put('/removeEmployee/:idEn/:idEm', middlewareAuth.ensureAuth, enterpriseController.removeEmployee);
api.get('/employeesTotal/:id', enterpriseController.employeesTotal);

//Registro
api.post('/login', enterpriseController.login);
api.get('/pruebaMiddleware', middlewareAuth.ensureAuth, enterpriseController.pruebaMiddleware);

module.exports = api;*/