const expressApp = require("./express");
const http = require("http");

const server = http.createServer(expressApp);

module.exports = server;
