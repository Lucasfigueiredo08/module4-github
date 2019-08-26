'use strict'

const Mail = use('Mail')
const Helpers = use('Helpers')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return // dirty verifica se tem alguma informação recente ("sujo"), se n tiver um user ou teve recente

  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()

  const { title } = taskInstance

  await Mail.send(
    ['emails.new_task'],
    { username, title, hasAttachment: !!file }, // !! transforma a variavel em bool
    message => {
      message
        .to(email)
        .from('lukas.liberato14@gmail.com', 'Lucas | InSystem')
        .subject('Nova tarefa para você')

      if (file) {
        message.attach(Helpers.tmpPath(`uploads/${file.file}`), { // caminho da imagem
          filename: file.name
        })
      }
    }
  )
}
