import { Bot } from "grammy";
import { getRandomQuoteObject } from "./getQuote";
import type { TimeOfDay } from "../../shared/types/pills";
import { mySupplements } from "../../shared/constants/informationPills";
import { PhotoService } from "../photos/photo";

export function setupDailyInfo(bot: Bot) {
  const CHAT_ID = 636504782;
  const MSK_OFFSET_HOURS = 3;
  
  const photoService = new PhotoService();

  async function sendQuoteWithPhoto(chatId: number, greeting: string, photoType: 'morning' | 'evening') {
    try {
      const quote = getRandomQuoteObject();
      let caption = `${greeting}\n\n💬 "${quote.text}"`;
      
      if (quote.author) {
        caption += `\n\n— ${quote.author}`;
      }

      const photo = await photoService.getRandomPhoto(photoType);
      
      if (!photo) {
        console.warn(`📷 Нет фото типа "${photoType}" в базе данных`);
        bot.api.sendMessage(chatId, caption).catch(console.error);
        return;
      }

      bot.api.sendPhoto(chatId, photo.url, {
        caption: caption
      }).catch(console.error);
            
    } catch (error) {
      console.error('Ошибка отправки фото:', error);
      bot.api.sendMessage(chatId, greeting).catch(console.error);
    }
  }

  // Функция отправки напоминания о витаминах
  function sendVitaminReminder(chatId: number, timeOfDay: TimeOfDay) {
    const currentSupplements = mySupplements.filter(s => s.timeOfDay === timeOfDay);
    
    if (currentSupplements.length > 0) {
      const timeDescription = currentSupplements[0].timeDescription;
      let message = `💊 ${timeDescription}:\n\n`;
      
      currentSupplements.forEach(supp => {
        message += `• ${supp.name} - ${supp.dosage}\n`;
        if (supp.foodDetails) {
          message += `  🍽️ ${supp.foodDetails}\n`;
        }
        if (supp.importantNotes) {
          message += `  ⚠️ ${supp.importantNotes}\n`;
        }
        message += '\n';
      });
      
      bot.api.sendMessage(chatId, message).catch(console.error);
    }
  }

  setInterval(async () => {
    const now = new Date();
    const nowUtc = new Date(now.getTime() + (now.getTimezoneOffset() * 60000));
    const nowMsk = new Date(nowUtc.getTime() + (MSK_OFFSET_HOURS * 3600000));

    const hour = nowMsk.getHours();
    const minute = nowMsk.getMinutes();

    let currentTimeOfDay: TimeOfDay | null = null;
    
    // Утро (после завтрака) - 7:00
    if (hour === 7 && minute === 0) {
      await sendQuoteWithPhoto(CHAT_ID, 'Доброе утро, Санек!', 'morning');
      currentTimeOfDay = 'morning';
    }
    
    // Обед - 13:00
    if (hour === 13 && minute === 0) {
      currentTimeOfDay = 'lunch';
    }
    
    // До тренировки - 17:00
    if (hour === 17 && minute === 0) {
      currentTimeOfDay = 'before_workout';
    }
    
    // После тренировки - 19:00
    if (hour === 19 && minute === 0) {
      currentTimeOfDay = 'after_workout';
    }
    
    // Вечер (с ужином) - 20:00
    if (hour === 20 && minute === 0) {
      currentTimeOfDay = 'evening';
    }

    // Вечерняя цитата в 18:00
    if (hour === 18 && minute === 0) {
      await sendQuoteWithPhoto(CHAT_ID, 'Добрый вечер, Санек!', 'evening');
    }

    // Отправляем напоминание о витаминах
    if (currentTimeOfDay) {
      sendVitaminReminder(CHAT_ID, currentTimeOfDay);
    }
  }, 60000);
}