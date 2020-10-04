'use strict';

import {getData} from './getData.js';
import {userData} from './userData.js';

const generateCartPage = () => {

    const renderCart = (data) => {

        const cartList = document.querySelector('.cart-list');
        const cartTotalPrice = document.querySelector('.cart-total-price');
        const btnRemove = document.querySelector('.btn-remove');

        /* const productImageContainer = document.querySelector('.product__image-container');
        const productName = document.querySelector('.product__name');
        const productDescr = document.querySelector('.product_description-text');
        const productTotalPrice = document.querySelector('.product__total');
        const productControls = document.querySelector('.product-controls__quantity'); */


        const getTotalProductPrice = (count , price) => {
            let result = price.includes(',') ? price.split(',') : 
                         price.includes('.') ? price.split('.') : price;
            return result.reduce((ceil, drob) => parseFloat(ceil * count + parseFloat(drob * count / 100).toFixed(2)), result[0]);
        };

        const getTotalCartPrice = (data) => {
            
        };

        data.forEach( ({count: count, id: id,}, {img, name: itemName, description: desc, price: price }) => {

            

            cartList.insertAdjacentHTML('afterbegin', `
                <div class="product">
                    <div class="product__image-container">
                        <img src="${img[0]}" alt="${itemName}" itemprop="image">
                    </div>
                    <div class="product__description">
                        <h3 class="product__name">
                            <a href="card.html#${id}">${itemName}</a></h3>
                        <p class="product_description-text">${desc}</p>
                    </div>
                    <div class="product__prices">
                        <div class="product__price-type product__price-type-regular">
                            <div>
                                ${ count > 1 ? 
                                    `<div class="product__price-regular">
                                        ${getTotalProductPrice(count, price)}
                                    </div>
                                    <div class="product__total product__total-regular">${price}</div>` :
                                    `<div class="product__price-regular">${price}</div>`
                                }
                            </div>
                        </div>
                    </div>
                    <div class="product__controls">

                        <div class="product-controls__remove">
                            <button type="button" class="btn btn-remove">
                                <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                            </button>
                        </div>
                        <div class="product-controls__quantity">
                            <select title="Выберите количество" aria-label="Выберите количество">
                                <option value="${count}"></option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>

                            </select>
                        </div>
                    </div>
                </div>
            `);

        });




    



        btnRemove.addEventListener('click', event => {
            event.preventDefault();
        });

    };

    if (location.pathname.includes('cart')) {
        getData.cart(userData.cartList, renderCart);
    }

};

export default generateCartPage;