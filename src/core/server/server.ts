import express from "express";
import path from "path";
import fs from "fs";

export function startServer() {
  const app = express();
  
  // ✅ Используем порт из переменной окружения Railway
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
  
  console.log(`🔧 Запуск сервера на порту: ${PORT}`);
  
  // Пробуем разные пути к assets
  const possiblePaths = [
    path.join(__dirname, '../assets'),
    path.join(__dirname, '../../assets'),
    path.join(process.cwd(), 'assets'),
    '/app/assets'
  ];
  
  let assetsPath = '';
  for (const possiblePath of possiblePaths) {
    if (fs.existsSync(possiblePath)) {
      assetsPath = possiblePath;
      console.log(`✅ Найдены assets: ${assetsPath}`);
      break;
    }
  }
  
  if (assetsPath) {
    app.use('/assets', express.static(assetsPath));
    
    app.get("/assets/list", (req, res) => {
      const photosDir = path.join(assetsPath, 'photos');
      
      if (!fs.existsSync(photosDir)) {
        return res.json({ 
          error: 'Папка photos не найдена в assets',
          foundAssets: assetsPath,
          contents: fs.existsSync(assetsPath) ? fs.readdirSync(assetsPath) : 'нет доступа'
        });
      }
      
      const files = fs.readdirSync(photosDir);
      const photoUrls = files.map(file => ({
        filename: file,
        url: `https://motivationbot-production-058c.up.railway.app/assets/photos/${file}`,
        testLink: `https://motivationbot-production-058c.up.railway.app/assets/photos/${file}`
      }));
      
      res.json({
        count: files.length,
        photos: photoUrls
      });
    });
    
    // Быстрая проверка файла
    app.get("/assets/test/:filename", (req, res) => {
      const filePath = path.join(assetsPath, 'photos', req.params.filename);
      if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
      } else {
        res.status(404).json({ error: 'Файл не найден', path: filePath });
      }
    });
  }
  
  app.get("/", (req, res) => {
    res.json({
      status: "online",
      domain: "motivationbot-production-058c.up.railway.app",
      port: PORT,
      assets: assetsPath ? "настроены" : "не найдены",
      time: new Date().toISOString(),
      endpoints: ["/", "/assets/list", "/assets/test/:filename"]
    });
  });

  return new Promise<void>((resolve) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`✅ Сервер запущен на порту ${PORT}`);
      console.log(`🌐 Домен: https://motivationbot-production-058c.up.railway.app`);
      resolve();
    });
  });
}