import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import * as env from 'env-var';

export const APP_NAME = 'interview-swiper-backend';
export const PORT = env.get('PORT').default(3000).asPortNumber();
