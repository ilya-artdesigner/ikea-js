'use strict';

import { getData } from './getData.js';

export const loadData = () => {

    if (location.pathname.includes('cart')) {
        getData.cart(cartList, (data) => console.log(data));
    }

    /* getData.catalog((data) => console.log(data)); */
    /* getData.subCatalog("Мебель",(data) => console.log(data)); */
}

