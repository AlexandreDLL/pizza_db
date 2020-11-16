class App {

    static params = {id: null, where: null, orderBy: null};

    static init(){
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

    static browse(){
        console.clear();
        let hash = (window.location.hash || '#accueil').substring(1);
        let page = hash.split('/')[0];
        let table = hash.split('/')[1];
        let data;
        switch(page){
            case 'page1':
                Rest.select(table, App.params).then((resp) => {
                    data = JSON.parse(resp);
                    $('main').append($('<br>'));
                    $('main').append(data.table);
                })
                break;
            case 'page2':
                Rest.insert(table).then((resp) => {
                    data = JSON.parse(resp);
                    $('main').append($('<br>'));
                    $('main').append(data.table);
                })
                break;
            case 'page3':
                let params = {};
                Rest.update(table, params).then((resp) => {
                    data = JSON.parse(resp);
                    $('main').append($('<br>'));
                    $('main').append(data.table);
                })
                break;
            case 'page4':
                let id = '1';
                Rest.delete(table, id).then((resp) => {
                    data = JSON.parse(resp);
                    $('main').append($('<br>'));
                    $('main').append(data.table);
                })
                break;
        }
        $('main').hide().html(hash).fadeIn();
    }
}