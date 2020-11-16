import Employee from '../models/employee.model';
import { success, error } from '../utils/response';
import { getPages } from '../utils/pages';

export const listEmployee: Handler = async (req, res) => {
  try {
    const { limit, skip } = getPages(req.query.page as string, Number(req.query.limit));

    const employee = await Employee.find()
      .populate('enterprise', 'nameEnterprise address')
      .limit(limit).skip(skip).exec()

    if (employee.length === 0) {
      return error(res, 'No employees', 400);
    } else {
      return success(res, employee, 200);
    }
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export const saveEmployee: Handler = async (req, res) => {
  const id = req.user.id;
  const { email } = req.body;
  try {
    const employee = new Employee({
      enterprise: id,
      ...req.body
    });
    const employeeFind = await Employee.findOne({ email });

    if (employeeFind) {
      return error(res, 'Employee already exists', 400);
    } else {
      console.log(id);
      await employee.save();
      return success(res, employee, 201);
    }
  } catch (err) {
    return error(res, err.message, 500);
  }

}

export const removeEmployee: Handler = async (req, res) => {
  const { _id } = req.body;
  try {
    const employeeDeleted = await Employee.findByIdAndDelete(_id);

    !employeeDeleted ? error(res, 'Employee not found', 404) : success(res, null, 200);

  } catch (err) {
    return error(res, err.message, 500);
  }
}

export const updateEmployee: Handler = async (req, res) => {
  const { _id } = req.body;
  const enterprise = req.user.id;

  try {
    const employeeChanges = {
      ...req.body,
      enterprise
    }
    const employeeUpdated = await Employee.findByIdAndUpdate(_id, employeeChanges, { new: true });

    !employeeUpdated ? error(res, 'Employee not found', 404) : success(res, employeeUpdated, 200);

  } catch (err) {
    return error(res, err.message, 500);
  }
}
