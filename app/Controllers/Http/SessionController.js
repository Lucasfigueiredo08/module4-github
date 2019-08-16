'use strict'

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const token = await auth.attemp(email, password)

    return token
  }
}

module.exports = SessionController
