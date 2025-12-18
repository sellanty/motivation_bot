// check.js
const fs = require('fs');
const path = require('path');

console.log('=== DIAGNOSTIC START ===');
console.log('1. Текущая рабочая директория:', __dirname);
console.log('2. Содержимое корня:');
fs.readdirSync('.').forEach(item => console.log('   -', item));

// Проверяем разные возможные пути к dist
const possiblePaths = [
    '.',
    '/app',
    path.join(__dirname, 'dist'),
    '/app/dist'
];

console.log('3. Поиск папки dist:');
possiblePaths.forEach(p => {
    const distPath = path.join(p, 'dist');
    console.log(`   Проверяем "${distPath}":`, fs.existsSync(distPath) ? '✅ СУЩЕСТВУЕТ' : '❌ НЕТ');
});

console.log('=== DIAGNOSTIC END ===');
process.exit(0);