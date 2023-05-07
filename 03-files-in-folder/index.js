const fs = require('fs');
const path = require('path');

const { stdout } = process;

//Записываем путь до нужной папки в переменную.
const folderPath = path.join(__dirname, 'secret-folder', '/');

//Используем readdir для получения доступа к содержимому папки.
fs.readdir(folderPath, (err, data) => {
  if(err) {
    stdout.write(err);
  }
  //Идем по каждому файлу в папке.
  data.forEach(file => {
    //Получаем размер для каждого отдельного файла и выводи итоговый результат.
    fs.stat(path.join(folderPath, path.basename(file)), (err, stat) => {
      if(err){
        console.log(err)
      }
      //Проверяем что данный file является файлом, а не папкой.
      if(stat.isFile()) {

        //Получаем имя файла и разрешение файла отдельно.
        const name = path.basename(file.split('.')[0]);
        const ext = path.extname(file).slice(1);

        //Выводим результат.
        console.log(`${name} - ${ext} - ${stat.size} b`);
      }
    })
  });
});
