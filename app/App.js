class App {

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
        $('main').hide().html(hash).fadeIn();
    }
}