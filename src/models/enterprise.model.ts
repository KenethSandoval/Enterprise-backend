import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const enterpriseSchema: Schema<IEnterpriseSchema> = new Schema<IEnterpriseSchema>({
    nameEnterprise: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: Number
    },
    email: {
        required: true,
        unique: true,
        type: String
    },
    address: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

enterpriseSchema.methods.setPassword = async function (password: string) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
};

enterpriseSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);

}

export default model<IEnterpriseSchema>('Enterprise', enterpriseSchema);