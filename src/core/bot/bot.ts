import { Bot } from "grammy";
import 'dotenv/config';
import { setupDailyQuote } from "../../features/motivation/senderQuote";

export async function startBot(): Promise<Bot> {
  const bot = new Bot(process.env.BOT_TOKEN!);

  setupDailyQuote(bot);

  bot.on('message', async (ctx) => {
    console.log('✅ Ваш chat_id:', ctx.chat.id);
    await ctx.reply(`Ваш chat_id: ${ctx.chat.id}`);
  });
  
  console.log('Starting Telegram bot...');
  await bot.start();
  console.log('Telegram bot started');
  
  return bot;
}