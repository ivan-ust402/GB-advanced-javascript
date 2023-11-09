'use strict';
const PRODUCTS_KEY = 'products';

class Product {
    static id = 0;
    constructor(name) {
        this.name = name;
        this.id = ++Product.id;
        this.feedbacks = [];
    }

    setNewFeedback(text) {
        const feedback = new Feedback(text);
        const feedbackObj = new Object(feedback.id, feedback.text);
        this.feedbacks.push(feedbackObj);
    }

    get id() {
        return this.id;
    }
    
    get name() {
        return this.name;
    }
    
    get feedbacks() {
        return this.feedbacks;
    }
}

class Feedback {
    static id = 0;
    constructor(text) {
        this.text = text;
        this.id = ++Feedback.id;
    }

    get text() {
        return this.text;
    }

    get id() {
        return this.id;
    }
}

let createNewFeedback = wrapperCreateNewFeedback();
let createNewProduct = wrapperCreateNewProduct();

function addFeedback(productName, feedbackText) {
    const products = getProducts();
    const findProduct = products.find(product => product.name === productName);
    if (findProduct){
        const updatedProducts = products.map(product => {
            if (product.name === productName) {
                console.log(product)
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
    console.log(json);
    localStorage.setItem(PRODUCTS_KEY, json);
}
