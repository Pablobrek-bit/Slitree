export class LikePostError extends Error {
  constructor() {
    super('Não foi possivel curtir o post, tente novamente.')
    this.name = 'LikePostError'
  }
}
