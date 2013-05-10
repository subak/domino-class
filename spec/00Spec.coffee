require ["../lib/class"], (Class)->
  describe "Class.extends", ->
    it "should be a function", ->
      expect(typeof Class.extends).toBe("function");

require ["events", "../lib/class"], (events, Class)->
  describe "Class", ->
    it "should extend function", ->
      Hoge = ->
      Class.extends(Hoge)
      Class.extends.call(events.EventEmitter, Hoge)
      expect(Hoge.extends).toBe(Class.extends)
      expect(Hoge.prototype.on).toBe(events.EventEmitter.prototype.on)
