import Employee from '../models/employee.model';
import { success, error } from '../utils/response';

export const listEmployee: Handler = async (req, res) => {
  try {
    const employee = await Employee.find()
      .populate('enterprise', 'nameEnterprise address');

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
  
  const { name, lastname, charge, department, phoneNumber, email, enterprise } = req.body;

  if (name && email && charge && phoneNumber && department && lastname && enterprise) {
    try {
      const employee = new Employee({ name, lastname, charge, department, phoneNumber, email, enterprise });
      const employeeFind = await Employee.findOne({ email });

      if (employeeFind) {
        return error(res, 'Employee already exists', 400);
      } else {
        await employee.save();
        return success(res, employee, 201);
      }
    } catch (err) {
      return error(res, err.message, 500);
    }
  } else {
    return error(res, 'Enter all data', 400);
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

  try {
    const employeeUpdated = await Employee.findByIdAndUpdate(_id, req.body, { new: true });

    !employeeUpdated ? error(res, 'Employee not found', 404) : success(res, employeeUpdated, 200);

  } catch (err) {
    return error(res, err.message, 500);
  }
}
