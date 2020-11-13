import { generateAndSignToken } from '../services/jwt';
import Enterprise from '../models/enterprise.model';
import { success, error } from '../utils/response';

export const saveEnterprise: Handler = async (req, res) => {
  const { nameEnterprise, phone, email, address, password } = req.body;

  if (nameEnterprise && phone && email && address && password) {
    try {
      const enterprise = new Enterprise({ nameEnterprise, phone, email, address, password });
      await enterprise.setPassword(password);

      const enterpriseFind = await Enterprise.findOne({
        $or: [
          { nameEnterprise },
          { email },
          { address }
        ]
      });

      if (enterpriseFind) {
        return error(res, 'Employee already exists', 400);
      } else {
        const newEnterprise = await enterprise.save();
        const token = await generateAndSignToken({ user: { id: newEnterprise.id } });
        return success(res, token, 201);
      }

    } catch (err) {
      return error(res, err.message, 500);
    }
  } else {
    return error(res, 'Enter all data', 400);
  }
}

export const listEnterprise: Handler = async (req, res) => {
  try {
    const enterprise = await Enterprise.find();
    if (enterprise.length === 0) {
      return error(res, 'No companies', 404);
    } else {
      return success(res, enterprise, 200);
    }
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export const removeEnterprise: Handler = async (req, res) => {
  const { _id } = req.body;

  try {
    const enterpriseDeleted = await Enterprise.findByIdAndDelete(_id);

    !enterpriseDeleted ? error(res, 'Enterprise not found', 404) : success(res, null, 200);
  } catch (err) {
    return error(res, err.message, 500);
  }
}

export const updateEnterprse: Handler = async (req, res) => {
  const { _id } = req.body;

  try {
    const enterpriseUpdated = await Enterprise.findByIdAndUpdate(_id, req.body, { new: true });

    !enterpriseUpdated ? error(res, 'Employee not found', 404) : success(res, enterpriseUpdated, 200);

  } catch (err) {
    return error(res, err.message, 500);
  }
}

export const login: Handler = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email) {
      if (password) {
        const enterprise = await Enterprise.findOne({ email });
        if (enterprise) {
          const passwordCorrect: boolean = await enterprise.comparePassword(password);

          if (passwordCorrect) {
            const token = await generateAndSignToken({ user: { id: enterprise.id } });
            return success(res, token, 200);
          } else {
            return error(res, 'Invalid Credentials', 401);
          }
        } else {
          return error(res, 'Company not found', 404);
        }
      } else {
        return error(res, 'Enter your password', 401);
      }
    } else {
      return error(res, 'Enter your email', 401);
    }
  } catch (err) {
    return error(res, err.message, 500);
  }
}