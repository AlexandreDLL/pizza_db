class Product extends Model {

    constructor(obj){
        super(obj);
        this.assign(obj);
    }

    static list = [];
    id = 0;
    active = true;
    category_id = 0;
    title = '';
    description = '';
    price = 0;
    onsale = true;
    ord = 0;

    get category(){
        return Category.getObject({id: this.category_id});
    }

    get onsaleBadge(){
        return new BoolBadge(this.onsale).render();
    }
}