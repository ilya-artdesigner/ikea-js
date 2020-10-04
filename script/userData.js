'use strict';

export const userData = {
    _wishListData: [],

    get wishList() {
        return this._wishListData;
    },
    set wishList(id) {
        if (this._wishListData.includes(id)) {
            const index = this._wishListData.indexOf(id);
            this._wishListData.splice(index, 1);
        } else {
            this._wishListData.push(id);
            console.log(id);
        }
    },


    /* {
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
    */

    _cartListData: [],

    get cartList() {
        return this._cartListData;
    },

    set cartList(id) {
        let good = this._cartListData.find( (item) => item.id === id);

        if (good) {
            good.count++;
        } else {
            good = {
                id,
                count: 1
            }
            this._cartListData.push(good);
        }
    }

};