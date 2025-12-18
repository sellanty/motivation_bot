// list_dist.js
const fs = require('fs');
const path = require('path');

console.log('=== LIST DIST DIRECTORY ===');

function listDir(dirPath, indent = '') {
    try {
        const items = fs.readdirSync(dirPath);
        items.forEach(item => {
            const fullPath = path.join(dirPath, item);
            const stats = fs.statSync(fullPath);
            console.log(indent + '├── ' + item + (stats.isDirectory() ? '/' : ''));
            if (stats.isDirectory()) {
                listDir(fullPath, indent + '│   ');
            }
        });
    } catch (error) {
        console.log(indent + '❌ Не удалось прочитать:', dirPath, error.message);
    }
}

const distPath = '/app/dist';
console.log('Содержимое', distPath, ':');
if (fs.existsSync(distPath)) {
    listDir(distPath);
} else {
    console.log('Папка dist не существует!');
}

console.log('=== LIST END ===');
process.exit(0);