export class CreatePostError extends Error {
  constructor() {
    super('Não foi possivel criar o post, tente novamente.')
    this.name = 'CreatePostError'
  }
}
