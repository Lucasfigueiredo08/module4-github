'use strict'

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
}

module.exports = ResetPassword
