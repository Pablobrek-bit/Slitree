import { Prisma } from '@prisma/client';
import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';
import { InvalidCredentialError } from '../service/errors/invalid-credentials-error';
import { OutdatedMemoryLimits } from '../service/errors/outdated-memory-limits';
import { InvalidFileFormat } from '../service/errors/invalid-file-format-error';
import { UnauthorizedError } from '../service/errors/unauthorized-error';
import { ArgumentNotValidError } from '../service/errors/argument-not-valid-error';
import { ResourceNotFoundError } from '../service/errors/resource-not-found-error';

export const errorHandler = (
  error: FastifyError,
  req: FastifyRequest,
  rep: FastifyReply,
): void => {
  if (error instanceof ZodError) {
    console.error(error);
    rep
      .status(400)
      .send({ message: 'Validation error', issues: error.format() });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error);
    rep.status(400).send({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    console.error(error);
    rep.status(500).send({ message: 'Internal server error' });
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    console.error(error);
    rep.status(500).send({ message: error.message });
  }

  if (error instanceof Prisma.PrismaClientRustPanicError) {
    console.error(error);
    rep.status(400).send({ message: error.message });
  }

  if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
    console.error(error);
    rep.status(401).send({ message: 'Authorization header is missing' });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    console.error(error);
    rep.status(400).send({ message: error.message });
  }

  if (error instanceof ResourceNotFoundError) {
    console.error(error);
    rep.status(404).send({ message: error.message });
  }

  if (error instanceof InvalidCredentialError) {
    console.error(error);
    rep.status(400).send({ message: error.message });
  }

  if (error instanceof UnauthorizedError) {
    console.error(error);
    rep.status(401).send({ message: error.message });
  }

  if (error instanceof ArgumentNotValidError) {
    console.error(error);
    rep.status(400).send({ message: error.message });
  }

  if (error instanceof OutdatedMemoryLimits) {
    console.error(error);
    rep.status(400).send({ message: error.message });
  }

  if (error instanceof InvalidFileFormat) {
    console.error(error);
    rep.status(400).send({ message: error.message });
  }

  if (error instanceof Error) {
    console.error(error);
    rep.status(500).send({ message: 'Internal server error' });
  }
};
