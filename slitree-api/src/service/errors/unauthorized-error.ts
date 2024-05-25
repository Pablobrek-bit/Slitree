export class UnauthorizedError extends Error {
  constructor(message: string = 'Unauthorized') {
    super(message);
  }
}
