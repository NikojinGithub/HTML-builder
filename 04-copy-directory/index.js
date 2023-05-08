const fs = require('fs');
const path = require('path');

//Путь к новой папке.
const newFolder = path.join(__dirname, 'file-copy');

//Путь к папке с файлами.
const folderFiles = path.join(__dirname, 'files');

function updateFolder(){
  fs.rm(newFolder, { recursive: true }, (err) =>{
    if(err){
     console.log('Error');
      return;
    }
    createFolder();
    copyFiles();
  })
}

//Создаем новую папку, если она не существует.
function createFolder(){
  fs.mkdir(newFolder, (err) => {
    if(err){
      console.log('Error');
      return;
    }
  });
}

function copyFiles(){
  //Заходим в папку с файлами и совершаем необходимые нам действия с каждым из файлов.
  fs.readdir(folderFiles, (err, data) => {
    if(err){
     console.log('Error');
     return;
    }
    //В data лежит массив с названиями файлов внутри папки files.
    data.forEach(file => {

      //Проходим по каждому файлу. Записываем в одну переменную его актуальный адрес
      //и во вторую переменную адресс куда копируем.
     const actualAdress = path.join(folderFiles, file);
     const copyAdress = path.join(newFolder, file);

     //Для каждого файла из полученного массива выполняем копирование в новую папкую.
     fs.copyFile(actualAdress, copyAdress, (err) => {
        if(err){
          console.log('Error');
          return;
        }
      })
    })
    console.log('All files copied');
  })
}

//Проверяем существует ли папка.
//Если нет -> создаем и копируем в нее файлы.
//Если да -> пересоздаем папку с актуальными данными.
fs.access(newFolder, (folder) => {
  if(folder){
    createFolder();
    copyFiles();
  } else {
    updateFolder();
  }
})