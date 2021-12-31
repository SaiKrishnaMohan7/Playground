const hapi = require('@hapi/hapi');

async function start() {
  const server = hapi.server({
    host: "0.0.0.0", // bind to 0.0.0.0 instead of localhost, since the container won't be able to reach out gets stuck in a loop
    port: process.env.PORT || 3000
  });

  server.route({
    method: "GET",
    path: "/",
    handler() {
      return { success: true };
    }
  });

  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true
    }
  });

  await server.start();

  return server;
}

start().catch(err => {
  console.log(err);
  process.exit(1);
});