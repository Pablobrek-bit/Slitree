export class FetchingPostsError extends Error {
  constructor() {
    super('Não foi possivel buscar posts, tente novamente.')
    this.name = 'FetchingPostsError'
  }
}
