export class UserRegisterError extends Error {
  constructor() {
    super('Não foi possivel criar sua conta, tente novamente.')
    this.name = 'UserRegisterError'
  }
}
