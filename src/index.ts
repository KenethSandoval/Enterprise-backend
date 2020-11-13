import { config } from 'dotenv';
config();
import { connectionDB } from './config/mongoose';
import app from './app';

async function main() {
  await connectionDB();
  app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
  });
}

main();

