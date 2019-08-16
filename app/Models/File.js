'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')  // adicionando env para pegar a url da aplicação

class File extends Model {
  static get computed () {
    return ['url'] // retornar a url na reposta da criação da imagem
  }

  getUrl ({ id }) {
    return `${Env.get('APP_URL')}/files/${id}` // padronizar a url da imagem
  }
}
module.exports = File
