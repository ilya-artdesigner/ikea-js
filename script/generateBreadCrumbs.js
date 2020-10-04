'use strict';

const generateBreadCrumbs = ({category, subcategory, itemName}) => {
    const breadCrumbLinks = document.querySelector('.breadcrumb__list');

    breadCrumbLinks.textContent = '';

    const arrBread = [category, subcategory, itemName];

    arrBread.forEach( (item) => {
        breadCrumbLinks.insertAdjacentHTML('beforeend', `
            <li class="breadcrumb__list-item">
                ${ item === arrBread[0] ? `<a href="goods.html?cat=${item}"` :
                    item === arrBread[1] ? `<a href="goods.html?subcat=${item}"` :
                    `<a`
                }
                class="breadcrumb__link">${item}</a>
            </li>
        `);
    });

};

export default generateBreadCrumbs;