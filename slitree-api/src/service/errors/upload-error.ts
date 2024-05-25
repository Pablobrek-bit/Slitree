export class UploadError extends Error {
  constructor(message: string = 'Upload error') {
    super(message);
  }
}
