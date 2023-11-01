"use strict"

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/

console.log("Задание 1");
console.log("First solution");

const albumns = [
  {
    title: "Альбом 1",
    artist: "Исполнитель 1",
    year: "Год выпуска 1",
  },
  {
    title: "Альбом 2",
    artist: "Исполнитель 2",
    year: "Год выпуска 2",
  },
  {
    title: "Альбом 3",
    artist: "Исполнитель 3",
    year: "Год выпуска 3",
  },
  {
    title: "Альбом 4",
    artist: "Исполнитель 4",
    year: "Год выпуска 4",
  },
  {
    title: "Альбом 5",
    artist: "Исполнитель 5",
    year: "Год выпуска 5",
  },
  {
    title: "Альбом 6",
    artist: "Исполнитель 6",
    year: "Год выпуска 6",
  },
  {
    title: "Альбом 7",
    artist: "Исполнитель 7",
    year: "Год выпуска 7",
  },
];
const musicCollection = {
  albumns,
  [Symbol.iterator]() {
    let index = 0
    const albumnsArr = this.albumns
    return {
      next() {
        return index < albumnsArr.length
          ? {
              done: false,
              value: albumnsArr[index++],
            }
          : {
              done: true,
            }
      },
    }
  },
};

for (const albumn of musicCollection) {
  console.log(`${albumn.title} - ${albumn.artist} (${albumn.year}) `);
}


// Another various
console.log("----------------------------------------");
console.log("Another solution");
const musicCollection2 = {
  albumns,
  *[Symbol.iterator]() {
    for (const albumn of this.albumns) {
      yield albumn;
    }
  },
};

for (const albumn of musicCollection2) {
  console.log(`${albumn.title} - ${albumn.artist} (${albumn.year}) `);
}