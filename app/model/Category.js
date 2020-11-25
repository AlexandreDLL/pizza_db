class Category extends Model {

    constructor(obj){
        super(obj);
        this.assign(obj);
    }

    static list = [];
    id = 0;
    active = true;
    title = '';
    description = '';
    onsale = true;
    ord = 0;
}