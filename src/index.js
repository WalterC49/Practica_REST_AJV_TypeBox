require("./config/env");
const server = require("./config/http");

const main = async () => {
  server.listen(process.env.PORT);
  console.log(`Server at http://localhost:${process.env.PORT}`);
};

main();
