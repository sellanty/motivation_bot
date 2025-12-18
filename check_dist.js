// check_dist.js
const fs = require('fs');
const path = require('path');

console.log('=== CHECK DIST CONTENT ===');
const indexPath = path.join(__dirname, 'dist', 'index.js');

// 1. Существует ли файл
console.log('1. Файл существует?', fs.existsSync(indexPath));

if (fs.existsSync(indexPath)) {
    // 2. Какой у него размер
    const stats = fs.statSync(indexPath);
    console.log('2. Размер файла (байт):', stats.size);
    
    // 3. Прочитать первые 500 символов файла
    const content = fs.readFileSync(indexPath, 'utf8').substring(0, 500);
    console.log('3. Начало файла:');
    console.log('---');
    console.log(content);
    console.log('---');
    
    // 4. Попробовать выполнить require
    console.log('4. Пробуем загрузить модуль...');
    try {
        const module = require(indexPath);
        console.log('✅ Модуль загружен успешно!');
    } catch (error) {
        console.error('❌ Ошибка загрузки модуля:', error.message);
        console.error('Стек ошибки:', error.stack);
    }
} else {
    console.log('❌ Файл не найден!');
}
console.log('=== CHECK END ===');
process.exit(0);