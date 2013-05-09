define(function () {
  "use strict";
  
  function Class() { }

  Class.extends = function (klass) {
    var fn = klass.prototype = Object.create(this.prototype);
    fn.constructor = klass;

    Object.getOwnPropertyNames(this).forEach(function (prop) {
      if ( !klass.hasOwnProperty(prop) ) {
        klass[prop] = this[prop];
      }
    }, this);

    return fn;
  }

  var fn = Class.prototype;

  // 親コンテキスト
  fn.super = function () {
    return Object.getPrototypeOf(this.constructor.prototype);
  }

  // 親クラス
  fn.superclass = function () {
    return Object.getPrototypeOf(this.constructor.prototype).constructor;
  }

  return Object.freeze(Class);
});
