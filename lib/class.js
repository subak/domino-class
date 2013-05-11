define(function () {
  "use strict";
  function create(parent) {
    function Class() {
      if ( this === null ) {
        throw new Error("this is null");
      }
      this.super().constructor.apply(this, arguments);
    }

    Class.extends = function (klass) {
      var fn = klass.prototype = Object.create(this.prototype);
      fn.constructor = klass;

      Object.keys(this).forEach(function (prop) {
        if ( !klass.hasOwnProperty(prop) ) {
          klass[prop] = this[prop];
        }
      }, this);

      return fn;
    };

    Object.defineProperty(Class, "create", {
      value: create
    });

    parent = parent || Object;
    var fn = Class.prototype = Object.create(parent.prototype);

    fn.class = function() {
      return this.constructor;
    };

    /**
     * http://blog.livedoor.jp/dankogai/archives/51756459.html
     */
    fn.name = function () {
      var f = this.constructor;
      return 'name' in f
        ? f.name
        : (''+f).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
    };

    // 親コンテキスト
    fn.super = function () {
      return Object.getPrototypeOf(this.constructor.prototype);
    };

    // 親クラス
    fn.superclass = function () {
      return Object.getPrototypeOf(this.constructor.prototype).constructor;
    };

    return Class;
  }

  return create();
});
