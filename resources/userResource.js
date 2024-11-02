// resources/UserResource.js
class UserResource {
    constructor(user) {
      this.id = user.id;
      this.name = user.name;
      this.email = user.email;
      this.registeredAt = user.registeredAt;
    }
  
    static collection(users) {
      return users.map(user => new UserResource(user));
    }
  }
  
  module.exports = UserResource;
  