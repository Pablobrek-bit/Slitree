import 'dotenv/config';

import { randomUUID } from 'crypto';
import { Environment } from 'vitest';
import { execSync } from 'child_process';
import { PrismaClient } from '@prisma/client';

// postgresql://docker:docker@localhost:5432/apisolid?schema=public;

const prisma = new PrismaClient();

function generateDataBaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL not found');
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set('schema', schema);

  return url.toString();
}

export default <Environment>{
  name: 'prisma',
  async setup() {
    const schema = randomUUID();

    process.env.DATABASE_URL = generateDataBaseURL(schema);

    execSync('npx prisma migrate deploy');

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        );

        await prisma.$disconnect();
      },
    };
  },
  transformMode: 'ssr',
  transform: (input: any) => input,
};
