
app = {}

do seekWS = ->
  console.log 'trying'
  app.ws = new WebSocket 'ws://localhost:8887'
  app.ws.onclose = ->
    setTimeout seekWS, 4000
    console.log 'onopen'
  app.ws.onopen = ->
    console.log 'onopen'
  app.ws.onmessage = (msg) ->
    patterns = msg.data.split ' '
    console.log 'reload on patterns', patterns
    chrome.tabs.query {}, (tabs) ->
      tabs.forEach (tab) ->
        condition = patterns.every (pattern) ->
          (tab.url.indexOf pattern) >= 0
        if condition
          chrome.tabs.reload tab.id