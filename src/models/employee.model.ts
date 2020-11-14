import { Schema, model } from 'mongoose';

const employeeSchema: Schema = new Schema({
    name: {
        required: true,
        type: String
    },
    lastname: {
        required: true,
        type: String
    },
    charge: {
        required: true,
        type: String
    },
    department: {
        required: true,
        type: String
    },
    phoneNumber: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        type: String
    },
    enterprise: {
        type: Schema.Types.ObjectId,
        ref: 'Enterprise',
        required: true
    }
});

export default model<IEmployeeSchema>('Employee', employeeSchema);