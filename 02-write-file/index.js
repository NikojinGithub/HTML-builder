const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

//Создали поток ввода, который создат текстовый файл, если его нет, в папке с js файлом.
//В этот файл будет записываться весь вводимы текст.
const output = fs.createWriteStream(path.join(__dirname, 'text.txt'));

//Запрос на ввод текста.
stdout.write('Введите текст который нужно записать в файл: \n');

//Обрабатываем вводимый текст -> помещаем его в созданный файл через созданный поток записи.
stdin.on('data', chunk => {

  //Проверка на ключевое слово для завершния работы.
  if(chunk.toString().trim() === 'exit'){
    stdout.write('Работа программы завершена. Хорошего дня!');
    process.exit();
  }
  //Запись в файл.
  output.write(chunk)
});

//Отлавливаем события для ctrl+C. Выполняем необходимы действия.
process.on('SIGINT', () => {
  stdout.write('Работа программы завершена. Хорошего дня!');
  process.exit();
})



