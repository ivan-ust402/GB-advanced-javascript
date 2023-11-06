"use strict";

/*
###Задание 2
Вы разрабатываете систему отзывов для вашего веб-сайта. Пользователи могут 
оставлять отзывы, но чтобы исключить слишком короткие или слишком длинные 
сообщения, вы решаете установить ограничение, отзыв должен быть не менее 50 
символов в длину и не более 500. В случае неверной длины, необходимо выводить 
сообщение об ошибке, рядом с полем для ввода.

Создайте HTML-структуру. 
На странице должны отображаться товары, под каждым товаром должен быть список 
отзывов на данный товар. Под каждым списком отзывов должна быть форма, где можно
добавить отзыв для продукта.

При добавлении отзыва, он должен отображаться на странице под предыдущими 
отзывами, а не заменять их.
Массив initialData должен использоваться для начальной загрузки данных 
при запуске вашего приложения.

Каждый отзыв должен иметь уникальное числовое id.

ВНИМАНИЕ! Если вы не проходили на курсе работу с DOM, то можно это задание не 
делать, пока рано.
*/
console.log('');
console.log('--------------------------------------------');
console.log('Задание 2');
const initialData = [
  {
    product: "Apple iPhone 13",
    reviews: [
      {
        id: 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: 3,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: 4,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

function findMaxReviewID(data) {
  let temporary = Number.MIN_SAFE_INTEGER;
  for (const item of data) {
    for (const review of item.reviews) {
      if (review.id > temporary) {
        temporary = review.id
      }
    }
  }
  return temporary;
}

class Review {
  static id = findMaxReviewID(initialData);

  constructor(text) {
    this.text = text;
    this.id = ++Review.id;
  }

  get reviewID() {
    return this.id;
  }

  get reviewText() {
    return this.text;
  }
}

function createProductCard(cardData) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  cardEl.innerHTML = `<div class="card">
  <h3 class="card__title">${cardData.product}</h3>
  <ul class="card__review-list">
    ${ getLiItems(cardData.reviews) }
  </ul>
  <form action="#" class="card__review-form">
    <input type="text" class="card__review-input" placeholder="Напишите свой отзыв...">
    <button class="card__review-button">Оставить отзыв</button>
  </form>
  <div class="card__review-error"></div>
</div> 
  `
  return cardEl;
}

function getLiItems(liItems) {
  if (liItems.length !== 0) {
    let tempString = '';
    for (const liItem of liItems) {
      tempString += `<li class="card__review-item" data-id="${liItem.id}">${liItem.text}</li>`
    }
    return tempString;
  }
}

function validateInputText(text) {
  try {
    if (text.length > 500 || text.length < 50) {
      throw new Error('Отзыв должен быть не менее 50 символов в длину и не более 500!');
    }
    return '';
  } catch (error) {
    return error.message;
  }
}


function addLiItem(val, ulElement) {
  const reviewItem = new Review(val);
  const liEl = document.createElement('li')
  const liTemplate = `<li class="card__review-item" data-id="${reviewItem.reviewID}">${reviewItem.reviewText}</li>`
  liEl.innerHTML = liTemplate;
  console.log(reviewItem.reviewID);
  ulElement.appendChild(liEl);
}


const products = document.querySelector('#products');

for (const product of initialData) {
  products.appendChild(createProductCard(product));
}
products.addEventListener('click', event => {
  event.preventDefault();
  const buttonEl = event.target;
  if (buttonEl.classList.contains('card__review-button')) {
    const cardEl = buttonEl.closest('.card');
    const errorEl = cardEl.querySelector('.card__review-error');
    const inputEl = cardEl.querySelector('.card__review-input');
    const ulEl = cardEl.querySelector('.card__review-list');
    const value = inputEl.value;
    const validationResult = validateInputText(value);
    if(validationResult === '') {
      errorEl.textContent = '';
      addLiItem(value, ulEl);
      inputEl.value = ''; 
    } else {
      errorEl.textContent = validationResult; 
    }
  }
})
