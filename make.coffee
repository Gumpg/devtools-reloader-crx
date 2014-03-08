
require 'shelljs/make'
fs = require 'fs'
{join} = require 'path'

target.coffee = ->
  fs.watch 'coffee/', interval: 200, (type, name) ->
    file = join 'coffee', name
    console.log ':: reloading', file
    exec "coffee -o src/ -bcm #{file}"

target.draft = ->
  exec 'node-dev drafts/client.coffee', aync: yes
  exec 'node-dev drafts/server.coffee', aync: yes