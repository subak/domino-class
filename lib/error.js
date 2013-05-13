define(["domino-class"], function (Class) {
  "use strict";

  function UserError(message) {
    this.name = this.getName();
    this.message = message;
    this.description = this.name + ': message ' + this.message;
  }

  Class.create(Error).extends(UserError);

  return UserError;
});