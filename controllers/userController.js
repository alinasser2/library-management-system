const userService = require('../services/userService');
const UserResource = require('../resources/userResource');

class UserController {
  async listUsers(req, res) {
    const users = await userService.listAllUsers();
    res.json({
      status: 'success',
      data: UserResource.collection(users),
    });
  }

  async getUser(req, res) {
    const user = await userService.getUser(req.params.id);
    res.json({
      status: 'success',
      data: new UserResource(user),
    });
  }

  async addUser(req, res) {
    const userData = req.body;
    const newUser = await userService.addUser(userData);
    res.status(201).json({
      status: 'success',
      data: new UserResource(newUser),
    });
  }

  async updateUser(req, res) {
    const userData = req.body;
    const updatedUser = await userService.updateUser(req.params.id, userData);
    res.json({
      status: 'success',
      data: new UserResource(updatedUser),
    });
  }

  async deleteUser(req, res) {
    await userService.deleteUser(req.params.id);
    res.json({
      status: 'success',
      message: 'User deleted successfully',
    });
  }
}

module.exports = new UserController();
