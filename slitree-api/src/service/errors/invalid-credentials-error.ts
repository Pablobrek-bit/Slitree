export class InvalidCredentialError extends Error {
  constructor(message: string = 'Invalid credentials') {
    super(message);
  }
}
