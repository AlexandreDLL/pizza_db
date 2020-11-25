class Model {

    static datas = {};

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

    static select(){
        let deferred = $.Deferred();
        let classe = this;
        let table = classe.name.toLowerCase();
        Rest.select(table, App.paramsSelect).done((resp) => {
            let json = resp.tryJsonParse();
            if (json) {
                let arr = [];
                $(json).each((i, elt) => {
                    arr.push(new classe(elt));
                })
                deferred.resolve(arr);
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