'use strict';
const PRODUCTS_KEY = 'products';

// class Product {
//     static id = 0;
//     constructor(name) {
//         this.name = name;
//         this.id = ++Product.id;
//         this.feedbacks = [];
//     }

//     setNewFeedback(text) {
//         const feedback = new Feedback(text);
//         const feedbackObj = new Object(feedback.id, feedback.text);
//         this.feedbacks.push(feedbackObj);
//     }

//     get id() {
//         return this.id;
//     }
    
//     get name() {
//         return this.name;
//     }
    
//     get feedbacks() {
//         return this.feedbacks;
//     }
// }

// class Feedback {
//     static id = 0;
//     constructor(text) {
//         this.text = text;
//         this.id = ++Feedback.id;
//     }

//     get text() {
//         return this.text;
//     }

//     get id() {
//         return this.id;
//     }
// }

let createNewFeedback = wrapperCreateNewFeedback();
let createNewProduct = wrapperCreateNewProduct();



function addFeedback(productName, feedbackText) {
    const products = getProducts();
    const findProduct = products.find(product => product.name === productName);
    if (findProduct){
        const updatedProducts = products.map(product => {
            if (product.name === productName) {
                product.feedbacks.push(createNewFeedback(feedbackText));
            }
            return product;
        })
        setProducts(updatedProducts);
    } else {
        const newProduct = createNewProduct(productName, feedbackText);
        products.push(newProduct);
        setProducts(products);
    }
}

function wrapperCreateNewFeedback() {
    let id = 0;
    return function(text) {
        return {id: id++, text};
    }
}


function wrapperCreateNewProduct() {
    let id = 0;
    return function(prodName, textForFeedback) {
        const product = {
            id: id++, 
            name: prodName,
            feedbacks: [],
        }
        const feedback = createNewFeedback(textForFeedback);
        product.feedbacks.push(feedback);
        return product;
    }
}

function getProducts() {
    const data = localStorage.getItem(PRODUCTS_KEY);
    if (data === null) {
        return [];
    }
    return JSON.parse(data);
}

function setProducts(products) {
    const json = JSON.stringify(products);
    localStorage.setItem(PRODUCTS_KEY, json);
}

function checkProductsData() {
    const result = getProducts();
    return result.length !== 0;
}

function toggleBlocks(firstBlock, secondBlock) {
    firstBlock.classList.toggle('hide');
    secondBlock.classList.toggle('hide');
}

function createList() {
    const products = getProducts();
    return `
    <h1 class="products__title">Список наших продуктов</h1>
    <ul class="products__list">
      ${getProductsTemplate(products)}
    </ul>
    `;
}

function getFeedbacksTemplate(reviews) {
    let resultTemplate = '';
    reviews.map((review, index) => {
        resultTemplate += `
        <li class="products__feedback-item" data-reviewid="${review.id}">
            <span>${index + 1}.</span>
            <p class="products__feedback-text">
            ${review.text}
            </p>
            <button class="products__feedback-delete">&#10006;</button>
        </li>
        `;
    });
    return resultTemplate;
}

function getProductsTemplate(inputProducts) {
    let resultTemplate = '';
    inputProducts.map((product, index) => {
        resultTemplate += `
        <li class="products__item" data-productid="${product.id}">
            <div class="products__description">
                <h3 class="products__item-title">
                    <span>${index + 1}.</span>
                    &nbsp;${product.name}</h3>
                <button class="products__toggle">Показать отзывы</button>
            </div>
            <div class="products__details hide">
                <ul class="products__feedback-list">
                    ${getFeedbacksTemplate(product.feedbacks)}
                </ul>
            </div>
        </li>
        `;
    });
    return resultTemplate;
}

function toggleBlock(block) {
    block.classList.toggle('hide');
}

function toggleName(button) {
    if(button.textContent === 'Показать отзывы') {
        button.textContent = 'Скрыть отзывы';
    } else {
        button.textContent = 'Показать отзывы';
    }
}

function deleteFeedbackItem(goodId, reviewId, rootEl) {
    const productId = Number(goodId);
    const feedbackId = Number(reviewId);
    let products = getProducts();
    const findProduct = products.find(product => product.id === productId);
    const feedbacks = findProduct.feedbacks;
    const newFeedbacks = feedbacks.filter(feedback => feedback.id !== feedbackId);
    if(newFeedbacks.length === 0) {
        products = products.filter(product => product.id !== productId);
    } else {
        products = products.map(product => {
            if(product.id == productId) {
                product.feedbacks = newFeedbacks;
            }
            return product;
        })
    }

    setProducts(products);
}