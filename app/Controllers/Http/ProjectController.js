'use strict'

const Project = use('App/Models/Project')

class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request }) {
    const { page } = request.get()

    const project = await Project.query().with('user').paginate(page)

    return project
  }

  /**
   * Render a form to be used for creating a new project.
   * GET projects/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async store ({ request, response, auth }) { // para pegar informações do usuário = auth
    const data = await request.only(['title', 'description']) // pegando da requisição apenas estes dados

    const project = await Project.create({ ...data, user_id: auth.user.id }) // criando o registro no banco dos dados mais o id

    return project
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params }) {
    const project = await Project.findOrFail(params.id) // findOrFail busca o parametro da url = id do item

    await project.load('user') // carrega as informações do usuario no response
    await project.load('tasks') // carrega as informaçoes das tarefas do projeto

    return project
  }

  /**
   * Render a form to update an existing project.
   * GET projects/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async update ({ params, request }) {
    const project = await Project.findOrFail(params.id)

    const data = await request.only(['title', 'description'])

    project.merge(data)

    await project.save()

    return project
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params }) {
    const project = await Project.findOrFail(params.id)

    await project.delete()
  }
}

module.exports = ProjectController
