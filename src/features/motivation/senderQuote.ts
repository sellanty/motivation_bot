import { Bot } from "grammy";
import { getRandomQuoteObject } from "./getQuote";

export function setupDailyQuote(bot: Bot) {
  const CHAT_ID = 636504782;
  const MSK_OFFSET_HOURS = 3;

  function sendQuote(chatId: number, greeting: string) {
    const quote = getRandomQuoteObject();
    let message = `${greeting}\n\n💬 "${quote.text}"`;
    if (quote.author) {
      message += `\n\n— ${quote.author}`;
    }
    bot.api.sendMessage(chatId, message).catch(console.error);
  }

  setInterval(() => {
    const now = new Date();
    const nowUtc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const nowMsk = new Date(nowUtc.getTime() + (MSK_OFFSET_HOURS * 3600000));

    const hour = nowMsk.getHours();
    const minute = nowMsk.getMinutes();

    // Утренняя цитата в 8:00 по Москве
    if (hour === 8 && minute === 0) {
      sendQuote(CHAT_ID, '🌅 Доброе утро, Санек!');
    }

    // Вечерняя цитата в 18:00 по Москве
    if (hour === 18 && minute === 0) {
      sendQuote(CHAT_ID, '🌙 Добрый вечер, Санек!');
    }
  }, 60000);
}