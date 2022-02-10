const amqp = require("amqplib");

amqp
  .connect("amqp://localhost")
  .then(function (conn) {
    console.log("Conectado!");

    return conn.createChannel();
  })
  .then(function (ch) {
    console.log("Canal criado!");

    setInterval(() => {
      console.log("-> Mensagem Enviada");
      ch.sendToQueue("mensagens", Buffer.from("hello world"));
    }, 1000);
  });
