const uWS = require('uWebSockets.js')

// Nano timer not used in example, but it's very helpful for accurate timing!
const NanoTimer = require('nanotimer')

var port = process.env.PORT || 9001
// -------


// Socket server
const app = uWS.App({}).ws('/*', {
  maxPayloadLength: 512, // users-to-server message length
  compression: 0,

upgrade: (res, req, context) => {
	var upgradeBody = handleUpgrade(req)
	if (upgradeBody === null) {
		res.close()
		return
	}

    /* This immediately calls open handler, you must not use res after this call */
    res.upgrade(upgradeBody,
    /* Spell these correctly */
    req.getHeader('sec-websocket-key'),
    req.getHeader('sec-websocket-protocol'),
    req.getHeader('sec-websocket-extensions'),
    context)
  },

  open: (ws) => {
    handleUserJoining(ws)
  },

  close: (ws, code, message) => {
    handleUserLeaving(ws)
  },
                           
  message: (ws, message, isBinary) => {
    handleUserMessage(ws, message, isBinary)
  }
}).any('/*', (res, req) => {
  res.end('No http!')
}).listen(port, (listenSocket) => {
  if (listenSocket) {
    log('\n===============\nSOCKET-SERVER\n===============\n\nListening on port ' + port + '\n')
  }
})


// Socket Handlers

function handleUpgrade(req) {
  // return null to reject user based on req params
  return {}
}

function handleUserJoining(ws) {
  log('User joined.')
}

function handleUserLeaving(ws) {
  log('User disconnecting.')
}

function handleUserMessage(ws, message, isBinary) {
  log('User messaged.')
  // echo message back to user
  ws.send(message, isBinary, false)
}


// Helpers

function log(message) {
  console.log(message)
}