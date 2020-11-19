class Product {

    constructor(obj){
        for(let v in obj){
            if(this[v] != undefined && typeof this[v] == 'number'){
                this[v] = Number(obj[v]);
            }
            else if(this[v] != undefined && typeof this[v] == 'boolean'){
                this[v] = obj[v] == '1' ? true : false;
            }
            else{
                this[v] = obj[v];
            }
        }
    }

    id = 0;
    active = true;
    category_id = 0;
    title = '';
    description = '';
    price = 0;
    onsale = true;
    ord = 0;
}