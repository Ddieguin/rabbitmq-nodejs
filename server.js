const amqp = require("amqplib");
const { createServer } = require("http");

function handler(req, res) {
  if (req.method === "POST") Routes[req.url](req, res);
}

async function init() {
  const conn = await amqp.connect("amqp://localhost");
  return conn.createChannel();
}

const Routes = {
  "/": async (req, res) => {
    const ch = await init();
    const data = [];
    for await (const chunck of req) {
      data.push(chunck);
    }
    ch.sendToQueue("mensagens", Buffer.from(Buffer.concat(data)));
    res.end();
  },
};

createServer(handler).listen(3000);
