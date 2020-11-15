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

    try {
        const regex = new RegExp(search, 'i');

        switch (collection) {
            case 'employee':
                const employee = await Employee.find({ name: regex })
                    .populate('enterprise', 'nameEnterprise address');
                
                employee.length > 0 ? success(res, employee, 200) : error(res, 'Employee not found', 404);
                
                break;
            case 'enterprise':
                const enterprise = await Enterprise.find({ nameEnterprise: regex });
                enterprise.length > 0 ? success(res, enterprise, 200) : error(res, 'Enterprise not found', 404);
                break;

            default:
                return error(res, 'The collection does not exist', 400);
        }
    } catch (err) {
        return error(res, err.message, 500);
    }

}
