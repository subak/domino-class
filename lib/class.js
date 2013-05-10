"use strict";
define(function () {
  function create(parent) {
    function Class() { }

    Class.extends = function (klass) {
      var fn = klass.prototype = Object.create(this.prototype);
      fn.constructor = klass;

      Object.keys(this).forEach(function (prop) {
        if ( !klass.hasOwnProperty(prop) ) {
          klass[prop] = this[prop];
        }
      }, this);

      return fn;
    }

    Object.defineProperty(Class, "create", {
      value: create
    });

    parent = parent || Object;
    var fn = Class.prototype = Object.create(parent.prototype);

    // 親コンテキスト
    fn.super = function () {
      return Object.getPrototypeOf(this.constructor.prototype);
    }

    // 親クラス
    fn.superclass = function () {
      return Object.getPrototypeOf(this.constructor.prototype).constructor;
    }

    return Class;
  }

  return create();
});
