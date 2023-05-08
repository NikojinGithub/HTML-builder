const fs = require('fs');
const path = require('path');

//Создаем поток ввода. Создает файл. Записываем в него файлы.
const fileCSS = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

const fileStyles = path.join(__dirname, 'styles');

fs.readdir(fileStyles, (err, data) => {
  if(err){
    console.log('Error');
  }
  data.forEach(file => {
    if(path.extname(file) === '.css'){
      const info = fs.createReadStream(path.join(fileStyles, file), 'utf-8');
      let data = '';
      info.on('data', chunk => data += chunk);
      info.on('end', () => {
        fileCSS.write(data);
      });
    }
  })
})