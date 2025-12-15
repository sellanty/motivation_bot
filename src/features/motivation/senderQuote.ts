import { Bot } from "grammy";
import { getRandomQuoteText } from "./getQuote";

export function setupDailyQuote(bot: Bot) {
  const CHAT_ID = 636504782;
  const quote = getRandomQuoteText();
  bot.api.sendMessage(CHAT_ID, `🌅 Доброе утро, Санек!\n\n💬 ${quote}`);
  setInterval(() => {
    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Утренняя цитата в 9:00
    if (hour === 9 && minute === 0) {
      const quote = getRandomQuoteText();
      bot.api.sendMessage(CHAT_ID, `🌅 Доброе утро, Санек!\n\n💬 ${quote}`);
    }

    // Вечерняя цитата в 18:00
    if (hour === 18 && minute === 0) {
      const quote = getRandomQuoteText();
      bot.api.sendMessage(CHAT_ID, `🌙 Добрый вечер, Санек!\n\n💬 ${quote}`);
    }
  }, 60000);
}
