import { Bot } from "grammy";
import { getRandomQuoteObject } from "./getQuote";

export function setupDailyQuote(bot: Bot) {
  const CHAT_ID = 636504782;
    
  setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
        
    // Утренняя цитата в 8:00
    if (hour === 8 && minute === 0) {
      const quote = getRandomQuoteObject();
      let message = `🌅 Доброе утро, Санек!\n\n💬 "${quote.text}"`;
      if (quote.author) {
        message += `\n\n— ${quote.author}`;
      }
      bot.api.sendMessage(CHAT_ID, message);
    }

    // Вечерняя цитата в 18:00
    if (hour === 18 && minute === 0) {
      const quote = getRandomQuoteObject();
      let message = `🌙 Добрый вечер, Санек!\n\n💬 "${quote.text}"`;
      if (quote.author) {
        message += `\n\n— ${quote.author}`;
      }
      bot.api.sendMessage(CHAT_ID, message);
    }
  }, 60000);
}