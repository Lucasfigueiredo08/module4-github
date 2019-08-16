'use strict'

const File = use('App/Models/File') // model de file
const Helpers = use('Helpers') // lib nativa do js para ajudar a criar a pasta dos files e mover os arquivos

class FileController {
  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb' })

      const fileName = `${Date.now()}.${upload.subtype}` // colocar a data da criação no nome

      await upload.move(Helpers.tmpPath('uploads'), { // utilizar helpers para direcionar a pasta tmp uploads
        name: fileName // nome do arquivo
      })

      if (!upload.moved()) {
        throw upload.error()  // caso de errp
      }

      const file = File.create({
        file: fileName, // nome com a data da criação
        name: upload.clientName, // nome da imagem
        type: upload.type, // tipo da imagem
        subtype: upload.subtype // extensão da imagem
      })

      return file
    } catch (err) {
      response.status(err.status)
        .send({ error: { message: 'Erro no upload' } })
    }
  }

  async show ({ params, response }) {
    const file = await File.findOrFail(params.id) // pega o parametro passado na url e compara os ids

    return response.download(Helpers.tmpPath(`uploads/${file.file}`)) // pega o arquivo solicitado dentro da pasta de imagens
  }
}

module.exports = FileController
