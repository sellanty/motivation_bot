import { QUOTES } from "../../shared/constants/motivationQuote";
import { QuoteI } from "../../shared/types/quotes";

// Возвращает только текст
export function getRandomQuoteText(): string {
  const randomText = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[randomText].text;
}

// Возвращает весь объект
export function getRandomQuoteObject(): QuoteI {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[randomIndex];
  }