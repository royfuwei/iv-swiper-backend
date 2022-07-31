import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import * as env from 'env-var';

export const APP_NAME = 'interview-swiper-backend';
export const PORT = env.get('PORT').default(3000).asPortNumber();

/* mongodb constants */
export const MONGO_ADDR = env
  .get('MONGO_ADDR')
  .default('mongodb:27017')
  .asString();
export const MGO_DEFAULT_DB = 'swiper';
export const MGO_POSTS_MODEL = 'posts';
export const MGO_COMMENTS_MODEL = 'comments';
