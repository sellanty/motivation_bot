import express from "express";
import path from "path";

export function startServer() {
  const app = express();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  
  // статика для фото
  app.use('/assets', express.static(path.join(__dirname, '../assets')));
  
  return new Promise<void>((resolve) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Сервер запущен на порту ${PORT}`);
      resolve();
    });
  });
}