'use strict';

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

const PRODUCTS_KEY = 'products';

const initialData = [
    {
        id: 0,
        name: 'Dji mini',
        feedbacks: [
            {
                id: 0,
                text: 'Маленький',
            },
            {
                id: 1,
                text: 'Бесшумный',
            },
            {
                id: 2,
                text: 'Надолго хватает аккумулятора',
            },
            {
                id: 3,
                text: 'Хорошая дальность полета',
            }
        ]
    },
    {
        id: 1,
        name: 'Аккумулятор Akom',
        feedbacks: [
            {
                id: 4,
                text: 'Много брака',
            },
            {
                id: 5,
                text: 'В принципе служит',
            },
            {
                id: 6,
                text: 'Требуется ежегодное обслуживание',
            },
            {
                id: 7,
                text: 'Цена/качество - этим все сказано',
            }
        ]
    },
    {
        id: 2,
        name: 'Lorem, ipsum dolor.',
        feedbacks: [
            {
                id: 8,
                text: 'Lorem ipsum dolor sit amet consectetur.',
            },
            {
                id: 9,
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, omnis.',
            },
            {
                id: 10,
                text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam fuga consequatur maxime! Consectetur odio voluptatibus hic enim non tempore, eum omnis quos reiciendis nihil ut, porro aut quisquam? Obcaecati, provident!            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque provident consequuntur facere nostrum odio sit cum ipsum suscipit quia? Ut quos quibusdam quia adipisci. Quam voluptate ex blanditiis ratione? Error nesciunt provident eaque, possimus id ex voluptatem illum reprehenderit debitis, dolores nisi, ut alias? Aperiam doloribus placeat eos consectetur maxime tenetur dolor, architecto eius minus repudiandae nulla dignissimos quia ipsa id similique neque omnis minima unde eaque. Optio, eius. Sed obcaecati eos eius facere quo ea repellat blanditiis architecto minus explicabo debitis recusandae maiores maxime quos sequi officia tempora, alias nulla ex enim! Quidem minima corporis, eaque blanditiis unde consequuntur.',
            },
            {
                id: 11,
                text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti cupiditate ex sed quas sapiente impedit est, nihil molestiae recusandae veritatis in ipsam ipsum voluptas porro ab provident assumenda laborum et iusto non vel? Similique, voluptatum placeat vitae voluptatem numquam nesciunt esse dicta consequatur, id aperiam, ea facere reprehenderit. Quisquam, modi.',
            }
        ]
    },
    {
        id: 3,
        name: 'Lorem ipsum dolor sit.',
        feedbacks: [
            {
                id: 12,
                text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti cupiditate ex sed quas sapiente impedit est, nihil molestiae recusandae veritatis in ipsam ipsum voluptas porro ab provident assumenda laborum et iusto non vel? Similique, voluptatum placeat vitae voluptatem numquam nesciunt esse dicta consequatur, id aperiam, ea facere reprehenderit. Quisquam, modi.',
            },
            {
                id: 13,
                text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque provident consequuntur facere nostrum odio sit cum ipsum suscipit quia? Ut quos quibusdam quia adipisci. Quam voluptate ex blanditiis ratione? Error nesciunt provident eaque, possimus id ex voluptatem illum reprehenderit debitis, dolores nisi, ut alias? Aperiam doloribus placeat eos consectetur maxime tenetur dolor, architecto eius minus repudiandae nulla dignissimos quia ipsa id similique neque omnis minima unde eaque. Optio, eius. Sed obcaecati eos eius facere quo ea repellat blanditiis architecto minus explicabo debitis recusandae maiores maxime quos sequi officia tempora, alias nulla ex enim! Quidem minima corporis, eaque blanditiis unde consequuntur.',
            },
            {
                id: 14,
                text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam fuga consequatur maxime! Consectetur odio voluptatibus hic enim non tempore, eum omnis quos reiciendis nihil ut, porro aut quisquam? Obcaecati, provident!',
            },
            {
                id: 15,
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati itaque enim aliquam recusandae consectetur corrupti, perferendis harum nisi libero labore.',
            }
        ]
    },
    {
        id: 4,
        name: 'Lorem, ipsum.',
        feedbacks: [
            {
                id: 16,
                text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam fuga consequatur maxime! Consectetur odio voluptatibus hic enim non tempore, eum omnis quos reiciendis nihil ut, porro aut quisquam? Obcaecati, provident!',
            },
            {
                id: 17,
                text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati itaque enim aliquam recusandae consectetur corrupti, perferendis harum nisi libero labore.',
            },
            {
                id: 18,
                text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Corrupti cupiditate ex sed quas sapiente impedit est, nihil molestiae recusandae veritatis in ipsam ipsum voluptas porro ab provident assumenda laborum et iusto non vel? Similique, voluptatum placeat vitae voluptatem numquam nesciunt esse dicta consequatur, id aperiam, ea facere reprehenderit. Quisquam, modi.',
            },
            {
                id: 19,
                text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque provident consequuntur facere nostrum odio sit cum ipsum suscipit quia? Ut quos quibusdam quia adipisci. Quam voluptate ex blanditiis ratione? Error nesciunt provident eaque, possimus id ex voluptatem illum reprehenderit debitis, dolores nisi, ut alias? Aperiam doloribus placeat eos consectetur maxime tenetur dolor, architecto eius minus repudiandae nulla dignissimos quia ipsa id similique neque omnis minima unde eaque. Optio, eius. Sed obcaecati eos eius facere quo ea repellat blanditiis architecto minus explicabo debitis recusandae maiores maxime quos sequi officia tempora, alias nulla ex enim! Quidem minima corporis, eaque blanditiis unde consequuntur.',
            }
        ]
    },
]


function findMaxID(data) {
    let maxProductId = Number.MIN_SAFE_INTEGER;
    let maxFeedbackId = Number.MIN_SAFE_INTEGER;
    for (const product of data) {
        if (maxProductId < product.id) {
            maxProductId = product.id;
        }
        for (const feedback of product.feedbacks) {
            if (feedback.id > maxFeedbackId) {
                maxFeedbackId = feedback.id;
            }
        }
    }
    return {
        maxProductId,
        maxFeedbackId
    };
}

const {maxProductId, maxFeedbackId} = findMaxID(initialData);

// localStorage.removeItem(PRODUCTS_KEY);
// 
// setProducts(initialData);
// let createNewFeedback = wrapperCreateNewFeedback(maxFeedbackId + 1);
// let createNewProduct = wrapperCreateNewProduct(maxProductId + 1);

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

function wrapperCreateNewFeedback(inputId = 0) {
    let id = inputId;
    return function(text) {
        return {id: id++, text};
    }
}


function wrapperCreateNewProduct(inputId = 0) {
    let id = inputId;
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

function getProductTemplate(product, hide = true, initialButtonText = true) {
    return `
    <li class="products__item" data-productid="${product.id}">
        <div class="products__description">
            <h3 class="products__item-title">
                <span>&#10054;</span>
                &nbsp;${product.name}</h3>
            <button class="products__toggle">${initialButtonText ? 'Показать отзывы' : 'Cкрыть отзывы'}</button>
        </div>
        <div class="products__details ${hide ? 'hide' : ''}">
            <ul class="products__feedback-list">
                ${getFeedbacksTemplate(product.feedbacks)}
            </ul>
        </div>
    </li>
    `;
}

function getFeedbackTemplate(review, index) {
    return `
    <li class="products__feedback-item" data-reviewid="${review.id}">
        <span>${index + 1}.</span>
        <p class="products__feedback-text">
        ${review.text}
        </p>
        <button class="products__feedback-delete">&#10006;</button>
    </li>
    `;
}

function getFeedbacksTemplate(reviews) {
    let resultTemplate = '';
    reviews.map((review, index) => {
        resultTemplate += getFeedbackTemplate(review, index);
    });
    return resultTemplate;
}

function getProductsTemplate(inputProducts) {
    let resultTemplate = '';
    inputProducts.map(product => {
        resultTemplate += getProductTemplate(product);
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

function deleteFeedbackItem(goodId, reviewId, firstEl, secondEl, partialListEl) {
    let products = getProducts();
    const findProduct = products.find(product => product.id === goodId);
    const feedbacks = findProduct.feedbacks;
    const newFeedbacks = feedbacks.filter(feedback => feedback.id !== reviewId);
    if(newFeedbacks.length === 0) {
        products = products.filter(product => product.id !== goodId);
        
        const childEl = secondEl.querySelector('.products__item[data-productid="'+ goodId +'"]');
        const parentEl = childEl.closest('.products__list');
        parentEl.removeChild(childEl);
    } else {
        products = products.map((product, index) => {
            if(product.id == goodId) {
                product.feedbacks = newFeedbacks;
                partialListEl.innerHTML = getProductTemplate(product, false, false);
            }
            return product;
        })
        
    }

    if(products.length === 0) {
        toggleBlocks(firstEl, secondEl);
    }

    setProducts(products);
}



