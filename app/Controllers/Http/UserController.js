'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password']) // 'confirm_password'
    const addresses = request.input('addresses') // pegar apenas o endereço

    const user = await User.create(data)

    await user.addresses().createMany(addresses) // relacionamento para cada endereço dentro do array

    return user
  }
}

module.exports = UserController
