define(["domino-class"], function (Class) {
  "use strict";

  function UserError(message) {
    this.name = this.name();
    this.message = message;
    this.description = this.name + ': message ' + this.message;
  }

  Class.create(Error).extends(UserError);

  return UserError;
});