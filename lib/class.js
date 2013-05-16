define(function () {
  "use strict";
  function create(parent) {
    parent = parent || Object;

    function Class() {
      if ( this === null ) {
        throw new Error("this is null");
      }
      parent.apply(this, arguments);
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

    Class.subclass = function (constructor) {
      constructor.prototype = Object.create(this.prototype);
      constructor.prototype.constructor = constructor;

      Object.keys(this).forEach(function (prop) {
        if ( !constructor.hasOwnProperty(prop) ) {
          constructor[prop] = this[prop];
        }
      }, this);

      return constructor;
    };

    /**
     * TODO: func.nameはieでは使えないらしいのでdankogaiの方法を使う
     * @param func
     * @returns {*}
     */
    Class.defineClassMethod = function defineClassMethod (func) {
      return this[func.name] = func;
    };

    /**
     * TODO: Object.definePropertyを使って書き込み不可にしたほうがいいかな？
     * @param func
     * @returns {*}
     */
    Class.defineMethod = function defineMethod (func) {
      return this.prototype[func.name] = func;
    };

    Class.defineField = function defineField (name, value) {
      return this.prototype[name] = value;
    };

    /**
     * TODO: 名前を考える
     */
    Object.defineProperty(Class, "create", {
      value: create
    });

    var fn = Class.prototype = Object.create(parent.prototype);

    /**
     * http://blog.livedoor.jp/dankogai/archives/51756459.html
     * @returns {String} コンストラクタ名
     */
    fn.getName = function () {
      var f = this.constructor;
      return 'name' in f
        ? f.name
        : ('' + f).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
    };

    Object.defineProperties(fn, {
      "class": {
        /**
         * クラスを返す
         * @returns {Function} コンストラクタ
         */
        get: function () {
          return this.constructor;
        }
      },
      "super": {
        /**
         * 親コンテキストを返す
         * @returns {Object} プロトタイプオブジェクト
         */
        get: function () {
          return Object.getPrototypeOf(this.constructor.prototype);
        }
      },
      "superClass": {
        /**
         * 親クラスを返す
         * @returns {Function} コンストラクタ
         */
        get: function () {
          return Object.getPrototypeOf(this.constructor.prototype).constructor;
        }
      }
    });

    return Class;
  }

  return create();
});
