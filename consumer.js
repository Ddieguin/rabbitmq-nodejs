const amqp = require("amqplib");

amqp
  .connect("amqp://localhost")
  .then(function (conn) {
    console.log("Conectado!");

    return conn.createChannel();
  })
  .then(function (ch) {
    console.log("Canal criado!");

    ch.prefetch(1);
    ch.consume("mensagens", function (msg) {
      console.log(JSON.parse(msg.content.toString()));
      ch.ack(msg);
    });

    // ch.nack(msg);
  });
