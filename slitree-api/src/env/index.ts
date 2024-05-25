import { config } from 'dotenv';
import z from 'zod';

config();

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'prod', 'test']),
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string().default('default'),
  JWT_EXPIRATION: z.string().default('1d'),
  FIREBASE_API_KEY_LOCATION: z.string(),
  FIREBASE_BUCKET_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('Invalid environment variables: ', _env.error);

  throw new Error('Invalid environment variables');
}

export const env = _env.data;
