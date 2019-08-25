'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validate('User') // rota criação de usuario
Route.post('sessions', 'SessionController.store') // rota de login do usuario

Route.post('passwords', 'ForgotPasswordController.store') // rota de solicitação de recuperação de senha
Route.put('passwords', 'ForgotPasswordController.update')

Route.get('files/:id', 'FileController.show')

Route.group(() => { // trabalha em grupos de rotas
  Route.post('files', 'FileController.store')

  Route.resource('projects', 'ProjectController').apiOnly() // grupo de rotas da api.
  Route.resource('projects.tasks', 'TaskController').apiOnly() // grupo de rotas task dentro de projetos
}).middleware('auth') // apenas usuarios logados podem acessar essa rota
