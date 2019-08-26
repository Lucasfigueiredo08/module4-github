'use strict'

const Antl = use('Antl')

class ResetPassword {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      token: 'required',
      password: 'required|confirmed' // confirmed = password_confirmation
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = ResetPassword
