class Utils {

    static init() {
        String.prototype.tryJsonParse = function () {
            let value;
            try {
                value = JSON.parse(this);
            }
            catch {
                console.log('Erreur tryJsonParse:', this);
            }
            return value;
        }

        String.prototype.tryEval = function (context) {
            let value;
            let expr = this;
            if (context) {
                expr = "context." + expr;
            }
            try {
                value = eval(expr);
            }
            catch {
                console.log('Erreur tryEval not a string', this);
            }
            return value;
        }

        $.fn.storeData = function () {
            for (let key in $(this).data()) {
                let json = {};
                json[key] = $(this).data(key);
                $(this).removeAttr('data-' + key);
                $(this).data(json);
            }
        }

        // $.fn.render = function () {
        //     this.storeData();
        //     let names = $(this).find('[data-name]');
        //     names.each((index, name) => {
        //         let classe = $(name).data('name').tryEval();
        //         let list = classe.list;
        //         $(list).each((y, obj) => {
        //             let clone = $(name).clone(true);
        //             let allDataBind = $(clone).find('[data-bind');
        //             allDataBind.each((i, elt) => {
        //                 let value = obj[$(elt).data('bind')];
        //                 $(elt).append(value);
        //             })
        //             $(this).append(elt);
        //         })
        //         $(name).hide();
        //     })
        // }

        $.fn.render = function (context) {
            this.storeData();
            let elt = this;
            let bind = $(elt).data('bind');
            if (bind == undefined) {
                let childs = $(elt).children()
                $(childs).each((i, child) => {
                    $(child).render(context);
                })
                return;
            }
            let exprEval = bind.tryEval(context);
            if (exprEval != undefined) {
                if(exprEval instanceof Array){
                    $(elt).data({list: exprEval});
                    let name = $(elt).data('name') || 'item';
                    let template = $(elt).findWithData('bind', name);
                    template.detach();
                    for(let expr of exprEval){
                        let component = template.clone(true);
                        context = {};
                        context[name] = expr;
                        $(component).render(context);
                        $(elt).append(component);
                    }
                }
                else if (exprEval instanceof Model) {
                    $(elt).data({ item: exprEval });
                    let name = $(elt).data('name') || 'item';
                    let context = {}
                    context[name] = exprEval;
                    let childs = $(elt).children();
                    $(childs).each((i, child) => {
                        $(child).render(context);
                    })
                }
                else {
                    $(elt).html(exprEval);
                }
            }
        }

        $.fn.findWithData = function(data, name){
            let elt = $(this);
            let res;
            if(value != undefined){
                res = elt.find('*').filter((i, item) => $(item).data(data) == value);
            }
            else{
                res = elt.find('*').filter((i, item) => $(item).data(data));
            }
            return res;
        }
    }
}