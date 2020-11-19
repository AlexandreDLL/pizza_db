class App {

    static paramsSelect = { id: null, where: null, orderBy: null };
    static datas = {};

    static init() {
        window.onpopstate = () => {
            App.browse();
        }
        $(document).ready(() => {
            App.browse();
        })
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
        Rest.select('product', App.paramsSelect).done((resp) => {
            let json = resp.tryJsonParse();
            let arr = [];
            for(let obj of json){
                arr.push(new Product(obj));
            }
            App.datas['product'] = arr;
            $('main').hide().html(App.datas.product).fadeIn();
        });
        // Rest.insert('user', {active: 1, nom: 'Test', email: 'test@test.fr'}).done((resp) => {
        //     content = resp;
        //     $('main').hide().html(content).fadeIn();
        // });
        // Rest.update('user', {id: 1, active: 1, nom: 'TestU2'}).done((resp) => {
        //     content = resp;
        //     $('main').hide().html(content).fadeIn();
        // });
        // Rest.delete('product', 100).done((resp) => {
        //     content = resp;
        //     $('main').hide().html(content).fadeIn();
        // });
    }
}