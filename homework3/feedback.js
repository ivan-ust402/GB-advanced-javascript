'use strict';

const formEl = document.querySelector('.feedback__form');
const productNameEl = document.querySelector('.feedback__product-name');
const feedbackEl = document.querySelector('.feedback__text');
const addBtnEl = document.querySelector('.feedback__btn_add');
const messageEl = document.querySelector('.feedback__message');
const visitProductsBtn = document.querySelector('.feedback__btn_back')

formEl.addEventListener('click', event => {
    event.preventDefault();
    if (event.target.tagName === 'BUTTON') {
        messageEl.textContent = '';
        try {
            const nameValue = productNameEl.value.trim();
            const feedbackValue = feedbackEl.value.trim();
            if (!nameValue) {
                throw new Error('Поле "Наименование товара" не должно быть пустым!')
            }
            if (!feedbackValue) {
                throw new Error('Поле "Ваш отзыв" не должно быть пустым!')
            }
            addFeedback(nameValue, feedbackValue);
            productNameEl.value = '';
            feedbackEl.value = '';
        } catch (error) {
            messageEl.textContent = error.message;
        }

    }
})

visitProductsBtn.addEventListener('click', () => {
    window.location.href = 'products.html';
})

// localStorage.removeItem(PRODUCTS_KEY);