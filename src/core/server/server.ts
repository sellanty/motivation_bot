import express from "express";
import path from "path";
import fs from "fs";

export function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  
  // ✅ ВАЖНО: Раздаем статические файлы из папки assets
  app.use('/assets', express.static(path.join(__dirname, '../assets')));
  
  app.get("/", (req, res) => {
    res.send("Домен: motivationbot-production-058c.up.railway.app");
  });

  // ✅ Эндпоинт для списка фото
  app.get("/assets/list", (req, res) => {
    const photosDir = path.join(__dirname, '../assets/photos');
    
    try {
      if (!fs.existsSync(photosDir)) {
        return res.json({ 
          error: 'Папка не найдена',
          absolutePath: photosDir,
          filesInProject: fs.readdirSync(path.join(__dirname, '..'))
        });
      }
      
      const files = fs.readdirSync(photosDir);
      const photoUrls = files.map(file => ({
        filename: file,
        url: `https://motivationbot-production-058c.up.railway.app/assets/photos/${file}`,
        directLink: `/assets/photos/${file}`
      }));
      
      res.json({
        count: files.length,
        photos: photoUrls,
        directory: photosDir
      });
    } catch (error: any) {
      res.status(500).json({ 
        error: error.message,
        currentDir: __dirname
      });
    }
  });

  return new Promise<void>((resolve) => {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`HTTP сервер запущен на 0.0.0.0:${PORT}`);
      console.log(`Статика доступна по: https://motivationbot-production-058c.up.railway.app/assets/photos/`);
      resolve();
    });
  });
}