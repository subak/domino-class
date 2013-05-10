requirejs.config({
  paths: {
    "class": "./lib/class"
  }
});

require(["spec/00Spec"]);