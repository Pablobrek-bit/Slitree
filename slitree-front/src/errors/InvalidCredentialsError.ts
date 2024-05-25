export class InvalidCredentialError extends Error {
  constructor() {
    super(
      'Não foi possível entrar! Verifique suas credenciais e tente novamente.',
    )
    this.name = 'InvalidCredentialError'
  }
}
