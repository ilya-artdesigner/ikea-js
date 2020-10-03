'use strict';

import { getData } from './getData.js';


const cartList = [
    {
        id: 'idd098',
        count: 3
    },
    {
        id: 'idd023',
        count: 7
    },
    {
        id: 'idd072',
        count: 2
    }
];

export const loadData = () => {

    if (location.pathname.includes('cart')) {
        getData.cart(cartList, (data) => console.log(data));
    }

    /* getData.catalog((data) => console.log(data)); */
    getData.subCatalog("Мебель",(data) => console.log(data));
}

