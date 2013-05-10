namespace:spec do
  desc "debug"
  task:debug do
    sh "node debug node_modules/jasmine-node/lib/jasmine-node/cli.js --runWithRequireJs nodeSpec.js"
  end
end

desc "spec"
task:spec do
  sh "jasmine-node --verbose --runWithRequireJs nodeSpec.js"
end
