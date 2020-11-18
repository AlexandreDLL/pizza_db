class Rest {

    static db = 'rest/index.php';

    static select(table, params) {
        return $.get(Rest.db, { table, params });
    }

    static insert(table, params = null) {
        return $.post(Rest.db, { table, params });
    }

    static update(table, params) {
        return $.ajax({
            url: Rest.db,
            type: 'PUT',
            data: JSON.stringify({ table, params })
        });
    }

    static delete(table, id) {
        return $.ajax({
            url: Rest.db,
            type: 'DELETE',
            data: JSON.stringify({ table, id })
        });
    }
}