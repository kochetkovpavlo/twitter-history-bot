import { Telegraf } from 'telegraf';

import { about } from './commands';
import { greeting } from './text';
import { VercelRequest, VercelResponse } from '@vercel/node';
import { development, production } from './core';
import * as https from 'https'

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf(BOT_TOKEN);

bot.command('about', about());
//bot.on('message', greeting());
bot.command('search',async (ctx)=>{
  const msg= ctx.message.text;
  const name = msg.replace("/search ", "")

  const options = {
    hostname: 'api.example.com',
    path: '/data',
    method: 'GET',
  };

  //const res = await https.request(`https://api.memory.lol/vi/tw/${name}`)
  fetch(`https://api.memory.lol/v1/tw/${name}`)
    .then(res=>res.text())
    .then(data=>{
      const accounts : Array<any>= JSON.parse(data).accounts;
      accounts.forEach((account :any)=> {
        const names = account.screen_names
        console.log(names)
        Object.keys(names).forEach(key=>{
          const name = `${key} : ${names[key][0]}`
          ctx.reply(name)
        })
      });
    })
  
  
  //ctx.reply(`${res}`)
})

//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
