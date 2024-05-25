export class InvalidFileFormat extends Error {
  constructor(message = 'Invalid file type') {
    super(message);
  }
}
