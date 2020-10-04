'use strict';

import {getData} from './getData.js';
import { userData } from './userData.js';

const COUNTER = 6;

const generateGoodsPage = () => {

    const mainHeader = document.querySelector('.main-header');

    const generateCards = (data) => {
        
        const goodsList = document.querySelector('.goods-list');

        goodsList.textContent = '';
        if (data.length) {
            data.forEach( ( {count: count, id: id, img: imgList, name: itemName, description: desc, price: price } ) => {
                goodsList.insertAdjacentHTML('afterbegin', `
                <li class="goods-list__item">
                    <a class="goods-item__link" href="card.html#${id}">
                        <article class="goods-item">
                            <div class="goods-item__img">
                                <img src="${imgList[0]}"
                                    ${imgList[1] && `data-second-image="${imgList[1]}" alt="${itemName}">`}
                            </div>
                            ${!count ? `<p class="goods-item__new">Нет в наличии</p>` : ''}
                            ${count > COUNTER ? `<p class="goods-item__new">Новинка</p>` : ''}
                            <h3 class="goods-item__header">${itemName}</h3>
                            <p class="goods-item__description">${desc}</p>
                            <p class="goods-item__price">
                                <span class="goods-item__price-value">${price}</span>
                                <span class="goods-item__currency"> ₽</span>
                            </p>
                            ${count ? `<button class="btn btn-add-card" aria-label="Добравить в корзину" data-idd="${id}"></button>`: ''}
                        </article>
                    </a>
                </li>
                `);

                goodsList.addEventListener('click', (event) => {
                    const btnAddCart = event.target.closest('.btn-add-card');
                    if (btnAddCart) {
                        event.preventDefault();
                        userData.cartlist = btnAddCart.dataset.idd;
                    }
                });

            });
        } else {
            const goods = document.querySelector('.goods');
            goods.textContent = (location.search === '?wishlist') ? "Ваш список желаний пуст" :
            "К сожалению по вашему запросу ничего не найдено";
        }

    }

    if (location.pathname.includes('goods') && location.search) {
        const search = decodeURI(location.search);
        const prop = search.split('=')[0].substring(1);
        const value = search.split('=')[1];
        
        if (prop === 's') {
            getData.search(value, generateCards);
            mainHeader.textContent = `Поиск: ${value}`;
        } else if (prop === 'wishlist') {
            getData.wishList(userData.wishList, generateCards);
            mainHeader.textContent = `Список желаний`;
        } else if (prop === 'cat' || prop === 'subcat') {
            getData.category(prop, value, generateCards);
            mainHeader.textContent = value;
        }
    }

};

export default generateGoodsPage;