'use strict'

const User = use('App/Models/User') // model user para comparação de email
const Crypto = require('crypto') // lib para criptografia
const Mail = use('Mail') // funcionalidade de email do js
const Moment = require('moment')

class ForgotPasswordController {
  async store ({ request, response }) { // request =  Pega os dados fornecidos; response = A resposta da aplicação
    try {
      const email = request.input('email') // pegar somente email
      const user = await User.findByOrFail('email', email) // comparar o email dado com todos os email no model

      user.token = Crypto.randomBytes(10).toString('hex') // criptografar
      user.token_created_at = new Date() // setar a data atual na tabela created_ ...

      await user.save()

      await Mail.send(
        ['emails.forgot_password'], // caminho da view de email
        { email, token: user.token, link: `${request.input('redirect_url')}?token=${user.token}` }, // variaveis que estão na view Forgot_password
        message => { // objeto message
          message // utilizando o objeto
            .to(user.email)
            .from('lucas@mail.com', 'Lucas | Precisava')
            .subject('Recuperação de Senha')
        }
      )
    } catch (err) {
      return response.status(err.status).send({ error: 'Algo não deu certo!' })
    }
  }

  async update ({ request, response }) { // alteração de senha
    try {
      const { token, password } = request.all() // token da requisição, password: nova senha

      const user = await User.findByOrFail('token', token)

      const tokenExpired = Moment()
        .subtract('2', 'days') // verificar se o token já passou de 2 dias
        .isAfter(user.token_created_at) // compara a data atual com a data do token

      if (tokenExpired) {
        return response
          .status(401)
          .send({ error: { message: 'Token expirado' } })
      }

      user.token = null // apagando token
      user.token_created_at = null // apagando data
      user.password = password // salvando senha nova

      await user.save() // não pode esquecer o save
    } catch (err) {
      response.status(err.status).send({ error: { message: 'Algo deu errado' } })
    }
  }
}

module.exports = ForgotPasswordController
