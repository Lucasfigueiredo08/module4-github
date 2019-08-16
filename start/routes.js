'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store') // rota criação de usuario
Route.post('sessions', 'SessionController.store') // rota de login do usuario

Route.post('passwords', 'ForgotPasswordController.store') // rota de solicitação de recuperação de senha

