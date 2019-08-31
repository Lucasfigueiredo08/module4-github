'use strict'

const Database = use('Database ') // sempre que tiver mais de uma operação no banco de dados, utiliza para garantir que elas vão ser executadas, caso uma falhe, o trx não da o commit
const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only(['username', 'email', 'password']) // 'confirm_password'
    const addresses = request.input('addresses') // pegar apenas o endereço

    const trx = await Database.beginTransaction()

    const user = await User.create(data, trx)

    await user.addresses().createMany(addresses, trx) // relacionamento para cada endereço dentro do array

    await trx.commit()

    return user
  }
}

module.exports = UserController
