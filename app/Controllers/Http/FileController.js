'use strict'

const File = use('App/Models/File') // model de file
const Helpers = use('Helpers') // lib nativa do js para ajudar a criar a pasta dos files e mover os arquivos

class FileController {
  async store ({ request, response }) {
    try {
      if (!request.file('file')) return

      const upload = request.file('file', { size: '2mb' })

      const fileName = `${Date.now()}.${upload.subtype}`

      await upload.move(Helpers.tmpPath('uploads'), {
        name: fileName
      })

      if (!upload.moved()) {
        throw upload.error()
      }

      const file = File.create({
        file: fileName,
        name: upload.clientName,
        type: upload.type,
        subtype: upload.subtype
      })

      return file
    } catch (err) {
      response.status(err.status)
        .send({ error: { message: 'Erro no upload' } })
    }
  }
}

module.exports = FileController
