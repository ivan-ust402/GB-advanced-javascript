'use strict';

const toFeedbackBtnEl = document.querySelector('.products__btn_to-feedback');
const initialEl = document.querySelector('.products__initial');
const listEl = document.querySelector('.products__list-block');
const productsEl = document.querySelector('.products');

if(checkProductsData()) {
    toggleBlocks(initialEl, listEl);
}

toFeedbackBtnEl.addEventListener('click', () => {
    window.location.href = 'feedback.html';
})

listEl.innerHTML = createList();


listEl.addEventListener('click', event => {
    const target = event.target;
    if (target.classList.contains('products__toggle')) {
        const itemEl = target.closest('.products__item');
        const detailsEl = itemEl.querySelector('.products__details');
        toggleName(target);
        toggleBlock(detailsEl);
    }
    if (target.classList.contains('products__feedback-delete')){
        const feedbackItemEl = target.closest('.products__feedback-item');
        const productItemEl = target.closest('.products__item');
        const feedbackID = feedbackItemEl.dataset.reviewid;
        const productID = productItemEl.dataset.productid;
        deleteFeedbackItem(productID, feedbackID, productsEl);
    }
})

    
