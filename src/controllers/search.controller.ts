import Employee from '../models/employee.model';
import Enterprise from '../models/enterprise.model';
import { error, success } from '../utils/response';

export const search: Handler = async (req, res) => {
    const search = req.params.filter;
    const regex = new RegExp(search, 'i');

    const [employee, enterprise] = await Promise.all([
        Employee.find({ name: regex }),
        Enterprise.find({ nameEnterprise: regex })
    ]);

    return success(res, { employee, enterprise }, 200);
};

export const collectionDocument: Handler = async (req, res) => {
    const collection = req.params.document;
    const search = req.params.filter;
    const regex = new RegExp(search, 'i');
    let data: any = [];

    switch (collection) {
        case 'employee':
            data = Employee.find({ name: regex });
            break;

        default:
            return error(res, 'The collection does not exist', 400);
    }
    return success(res, data , 200);
}