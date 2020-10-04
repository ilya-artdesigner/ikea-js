'use strict';

import { getData }  from './getData.js';
import { userData } from './userData.js';
import generateBreadCrumbs from './generateBreadCrumbs.js';

const NEW_ITEM_COUNT = 6;

const generateItemPage = () => {

    const renderCard = ({category, subcategory, count, id, img, name: itemName, price, description}) => {

        const goodImages = document.querySelector('.good-images');
        const goodItemNew = document.querySelector('.good-item__new');
        const goodItemHeader = document.querySelector('.good-item__header');
        const goodItemDescription = document.querySelector('.good-item__description');
        const goodItemEmpty = document.querySelector('.good-item__empty');
        const goodItemPrice = document.querySelector('.good-item__price-value');
        const btnGood = document.querySelector('.btn-good');
        const btnAddWishlist = document.querySelector('.btn-add-wishlist');

        generateBreadCrumbs({category, subcategory, itemName});

        goodImages.textContent = '';

        goodItemEmpty

        goodItemHeader.textContent = itemName;
        goodItemDescription.textContent = description;
        
        goodItemPrice.textContent = price;
        btnGood.dataset.idd = id;
        btnAddWishlist.dataset.idd = id;

        img.forEach( (item) => {
            goodImages.insertAdjacentHTML('afterbegin', `
                <div class="good-image__item">
                    <img src="${item}" alt="${itemName} - ${description}">
                </div>
            `);
        });

        if (count >= NEW_ITEM_COUNT) {
            goodItemNew.style.display = 'block';
        } else if (!count) {
            goodItemEmpty.style.display = 'block';
            btnGood.style.display = 'none';
        }

        const checkWishList = () => {
            if (userData.wishList.indexOf(id)) {
                btnAddWishlist.classList.add('contains-wishlist');
            } else {
                btnAddWishlist.classList.remove('contains-wishlist');
            }
        }

        btnAddWishlist.addEventListener('click', () => {
            userData.wishList = id;
        });

        btnGood.addEventListener('click', () => {
            userData.cartList = id;
        })

        checkWishList();
    };

    if (location.hash && location.pathname.includes('card')) {
        getData.item(location.hash.substring(1), renderCard);
    }
};

export default generateItemPage;