'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewTaskMail')

const TaskHook = exports = module.exports = {}

TaskHook.sendNewTaskMail = async (taskInstance) => {
  if (!taskInstance.user_id && !taskInstance.dirty.user_id) return // dirty verifica se tem alguma informação recente ("sujo"), se n tiver um user ou teve recente

  const { email, username } = await taskInstance.user().fetch()
  const file = await taskInstance.file().fetch()

  const { title } = taskInstance

  Kue.dispatch(Job.key, { email, username, file, title }, { attempts: 3 }) // att: retentar 3 vezes
}

// adonis kue:listen {rodar a kue}
