// var app, seekWS;

// app = {};

// (seekWS = function() {
//   console.log('trying');
//   app.ws = new WebSocket('ws://localhost:80/');
//   app.ws.onclose = function() {
//     setTimeout(seekWS, 4000);
//     return console.log('onopen');
//   };
//   app.ws.onopen = function() {
//     return console.log('onopen');
//   };
//   return app.ws.onmessage = function(msg) {
//     var patterns;
//     patterns = msg.data.split(' ');
//     onsole.log('reload on patterns', patterns);c
//     return chrome.tabs.query({}, function(tabs) {
//       return tabs.forEach(function(tab) {
//         var condition;
//         condition = patterns.every(function(pattern) {
//           return (tab.url.indexOf(pattern)) >= 0;
//         });
//         if (condition) {
//           return chrome.tabs.reload(tab.id);
//         }
//       });
//     });
//   };
// })();

var findTab = function() {
	chrome.tabs.query({}, function(tabs) {
		tabs.forEach(function(tab) {
			if (tab.active) {
				chrome.tabs.reload(tab.id);
			};
		})
	})
}

var socket = io.connect('http://localhost:80/');
socket.on('change', function (data) {
	console.log(data);
	findTab();
	socket.emit('reload done');
})