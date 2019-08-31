'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User') // rota criação de usuario
Route.post('sessions', 'SessionController.store').validator('Session') // rota de login do usuario

Route.post('passwords', 'ForgotPasswordController.store').validator('ForgotPassword') // rota de solicitação de recuperação de senha
Route.put('passwords', 'ForgotPasswordController.update').validator('ResetPassword')

Route.get('files/:id', 'FileController.show')

Route.group(() => { // trabalha em grupos de rotas
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController').apiOnly()
    .validator(new Map([[['projects.store'], ['Project']]])) // grupo de rotas da api.

  Route.resource('projects.tasks', 'TaskController').apiOnly()
    .validator(new Map([[['projects.tasks.store'], ['Task']]])) // grupo de rotas task dentro de projetos
}).middleware('auth') // apenas usuarios logados podem acessar essa rota
