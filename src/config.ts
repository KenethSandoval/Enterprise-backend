const env: NodeJS.ProcessEnv = process.env;

export const PORT = env.PORT || 3000;
export const MONGODB_URI = env.MOGODB_URI || 'mongodb://localhost/dbenterprise';
export const JWT_SECRET = env.JWT_SECRET || '123445';
export const TOKEN_EXPIRY_TIME = env.TOKEN_EXPIRY_TIME || '1h';
