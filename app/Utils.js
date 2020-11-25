class Utils {

    static init(){
        String.prototype.tryJsonParse = function(){
            let value;
            try{
                value = JSON.parse(this);
            }
            catch{
                console.log('Erreur tryJsonParse:', this);
            }
            return value;
        }

        String.prototype.tryEval = function(){
            let value;
            try{
                value = eval(this);
            }
            catch{
                console.log('Erreur tryEval not a string', this);
            }
            return value;
        }
    }
}