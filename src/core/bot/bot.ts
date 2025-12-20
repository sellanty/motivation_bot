import { Bot } from "grammy";
import "dotenv/config";
import { setupDailyInfo} from "../../features/motivation/senderInfo";
import { getRandomQuoteObject } from "../../features/motivation/getQuote";

export async function startBot(): Promise<Bot> {
  const bot = new Bot(process.env.BOT_TOKEN!);

  try {
    await bot.api.deleteWebhook({ drop_pending_updates: true });
  } catch (error) {
    console.log("Вебхук не был установлен");
  }

  bot.command("start", async (ctx) => {
    const username = ctx.from?.username;
    const firstName = ctx.from?.first_name || "пользователь";
    const greetingName = username ? `@${username}` : firstName;

    await ctx.reply(
      `Привет, ${greetingName}! 👋\nЯ бот для мотивации!\nТвой chat_id: ${ctx.chat.id}`
    );
  });

  bot.command("help", async (ctx) => {
    await ctx.reply(
      `📚 Доступные команды:\n/start - Начать\n/help - Помощь\n/quote - Случайная цитата`
    );
  });
  bot.command("pills", async (ctx) => {
    await ctx.reply(
      'pills!'
    )
  })

  bot.command("quote", async (ctx) => {
    const quoteObj = getRandomQuoteObject();

    let message = `💬 Цитата дня:\n\n"${quoteObj.text}"`;

    if (quoteObj.author) {
      message += `\n\n— ${quoteObj.author}`;
    }
    await ctx.reply(message);
  });

  setupDailyInfo(bot);

  await bot.start({
    drop_pending_updates: true,
    allowed_updates: ["message", "callback_query"],
    onStart: (info) => {
      console.log(`Бот @${info.username} запущен!`);
    }
  });

  return bot;
}
