export class ArgumentNotValidError extends Error {
  constructor(message: string = 'Argument not valid') {
    super(message);
  }
}
