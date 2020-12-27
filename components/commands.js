// Pega algumas configuraões do index.js;
const chat = require('../server');

// Separa as informaçoes obtidas do index.js;
const bot = chat.bot;
const channel = chat.channel;
const message = chat.message;
const tag = chat.tag;

// Váriavel que contem todos os comandos e as açoes dos mesmos;
const commands = {
  // Configs do meu Notebook;
  pc() {
    bot.say(channel, `/me Olá @${tag['display-name']} acesse: https://gist.github.com/sozinhoL/fe2602767f6b6cf2777a5fde937ee1c8`);
  },
  comandos() {
    bot.say(channel, `/me @${tag['display-name']} Eles são: !pc, !comandos ou !cmds`);
  },
  cmds() {
    bot.say(channel, `/me @${tag['display-name']} Eles são: !pc, !comandos ou !cmds`);
  },
  color() {
    let messageE = message.replace('!color', '');
    if(tag['display-name'] == 'sozinhol' || tag['display-name'] == 'sozinhoL') {
      console.log(messageE);
      bot.say(channel, `/color ${messageE}`);
      bot.say(channel, `Certo! Cor mudada para ${messageE}`);
    } else {
      bot.say(channel, 'Voce nao tem permissao para usar esse comando!');
    }
  }
}

// Exporta os comandos para serem usados no index.js;
module.exports = commands; 
