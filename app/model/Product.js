class Product {

    constructor(obj){
        for(v in obj){
            if(this[v] != undefined && typeof this[v] == 'number'){
                this[v] = Number(obj[v]);
            }
            else if(this[v] != undefined && typeof this[v] == 'boolean'){
                
            }
        }
    }
}