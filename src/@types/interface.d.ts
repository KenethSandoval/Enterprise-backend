interface IPayload {
    user: {
      id: string;
    };
  }

interface IEmployeeSchema extends TMongoDocument {
    name: string,
    charge: string,
    department: string,
    phoneNumber: number,
    email: string
    enterprise: TMongoId[]
}

interface IEnterpriseSchema extends TMongoDocument {
    nameEnterprise: string,
    phone: number,
    email: string,
    address: string,
    password: string,

    setPassword(password: string): Promise<void>;
    comparePassword(password: string): Promise<boolean>;
}