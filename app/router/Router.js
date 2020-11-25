class Router {

    static start(obj) {
        let route = obj.route;
        let id = obj.id ? obj.id : null;
        if(id)
            App.paramsSelect.id = id;
        let view = '404';
        let data = [];
        switch (route) {
            case 'accueil':
                view = route;
                break;
            case 'product':
                view = id ? route : 'products';
                data.push('Product');
                data.push('Category');
                break;
            case 'category':
                view = id ? route : 'categories';
                data.push('Category');
                data.push('Product');
                break;
        }
        let requests = [];
        let deferred = $.Deferred();
        requests.push($.post(`app/view/${view}.html`).done((resp) => {
            view = resp;
        }))
        $(data).each((i ,elt) => {
            if(i > 0)
                App.paramsSelect.id = null;
            let classe = elt.tryEval();
            requests.push(classe.select());
        })
        $.when.apply($, requests).then(() => {
            deferred.resolve(view);
        })
        return deferred.promise();
    }
}