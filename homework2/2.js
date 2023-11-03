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




function createProductCard(cardData) {
  const cardEl = document.createElement('div');
  cardEl.classList.add('card');

  const titleEl = document.createElement('h3');
  titleEl.classList.add('card__title');
  titleEl.textContent = cardData.product;

  const ulEl = document.createElement('ul');
  ulEl.classList.add('card__review-list');

  const errorDivEl = document.createElement('div');
  errorDivEl.classList.add('card__review-error');

  const formEl = document.createElement('form');
  formEl.classList.add('card__review-form');
  

  const inputEl = document.createElement('input');
  inputEl.classList.add('card__review-input');
  inputEl.setAttribute('placeholder', 'Напишите свой отзыв...');

  const buttonEl = document.createElement('button');
  buttonEl.classList.add('card__review-button');
  buttonEl.textContent = 'Оставить отзыв';
  buttonEl.addEventListener('click', event => {
    return addNewReview(
      event, 
      inputEl, 
      ulEl, 
      errorDivEl
      )
  }
  );

  formEl.appendChild(inputEl);
  formEl.appendChild(buttonEl);

  addLiItems(ulEl, cardData.reviews);

  cardEl.appendChild(titleEl);
  cardEl.appendChild(ulEl);
  cardEl.appendChild(formEl);
  cardEl.appendChild(errorDivEl);
  return cardEl;
}

function createLiItem(liItem) {
  const liEl = document.createElement('li');
  liEl.classList.add('card__review-item');
  liEl.textContent = liItem.text;
  return liEl
}

function addLiItems(ulElement, liItems) {
  if (liItems.length !== 0) {
    for (const liItem of liItems) {
      const liEl = createLiItem(liItem);
      ulElement.appendChild(liEl);
    }
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

function createNewReview(value) {
  return {
    id: Date.now(),
    text: value,
  }
}

function addNewReview(event, inputElement, ulElement, errorElement) {
  event.preventDefault();
  const result = validateInputText(inputElement.value);
  if(result === '') {
    const newReview = createNewReview(inputElement.value);
    const newLi = createLiItem(newReview);
    ulElement.appendChild(newLi);
    inputElement.value = '';
    errorElement.textContent = '';
  } else {
    errorElement.textContent = result;
  }
  


}

const products = document.querySelector('#products');

for (const product of initialData) {
  products.appendChild(createProductCard(product))
}

