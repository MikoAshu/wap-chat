const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io');
// const io = require('socket.io')();
const WebSockets = require('./utils/WebSockets');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  // server = app.listen(config.port, () => {
  //   logger.info(`Listening to port ${config.port}`);
  // });
  /** Create HTTP server. */
  server = http.createServer(app);
  /** Create socket connection */
  const io = socketio(server);
  /** Create WebSockets instance */
  global.io = io;
  global.io.on('connection', WebSockets.connection);
  /** Listen on provided port, on all network interfaces. */
  server.listen(config.port);
  /** Event listener for HTTP server "listening" event. */
  server.on('listening', () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
