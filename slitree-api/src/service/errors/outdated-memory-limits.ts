export class OutdatedMemoryLimits extends Error {
  constructor(message: string = 'Outdated memory limits') {
    super(message);
  }
}
