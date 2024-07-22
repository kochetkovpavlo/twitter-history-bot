import { Context } from 'telegraf';
import createDebug from 'debug';

import { author, name, version } from '../../package.json';

const debug = createDebug('bot:about_command');

export const search = () => async (ctx: Context) => {
  const message = `*${name} ${version}*\n${author}`;
  const msg = ctx.message?.chat.id;
  debug(`Triggered "about" command with message \n${message}`);
  await ctx.replyWithMarkdownV2(message, { parse_mode: 'Markdown' });
};

