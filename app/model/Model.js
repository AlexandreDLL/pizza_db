class Model {

    assign(obj) {
        for (let v in obj) {
            if (this[v] != undefined && typeof this[v] == 'number') {
                this[v] = Number(obj[v]);
            }
            else if (this[v] != undefined && typeof this[v] == 'boolean') {
                this[v] = obj[v] == ('1' || true) ? true : false;
            }
            else {
                this[v] = obj[v];
            }
        }
    }

    static getObject(json) {
        let classe = this;
        let attr = Object.keys(json)[0];
        let val = json[attr];
        let arrValue = classe.list.filter((row) => row[attr] == val);
        return arrValue.length > 1 ? arrValue : arrValue[0];
    }

    static getAll(){
        let classe = this;
        return classe.list;
    }

    static get selected(){
        return this.list.length == 1 ? this.list[0] : undefined;
    }

    insert() {
        let table = this.constructor.name.toLowerCase();
        let params = this;
        let deferred = $.Deferred();
        Rest.insert(table, params).done((resp) => {
            let json = resp.tryJsonParse();
            if (json) {
                params.assign({ id: json });
                deferred.resolve(json);
            }
            else {
                deferred.reject(resp);
            }
        }).fail(() => {
            deferred.reject(resp);
        })
        return deferred.promise();
    }

    update() {
        let table = this.constructor.name.toLowerCase();
        let params = this;
        let deferred = $.Deferred();
        Rest.update(table, params).done((resp) => {
            let json = resp.tryJsonParse();
            if (json) {
                deferred.resolve(json);
            }
            else {
                deferred.reject(resp);
            }
        }).fail(() => {
            deferred.reject(resp);
        })
        return deferred.promise();
    }

    delete() {
        let table = this.constructor.name.toLowerCase();
        let id = this.id;
        let deferred = $.Deferred();
        Rest.delete(table, id).done((resp) => {
            let json = resp.tryJsonParse();
            if (json) {
                deferred.resolve(json);
            }
            else {
                deferred.reject(resp);
            }
        }).fail(() => {
            deferred.reject(resp);
        })
        return deferred.promise();
    }

    static select() {
        let deferred = $.Deferred();
        let classe = this;
        let table = classe.name.toLowerCase();
        Rest.select(table, App.paramsSelect).done((resp) => {
            let json = resp.tryJsonParse();
            if (json) {
                classe.list = [];
                $(json).each((i, elt) => {
                    classe.list.push(new classe(elt));
                })
                deferred.resolve(classe.list);
            }
            else {
                deferred.reject(resp);
            }
        }).fail(() => {
            deferred.reject(resp);
        })
        return deferred.promise();
    }
}