class App {

    static paramsSelect = { id: null, where: null, orderBy: null };
    static classes = ['Utils', 'Rest', 'model/Model'];
    static extends = ['model/Category', 'model/Product'];

    static init() {
        $(document).ready(() => {
            App.loadClass().then(() => {
                Utils.init();
                App.browse();
            })
        })
        window.onpopstate = () => {
            App.browse();
        }
        $('.nav-link').click((evt) => {
            let btn = $(evt.target).closest('.navbar').find('.navbar-toggler').not('.collapsed');
            btn ? btn.click() : null;
        })
    }

    static browse() {
        console.clear();
        let hash = (window.location.hash || '#accueil').substring(1);
        let page = hash.split('/')[0];
        let table = hash.split('/')[1];
        App.test();
    }

    static loadClass() {
        let deferred = $.Deferred();
        let _classes = $.map(App.classes, (cl) => {
            return App.getScript(`app/${cl}.js`);
        })
        $.when.apply($, _classes).then(() => {
            let _extends = $.map(App.extends, (cl) => {
                return App.getScript(`app/${cl}.js`);
            })
            $.when.apply($, _extends).then(() => {
                deferred.resolve();
            })
        })
        return deferred.promise();
    }

    static getScript(scriptUrl) {
        let deferred = $.Deferred();
        let script = document.createElement('script');
        script.src = scriptUrl;
        script.defer = true;
        script.onload = function () {
            deferred.resolve();
        }
        document.body.appendChild(script);
        return deferred.promise();
    }

    static test() {
        // let product = new Product({ id: 160, active: false, category_id: 3, title: 'ABC', description: 'DEF', price: 10.5, onsale: false, ord: 100 });
        // product.insert().done((resp) => {
        //     console.log(resp);
        //     product.title = 'ABCZ';
        //     product.description = 'DEFZ';
        //     product.active = true;
        //     product.onsale = true;
        //     product.update().done((resp) => {
        //         console.log(resp);
        //         product.delete().done((resp) => {
        //             console.log(resp);
        //         })
        //     })
        // })
        Product.select().done((resp) => {
            console.log(resp);
        })
    }
}