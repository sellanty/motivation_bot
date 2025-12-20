import express from "express";

export function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  
  app.get("/", (req, res) => {
    res.send("Домен: motivationbot-production-058c.up.railway.app");
  });

  return new Promise<void>((resolve) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 HTTP сервер запущен на 0.0.0.0:${PORT}`);
      resolve();
    });
  });
}