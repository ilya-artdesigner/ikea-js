'use strict';

import {getData} from './getData.js';
import {userData} from './userData.js';


const sendData = async (url, data) => {
  const responce = await fetch(url, {
    method: 'POST',
    body: data,
  })

  if (!responce.ok) {
    throw new Error(`Ошибка по адресу ${url}, статус ошибки ${responce.status}`);
  }

  return await responce.json();
};


const sendCart = () => {

    const cartForm = document.querySelector('.cart-form');

    cartForm.addEventListener('submit', e => {
        e.preventDefault();

        const formData = new FormData(cartForm);

        const data = {};

        for (const [key, value] of formData){
            data[key] = value;
        };

        data.order = userData.cartList;

        sendData('https://jsonplaceholder.typicode.com/posts', JSON.stringify(data))
            .then(() => {
                cartForm.reset();
            })
            .catch( (err) => console.error(err));
    });
}


const generateCartPage = () => {

    if (location.pathname.includes('cart')) {

        const cartList = document.querySelector('.cart-list');
        const cartTotalPrice = document.querySelector('.cart-total-price');
        const emptyCart = document.querySelector('.empty-cart');
        

        const renderCartList = (data) => {

            cartList.textContent = '';

            let totalPrice = 0;

            if (data.length) {
                data.forEach( ({count, id , img, name: itemName, description, price }) => {

                    let options = '';
    
                    let userCount = userData.cartList.find( (item) => item.id === id).count;
        
                    if (userCount > count) {
                        userCount = count; 
                    }
    
                    for (let i = 1; i <= count; i++) {
                        options += `<option value="${i}" ${userCount === i ? `selected` : ''}>${i}</option>`;
                    }
    
                    totalPrice += parseFloat(price * userCount);
    
                    cartList.insertAdjacentHTML('beforeend', `
                        <div class="product">
                            <div class="product__image-container">
                                <img src="${img[0]}" alt="${itemName} - ${description}">
                            </div>
                            <div class="product__description">
                                <h3 class="product__name">
                                    <a href="card.html#${id}">${itemName}</a></h3>
                                <p class="product_description-text">${description}</p>
                            </div>
                            <div class="product__prices">
                                <div class="product__price-type product__price-type-regular">
                                    <div>
                                        <div class="product__total product__total-regular">${price * userCount}.-</div>
                                        ${ userCount > 1 ?
        
                                            `<div class="product__price-regular">${price}.-</div>` : ''
                                        }
                                    </div>
                                </div>
                            </div>
                            <div class="product__controls">
    
                                <div class="product-controls__remove">
                                    <button type="button" class="btn btn-remove" data-idd="${id}">
                                        <img src="image/remove-thin-24.16c1cc7a.svg" alt="Удалить товар">
                                    </button>
                                </div>
                                <div class="product-controls__quantity">
                                    <select title="Выберите количество" aria-label="Выберите количество" data-idd="${id}">
                                        ${options}
                                    </select>
                                </div>
                            </div>
                        </div>
                    `);
                });
            } else {
                cartList.insertAdjacentHTML('beforeend', `<span id="empty-cart">Ваша корзина пуста</span>`);
            }

            cartTotalPrice.textContent =  (cartList.contains(emptyCart))  ? "0.-": totalPrice + ".-";

            cartList.addEventListener('change', (event) => {

                const target = event.target;
                
                userData.CountCartList = {
                    id: target.dataset.idd,
                    count: parseInt(target.value)
                };

                getData.cart(userData.cartList, renderCartList);
            });

            cartList.addEventListener('click', (event) => {

                const target = event.target;
                const btnRemove = target.closest('.btn-remove');
                
                if (btnRemove) {
                    userData.removeFromCartList = btnRemove.dataset.idd;
                    getData.cart(userData.cartList, renderCartList);
                }
            })
        }

        /* const btnRemove = document.querySelector('.btn-remove');

        btnRemove.addEventListener('click', event => {
            event.preventDefault();

        }); */

        getData.cart(userData.cartList, renderCartList);
        sendCart();
    }

    
};

export default generateCartPage;