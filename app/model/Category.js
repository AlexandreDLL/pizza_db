class Category extends Model {

    constructor(obj){
        super(obj);
        this.assign(obj);
    }

    id = 0;
    active = true;
    title = '';
    description = '';
    onsale = true;
    ord = 0;
}