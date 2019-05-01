var connection = require("./connection.js");

function printQuestionMarks (num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ")>= 0){
                value = " ' " + value + " ' ";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}
var orm = {
    all: function (table, cb) {
        var queryString = "SELECT * FROM" + table;

        connection.query(queryString, function(err, result){
            if(err){
                throw(err);
            }
            cb(result);
        });
    },
    allOrder: function(table, orderCol, cb) {
        var queryString = "SELECT * FROM" + table + "ORDER BY" + orderCol;

        connection.query(queryString, function (err, result){
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    allOrderDesc: function(table, orderCol, cb) {
        var queryString = "SELECT * FROM" + table + "ORDER BY" + orderCol+ "DESC";

        connection.query(queryString, function(err){
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    create: function (table,cols,vals,cb) {
        var queryString = "INSERT INTO" + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ") ";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        connection.query(queryString, vals, function(err){
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    update: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE " + table;

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;
        
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            cb(result);
        });
    },
    delete: function(table, condition, cb) {
        var queryString = "DELETE FROM " + table;

        queryString += " WHERE ";
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};

module.exports = orm;