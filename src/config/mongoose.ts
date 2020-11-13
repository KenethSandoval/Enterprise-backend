import mongoose from 'mongoose';
import { MONGODB_URI } from '../config';

export const connectionDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('Database: \x1b[0;34m', 'online');
  } catch (err) {
    console.error(`Error al conectar ${err}`);
  }
}
