class Rest {

    static db = 'rest/index.php';

    static select(table, params){
        let deferred = $.Deferred();
        $.get(Rest.db, {table, params}).done((resp) => {
            deferred.resolve(resp);
        })
        return deferred.promise();
    }

    static insert(table){
        let deferred = $.Deferred();
        $.post(Rest.db, {table}).done((resp) => {
            deferred.resolve(resp);
        })
        return deferred.promise();
    }

    static update(table, params){
        let deferred = $.Deferred();
        $.ajax({
            url: Rest.db,
            type: 'PUT',
            data: JSON.stringify({table, params}),
            success: function(resp){
                deferred.resolve(resp);
            }
        });
        return deferred.promise();
    }

    static delete(table, id){
        let deferred = $.Deferred();
        $.ajax({
            url: Rest.db,
            type: 'DELETE',
            data: JSON.stringify({table, id}),
            success: function(resp){
                deferred.resolve(resp);
            }
        });
        return deferred.promise();
    }
}