'use strict'

const User = use('App/Models/User') // model user para comparação de email
const Crypto = require('crypto') // lib para criptografia

class ForgotPasswordController {
  async store ({ request, response }) { // request =  Pega os dados fornecidos; response = A resposta da aplicação
    try {
      const email = request.input('email') // pegar somente email
      const user = await User.findByOrFail('email', email) // comparar o email dado com todos os email no model

      user.token = Crypto.randomBytes(10).toString('hex') // criptografar
      user.token_created_at = new Date() // setar a data atual na tabela created_ ...

      await user.save()
    } catch (err) {
      return response.status(err.status).send({ error: 'Algo não deu certo!' })
    }
  }
}

module.exports = ForgotPasswordController
