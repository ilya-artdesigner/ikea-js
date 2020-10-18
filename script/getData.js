const PARAM = {
    cat: "category",
    subcat: "subcategory",
    search: ["name", "description", "category", "subcategory"]
};

export const getData = {
    url: 'database/dataBase.json',
    async getData() {
        const responce = await fetch(this.url);

        if (!responce.ok) {
            throw new Error(`Ошибка по адресу ${url}, статус ошибки ${responce.status}`);
        }

        return await responce.json();
    },
    get(process) {
        this.getData(this.url)
        .then(process)
        .catch((err) => console.error(err));
    },
    wishList(list, callback) {
        this.get((data) => {
            const result = data.filter((item) => list.includes(item.id));
            callback(result);
        });
    },
    item(value, callback) {
        this.get((data) => {
            const result = data.find((item) => item.id === value);
            callback(result);
        });
    },
    cart(list, callback) {
        this.get((data) => {
            const result = data.filter( (item) => 
                list.some( (obj) => obj.id === item.id ));
            callback(result);
        });
    },
    category(prop, value, callback) {
        this.get((data) => {
            const result = data.filter( (item) => 
                item[PARAM[prop]].toLowerCase() === value.toLowerCase() );
            callback(result);
        });
    },
    search(value, callback) {
        this.get((data) => {
            const result = data.filter( (item) => {
                for (const prop in item) {
                    if ( PARAM.search.includes(prop) && item[prop].toLowerCase().includes(value.toLowerCase()) ) {
                        return true;
                    }
                }
            });
            callback(result);
        });
    },
    catalog(callback) {
        this.get((data) => {
            const result = data.reduce( (basis, item) => {
                if (!basis.includes(item[PARAM.cat]) ) {
                    basis.push(item[PARAM.cat]);
                }
            return basis;
            }, [] );

            callback(result);
        });
    },
    subCatalog(value, callback) {
        this.get((data) => {

            const result = data.filter( (item) => item[PARAM.cat].toLowerCase() === value.toLowerCase())
            .reduce( (basis, item) => {
                if (!basis.includes(item[PARAM.subcat]) ) {
                        basis.push(item[PARAM.subcat]);
                }
                return basis;
            }, []);
            callback(result);
        });
    }
};