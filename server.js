// importa modulo "tni.js" para a variavel "tmi";
const tmi = require('tmi.js');
// Quarda as configurações dos comandos;
const config = require('./config/config.js');
// Cria nosso bot com suas configurações e login;
const bot = new tmi.Client({
  options: { debug: true },
  connection: {
    cluster: 'aws',
    reconnect: true,
    secure: true
  },
  // Indentificação;
  identity: {
    // Nome do bot;
    username: config.userName,
    // Senha/Oauth de uma conta SÓ para o bot;
    password: config.token
  },
  // Canais em que ele possui acesso;
  channels: config.channels
});

// Execultar oc comandos;
bot.on('chat', (channel, tag, message, self) => {
  // Verifica o prefixo;
  if(self || !message.startsWith(config.prefix) || tag['display-name'] === 'wallker_l') return;
  // verifica os argumentos e remove espaços;
  const args = message.slice(1).split(' ');
  // Converte os comandos para letra menuscula para melhor eficiência do script;
  const command = args.shift().toLowerCase();
  
  // Exporta algumas váriaveis para o "./components/commands.js" poder funcionar corretamente;
  const chat = {
    bot,
    channel,
    tag
  }
  module.exports = chat;

  // Importa o coponente comando de "./components/commands.js";
  const acceptedCommands = require('./components/commands');
  // Quarda o valor correto de qual comando foi solicitado ao coponente;
  const execultedCommand = acceptedCommands[command];
  
  // Verifica se o comando existe;
  if(execultedCommand){
    // Execulta o comando;
    execultedCommand();
  }

  return { message: 'ok' }
});

bot.on('resub', (channel, tag, months, message, userstate, methods) => {
  const resub = {
    channel,
    tag,
    months,
    message,
    userstate,
    methods
  }

  module.exports = resub;

});


// Conecta/Liga o bot;
bot.connect().catch(console.error);

/**
 * testes
 */

const express = require("express");
const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.send({ message: 'Hello World!', status: 'ok' })
})

app.listen(port, () => {
  console.log("Started!");
});